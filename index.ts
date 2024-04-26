import fs from "fs";
import Kafka from "node-rdkafka";

interface KafkaConfig {
  "bootstrap.servers": string;
  "security.protocol": string;
  "sasl.mechanisms": string;
  "sasl.username": string;
  "sasl.password": string;
  "session.timeout.ms"?: string;
}

function readConfigFile(fileName: string): KafkaConfig {
  const data = fs.readFileSync(fileName, "utf8").split("\n");
  return data.reduce((config: KafkaConfig, line: string) => {
    const [key, value] = line.split("=");
    if (key && value) {
      config[key.trim() as keyof KafkaConfig] = value.trim();
    }
    return config;
  }, {} as KafkaConfig);
}

function produce(topic: string, config: KafkaConfig) {
  const key = "key";
  const value = "value";
}

const config = readConfigFile("client.properties");
produce("nba-scores", config);
