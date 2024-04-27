import {
  Producer,
  Message,
  DeliveryReport,
} from "@confluentinc/kafka-javascript";
import { KafkaConfig, readConfigFile } from "../config/KafkaConfig";
import { NBAGameScore } from "./types";

export class KafkaProducer {
  private producer: Producer;
  private ready: boolean = false;

  constructor(configFile: string) {
    const kafkaConfig: KafkaConfig = readConfigFile(configFile);

    this.producer = new Producer({
      "bootstrap.servers": kafkaConfig["bootstrap.servers"],
      // ...other configurations
    });

    this.producer.on("ready", () => {
      this.ready = true;
      console.log("Producer is ready");
    });

    this.producer.on("event.error", (err) => {
      console.error("Error from producer", err);
    });

    this.producer.connect();
  }

  public isReady(): boolean {
    return this.ready;
  }

  public produceMessage(topic: string, message: NBAGameScore): void {
    if (!this.isReady()) {
      console.warn("Tried to produce a message before the producer is ready");
      return;
    }

    const valueBuffer = Buffer.from(JSON.stringify(message));
    this.producer.produce(
      topic,
      null,
      valueBuffer,
      message.gameId,
      Date.now(),
      (err: any, deliveryReport: any) => {
        if (err) {
          console.error("Error producing", err);
        } else {
          console.log("Message delivered", deliveryReport);
        }
      }
    );
  }

  public disconnect(): void {
    this.producer.disconnect();
  }
}
