export default class Bullet {
  spriteSheet: HTMLImageElement;
  private canvas: HTMLCanvasElement;
  x: number;
  y: number;
  srcX: number;
  srcY: number;
  spriteWidth: number;
  spriteHeight: number;
  damage: number;
  speed: number;
  dirX: number;

  constructor(canvas: HTMLCanvasElement, x: number, y: number, dirX: number) {
    this.canvas = canvas;
    this.spriteSheet = new Image();
    this.spriteSheet.src = "/sprite_sheets/decade.png";
    this.x = x;
    this.y = y;
    this.srcX = 360;
    this.srcY = 4130;
    this.spriteHeight = 150;
    this.spriteWidth = 85;
    this.damage = 10;
    this.speed = 20;
    this.dirX = dirX;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (ctx) {
      ctx?.drawImage(
        this.spriteSheet,
        this.srcX,
        this.srcY,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.spriteWidth,
        this.spriteHeight,
      );
    }
  }
  fire() {
    if (this.dirX === 1) {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }
  }
}
