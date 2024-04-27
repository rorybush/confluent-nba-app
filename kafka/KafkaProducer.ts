import { Producer } from "node-rdkafka";
import { KafkaConfig } from "../config/KafkaConfig";
import { NBAGameScore } from "./types";

export class KafkaProducer {
  private producer: Producer;
  private connected: boolean = false;

  constructor(config: KafkaConfig) {
    this.producer = new Producer({
      "metadata.broker.list": config["bootstrap.servers"],
      "security.protocol": config["security.protocol"],
      "sasl.mechanisms": config["sasl.mechanisms"],
      "sasl.username": config["sasl.username"],
      "sasl.password": config["sasl.password"],
    });

    this.producer.on("event.error", (err) => {
      console.error("Error from producer:", err);
    });

    this.producer.on("delivery-report", (err, report) => {
      if (err) {
        console.error("Error in delivery report:", err);
        return;
      }
      console.log("Delivery report:", report);
    });

    this.producer.setPollInterval(100);
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.producer.connect({}, (err) => {
        if (err) {
          reject(err);
        } else {
          this.connected = true;
          resolve();
        }
      });
    });
  }

  public disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.producer.disconnect((err) => {
        if (err) {
          reject(err);
        } else {
          this.connected = false;
          resolve();
        }
      });
    });
  }

  public async produce(topic: string, message: NBAGameScore): Promise<void> {
    if (!this.connected) {
      throw new Error("You must connect the producer before sending messages.");
    }

    return new Promise((resolve, reject) => {
      try {
        this.producer.produce(
          topic,
          null,
          Buffer.from(JSON.stringify(message)),
          message.gameId,
          Date.now(),
          (err: LibrdKafkaError | null, offset: number) => {
            if (err) {
              reject(err);
            } else {
              console.log(`Message delivered to partition ${offset}`);
              resolve();
            }
          }
        );
      } catch (err) {
        reject(err);
      }

      this.producer.poll();
    });
  }
}
