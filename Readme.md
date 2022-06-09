# Assessment - Kafka Cluster
1. Create a Kafka Cluster using docker-compose
2. Develop a Node.js script to publish 10000 random messages on a kafka topic
3. Develop a Node.js script to subscribe all messages on the topic

### Start Zookeeper
```sh
~/kafka_2.13-3.0.0/bin/zookeeper-server-start.sh ~/kafka_2.13-3.0.0/config/zookeeper.properties
```

### Start Apache Kafka
Open another Shell window and rund the following command
```sh
~/kafka_2.13-3.0.0/bin/kafka-server-start.sh ~/kafka_2.13-3.0.0/config/server.properties
```

### Launch container
```sh
docker-compose up -d
```
### Create a topic
```sh
docker exec <docker_container_id> \
kafka-topics --bootstrap-server <broker_host:port> \
             --create \
             --topic <topic_name>