FROM docker.elastic.co/logstash/logstash:7.15.0

# Expose ports
EXPOSE 9600 5044

# Copy Logstash configuration file
COPY logstash-config.conf /usr/share/logstash/pipeline/logstash-config.conf