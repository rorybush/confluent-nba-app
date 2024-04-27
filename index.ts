import { readConfigFile } from "./config/KafkaConfig";
import { KafkaProducer } from "./kafka/KafkaProducer";
import { fetchNBAScores } from "./api/NBAApi";

async function main() {
  const config = readConfigFile("client.properties");
  const producer = new KafkaProducer(config);
  producer.connect();

  const scores = await fetchNBAScores();
  scores.forEach((score) => {
    producer.produce("nba-scores", score);
  });
}

main();
