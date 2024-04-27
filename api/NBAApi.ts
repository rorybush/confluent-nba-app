import fetch from "node-fetch";
import { NBAGameScore } from "../kafka/types";

export async function fetchNBAScores(): Promise<NBAGameScore[]> {
  const response = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
  );
  const data = await response.json();
  return transformDataToSchema(data);
}

function transformDataToSchema(data: any): NBAGameScore[] {
  return [];
}
