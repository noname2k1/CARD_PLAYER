export interface ICard {
  frontPath: string;
  thumbnail: string;
  name: string;
  star: number;
  sound: string;
  id?: string | number;
  canFlip?: boolean;
  type?: number;
  video?: string;
}
