import axios from "axios";
import { NBAGameScore } from "../kafka/types";

export async function fetchNBAScores(): Promise<NBAGameScore[]> {
  try {
    const response = await axios.get(
      "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
    );
    console.log(response.data);
    return transformDataToSchema(response.data);
  } catch (error) {
    console.error("Error fetching NBA scores:", error);
    return [];
  }
}

function transformDataToSchema(data: any): NBAGameScore[] {
  return [];
}
