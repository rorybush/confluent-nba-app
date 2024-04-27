import { KafkaProducer } from "./kafka/KafkaProducer";
import { fetchNBAScores } from "./api/NBA-Api";

async function main() {
  const producer = new KafkaProducer("client.properties");

  try {
    const scores = await fetchNBAScores();
    scores.forEach((score) => {
      if (producer.isReady()) {
        producer.produceMessage("nba-scores", score);
      } else {
        console.log("Producer not ready yet. Waiting...");
      }
    });
  } catch (error) {
    console.error("Failed to fetch NBA scores or produce messages", error);
  }

  process.on("SIGINT", () => {
    producer.disconnect();
    process.exit();
  });
}

main();
