export interface SnakeCord {
  x: number;
  y: number;
}
export interface BombPosition {
  x: number;
  y: number;
}

export interface GlobalState {
  snake: SnakeCord[] | [];
  disallowedDirection: string;
  score: number;
  bomb: BombPosition[] | [];
}
