

* start Zookeeper
~/kafka_2.13-3.0.0/bin/zookeeper-server-start.sh ~/kafka_2.13-3.0.0/config/zookeeper.properties

* Start Apache Kafka
Open another Shell window and rund the following command
~/kafka_2.13-3.0.0/bin/kafka-server-start.sh ~/kafka_2.13-3.0.0/config/server.properties

* Launch container

docker-compose up -d

* Create a topic
docker exec <docker_container_id> \
kafka-topics --bootstrap-server <broker_host:port> \
             --create \
             --topic <topic_name>

