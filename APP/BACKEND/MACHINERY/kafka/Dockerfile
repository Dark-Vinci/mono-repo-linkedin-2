# Use the official Confluent Platform image with Apache Kafka and ZooKeeper
FROM confluentinc/cp-kafka:latest

# Expose necessary ports
EXPOSE 9092

# Set environment variables
ENV KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
ENV KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT
ENV KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
ENV KAFKA_CREATE_TOPICS=mytopic:1:1