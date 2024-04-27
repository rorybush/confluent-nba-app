export interface NBAGameScore {
  gameId: string;
  gameName: string;
  gameShortName: string;
  seasonYear: number;
  startDate: string;
  attendance: number | null;
  venue: Venue;
  teams: Team[];
}

export interface Venue {
  venueId: string;
  venueName: string;
  city: string;
  state: string;
  capacity: number;
  indoor: boolean;
}

export interface Team {
  teamId: string;
  teamLocation: string;
  teamName: string;
  teamAbbreviation: string;
  teamColor: string;
  teamScore: number;
  linescores: number[];
}
