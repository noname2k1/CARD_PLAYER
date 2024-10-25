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
  frameX: number = 1;
  maxFrameX: number;
  maxRow: number;
  row: number = 1;
  constructor(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    dirX: number,
    srcX: number,
    srcY: number,
    maxFrameX: number = 1,
    maxRow: number = 1,
    spriteWidth: number = 85,
    spriteHeight: number = 150,
    damage = 10,
    speed = 20,
  ) {
    this.canvas = canvas;
    this.spriteSheet = new Image();
    this.spriteSheet.src = "/sprite_sheets/decade.png";
    this.x = x;
    this.y = y;
    this.srcX = srcX;
    this.srcY = srcY;
    this.spriteHeight = spriteHeight;
    this.spriteWidth = spriteWidth;
    this.maxFrameX = maxFrameX;
    this.maxRow = maxRow;
    this.damage = damage;
    this.speed = speed;
    this.dirX = dirX;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (ctx) {
      ctx.save();
      if (this.dirX === -1) {
        ctx.translate(this.x + this.spriteWidth, this.y);
        ctx.scale(-1, 1);
      }
      ctx?.drawImage(
        this.spriteSheet,
        this.srcX * this.frameX,
        this.srcY,
        this.spriteWidth,
        this.spriteHeight,
        this.dirX === -1 ? 150 : this.x,
        this.dirX === -1 ? 0 : this.y,
        this.spriteWidth,
        this.spriteHeight,
      );
      ctx.restore();
    }
  }
  fire() {
    if (this.frameX < this.maxFrameX) {
      this.frameX++;
    } else {
      this.frameX = 1;
    }
    if (this.dirX === 1) {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }
  }
}
