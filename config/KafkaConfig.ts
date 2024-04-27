import fs from "fs";

export interface KafkaConfig {
  "bootstrap.servers": string;
  "security.protocol": "plaintext" | "ssl" | "sasl_plaintext" | "sasl_ssl";
  "sasl.mechanisms": "PLAIN" | "GSSAPI" | "SCRAM-SHA-256" | "SCRAM-SHA-512";
  "sasl.username": string;
  "sasl.password": string;
  "session.timeout.ms"?: string;
}

export function readConfigFile(fileName: string): KafkaConfig {
  const data = fs.readFileSync(fileName, "utf8").split("\n");
  return data.reduce((config: any, line: string) => {
    const [key, value] = line.split("=");
    if (key && value) {
      switch (key.trim()) {
        case "security.protocol":
          config["security.protocol"] = value.trim() as
            | "plaintext"
            | "ssl"
            | "sasl_plaintext"
            | "sasl_ssl";
          break;
        case "sasl.mechanisms":
          config["sasl.mechanisms"] = value.trim() as
            | "PLAIN"
            | "GSSAPI"
            | "SCRAM-SHA-256"
            | "SCRAM-SHA-512";
          break;
        default:
          config[key.trim()] = value.trim();
      }
    }
    return config;
  }, {} as KafkaConfig);
}
