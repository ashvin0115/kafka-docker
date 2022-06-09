import { Kafka, Partitioners } from "kafkajs";
import RandomTextGenerator from "random-text-generator"

// Kafka config
const host = process.env.HOST_IP || "localhost"
const port = process.env.PORT || "29092"

const kafka = new Kafka({
  clientId: 'test',
  brokers: [`${host}:${port}`],
})

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner
})

await producer.connect()

// Constants
const MAX_MSG_COUNT = 10
const DELAY_AVG = 1000;  // in miliseconds

let msgCount = 0

// Random Text Generator
const randomTextGenerator = new RandomTextGenerator({splitter: " ", deepness: 8});

const exemplaryText=`Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian novel by English novelist George Orwell. It was published in June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime. The story was mostly written at Barnhill, a farmhouse on the Scottish island of Jura, at times while Orwell suffered from severe tuberculosis. Thematically, Nineteen Eighty-Four centres on the consequences of government over-reach, totalitarianism, and repressive regimentation of all persons and behaviours within society. The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism and propaganda. Great Britain, known as Airstrip One, has become a province of a superstate named Oceania that is ruled by the Party who employ the Thought Police to persecute individuality and independent thinking. Big Brother, the leader of the Party, enjoys an intense cult of personality despite the fact that he may not even exist. The protagonist, Winston Smith, is a diligent and skilful rank-and-file worker and Party member who secretly hates the Party and dreams of rebellion. He enters a forbidden relationship with a co-worker, Julia. Nineteen Eighty-Four has become a classic literary example of political and dystopian fiction. Many terms used in the novel have entered common usage, including Big Brother, doublethink, thoughtcrime, Newspeak, Room 101, telescreen, 2 + 2 = 5, prole, and memory hole. Nineteen Eighty-Four also popularised the adjective "Orwellian", connoting things such as official deception, secret surveillance, brazenly misleading terminology, and manipulation of recorded history by a totalitarian or authoritarian state. Time included it on its one hundred best English-language novels from 1923 to 2005. It was placed on the Modern Library's 100 Best Novels, reaching No. 13 on the editors' list and No. 6 on the readers' list. In 2003, the novel was listed at No. 8 on The Big Read survey by the BBC. Parallels have been drawn between the novel's subject matter and real life instances of totalitarianism, mass surveillance, and violations of freedom of expression among other themes.`;
randomTextGenerator.learn(exemplaryText.split(" "));

const produceMessage = async () => {
  const randomMsg = randomTextGenerator.generate()
  console.log(`random msg to write: ${randomMsg}`)
  await producer.send({
    topic: 'messages',
    messages: [
        { key: `key-${Date.now()}`, value: `${randomMsg}` }
    ],
  })

}

const handlePublishingMessages = async () => {
  produceMessage()
  msgCount++

  if (msgCount == MAX_MSG_COUNT) {
    console.log(`Published ${MAX_MSG_COUNT} messages to Kafka topic`)
    return
  }
  // schedule publishMessage with delay
  var delay = DELAY_AVG + (Math.random() - 0.5);
  setTimeout(handlePublishingMessages.bind(null), delay); 
};

handlePublishingMessages()