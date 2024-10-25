import Bullet from "./Bullet";

export default class Decade {
  spriteSheet: HTMLImageElement;
  private canvas: HTMLCanvasElement;
  private audio: HTMLAudioElement;
  private spriteHeight = 150;
  private row = 1;
  private currState = "idle";
  weaponType = 0;
  x = 0;
  y = 0;
  private groundY = 0;
  private srcX = 90;
  private srcY = 40; // 0: idle, 210: pose
  private spriteWidth = 55; // 55: idle, 85: pose
  private frameX = 1;
  private maxFrameX = 4; // 4:idle, 6:pose
  private maxRow = 1;
  private isFlipped = false;
  private isKeyDown = false;
  private jumpY = 100;
  private moveX = 10;
  private ctx;
  private hasBullet = false;
  private skilling = false;
  fps: number; // Giảm tốc độ xuống 30 FPS
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.spriteSheet = new Image();
    this.spriteSheet.src = "/sprite_sheets/decade.png";
    this.x = canvas.width / 2;
    this.y = canvas.height / 1.5;
    this.groundY = canvas.height / 1.5;
    this.ctx = ctx;
    this.fps = 10;
  }

  private comeBackToIdle() {
    this.row = 1;
    this.srcY = 40;
    this.srcX = 90;
    this.spriteWidth = 55;
    this.maxFrameX = 4;
    this.currState = "idle";
    this.maxRow = 1;
    this.spriteHeight = 150;
    this.y = this.canvas.height / 1.5;
  }

  move() {
    // movement
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      // if (e.key === "ArrowLeft") {
      //   isKeyDown = false;
      // } else if (e.key === "ArrowRight") {
      //   isKeyDown = false;
      // } else if (e.key === "ArrowUp") {
      //   isKeyDown = false;
      // } else if (e.key === "ArrowDown") {
      //   isKeyDown = false;
      // } else {}
      this.isKeyDown = false;
    });
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      // console.log(e.key);
      if (e.key === "x") {
        if (this.weaponType < 5) {
          this.weaponType++;
        } else this.weaponType = 0;
        console.log(this.weaponType);
      }
      if (e.key === "b") {
        this.currState = "blast";
        this.isKeyDown = true;
        this.srcY = 3980;
        this.maxRow = 1;
        this.spriteWidth = 90;
        this.maxFrameX = 5;
      } else if (e.key === "k") {
        this.isKeyDown = true;
        this.srcY = 3640;
        this.currState = "kick";
        this.maxRow = 2;
        this.spriteWidth = 90;
        this.maxFrameX = 10;
      } else if (e.key === " " && this.currState !== "punch") {
        this.currState = "punch";
        this.isKeyDown = true;

        // change special weapon
        if (this.weaponType === 1) {
          this.skilling = true;
          this.y -= 25;
          this.srcY = 5950;
          this.maxRow = 2;
          this.spriteWidth = 180;
          this.maxFrameX = 6;
        } else if (this.weaponType === 2) {
          this.skilling = true;
          this.y -= 5;
          this.srcY = 6350;
          this.maxRow = 2;
          this.spriteWidth = 180;
          this.maxFrameX = 6;
          this.fps = 5;
        } else if (this.weaponType === 3) {
          this.skilling = true;
          this.y -= 110;
          this.srcY = 7025;
          this.maxRow = 2;
          this.spriteWidth = 180;
          this.maxFrameX = 4;
          this.spriteHeight = 230;
        } else {
          this.srcY = 3300;
          this.maxRow = 2;
          this.spriteWidth = 90;
          this.maxFrameX = 9;
        }
      } else if (e.key === "p") {
        this.isKeyDown = true;
        this.srcY = 210;
        this.currState = "pose";
        this.maxRow = 2;
        this.spriteWidth = 85;
        this.maxFrameX = 6;
      } else if (e.key === "ArrowLeft") {
        this.isKeyDown = true;
        this.isFlipped = true;
        if (this.x >= this.moveX) {
          this.x -= this.moveX;
          if (this.y >= this.groundY) {
            this.srcY = 2630;
            this.spriteWidth = 85;
            this.maxFrameX = 12;
            this.currState = "move";
            this.maxRow = 2;
          }
        }
      } else if (e.key === "ArrowRight") {
        this.isKeyDown = true;
        if (this.x + this.spriteWidth < this.canvas.width - this.moveX) {
          this.x += this.moveX;
          if (this.y >= this.groundY) {
            this.srcY = 2630;
            this.spriteWidth = 85;
            this.maxFrameX = 12;
            this.currState = "move";
            this.maxRow = 2;
          }
        }
        this.isFlipped = false;
      } else if (e.key === "ArrowUp") {
        // jumb
        this.isKeyDown = true;
        if (
          (this.y >= this.canvas.height / 3 || this.currState !== "jump") &&
          this.weaponType === 0
        ) {
          this.fps = 10;
          this.y -= this.jumpY;
          this.srcY = 2970;
          this.spriteWidth = 90;
          this.maxFrameX = 4;
          this.currState = "jump";
          this.maxRow = 1;
        }
      } else if (e.key === "ArrowDown") {
        this.isKeyDown = true;
        this.srcY = 3140;
        this.spriteWidth = 90;
        this.maxFrameX = 6;
        this.currState = "block";
        this.maxRow = 1;
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (ctx) {
      // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Xóa khung canvas cũ
      ctx.save();
      let dirX = 1;
      let x = this.x + this.spriteWidth / 2;
      if (this.isFlipped) {
        dirX = -1;
        x = this.x - this.spriteWidth / 2;
        ctx.translate(this.x + this.spriteWidth, this.y);
        ctx.scale(-1, 1);
      }
      ctx?.drawImage(
        this.spriteSheet,
        (this.weaponType === 1 ||
          this.weaponType === 2 ||
          this.weaponType === 3) &&
          this.currState === "punch" &&
          this.frameX > 1
          ? this.srcX * this.frameX + this.srcX * (this.frameX - 1)
          : this.srcX * this.frameX,
        this.srcY,
        this.spriteWidth,
        this.spriteHeight,
        this.isFlipped ? 0 : this.x,
        this.isFlipped ? 0 : this.y,
        this.spriteWidth,
        this.spriteHeight,
      );
      if (this.currState === "blast" && !this.hasBullet) {
        this.hasBullet = true; // Set the flag to true as we're creating a bullet

        requestAnimationFrame(() => {
          const bullet = new Bullet(
            this.canvas,
            x,
            this.y,
            dirX, // Direction of the bullet
          );

          const animateBullet = () => {
            bullet.fire(); // Update bullet position
            bullet.draw(this.ctx); // Draw the bullet

            // Continue the loop if the bullet is still within the canvas bounds
            if (bullet.x < this.canvas.width && bullet.x > -100) {
              requestAnimationFrame(animateBullet);
            } else {
              // Reset the flag when the bullet goes out of bounds
              this.hasBullet = false;
            }
          };

          animateBullet();
        });
      }

      ctx.restore();
    }
  }

  update() {
    // anim drop
    if (this.y < this.groundY && !this.isKeyDown && !this.skilling) {
      this.y += 20;
      this.srcX = 180;
      this.srcY = 2970;
      this.spriteWidth = 90;
      this.maxFrameX = 1;
      this.currState = "jump";
      this.maxRow = 1;
      this.fps = 20;
    }
    // back to idle when y equal to ground
    if (
      this.y >= this.groundY &&
      !this.isKeyDown &&
      this.currState !== "idle" &&
      this.currState !== "pose" &&
      this.currState !== "punch" &&
      this.currState !== "kick" &&
      this.currState !== "blast"
    ) {
      this.y = this.groundY;
      this.comeBackToIdle();
    }

    if (this.currState === "pose") {
      if (this.frameX < this.maxFrameX) {
        this.frameX++;
      } else {
        if (this.row < this.maxRow) {
          this.row++;
          this.srcY += 170;
          this.maxFrameX = 9;
          this.spriteWidth = 90;
        } else {
          this.comeBackToIdle();
        }
        this.frameX = 1;
      }
    } else if (this.currState === "move") {
      if (this.frameX < this.maxFrameX) {
        this.frameX++;
      } else {
        if (this.row < this.maxRow) {
          this.row++;
          this.srcY += 170;
          this.maxFrameX = 4;
          this.spriteWidth = 85;
        } else {
          this.row = 1;
          this.srcY -= 170;
          this.maxFrameX = 12;
          this.spriteWidth = 85;
        }
        this.frameX = 1;
      }
    } else if (this.currState === "punch") {
      if (this.frameX < this.maxFrameX) {
        this.frameX++;
      } else {
        if (this.row < this.maxRow) {
          this.row++;
          this.srcY += 170;
          if (this.weaponType === 1 || this.weaponType === 2) {
            this.spriteWidth = 180;
            this.maxFrameX = 3;
          } else if (this.weaponType === 2) {
            this.spriteWidth = 180;
            this.maxFrameX = 3;
          } else if (this.weaponType === 3) {
            this.srcY -= 170;
            this.srcY += 240;
            this.spriteWidth = 180;
            this.maxFrameX = 2;
          } else {
            this.srcY += 170;
            this.spriteWidth = 90;
            this.maxFrameX = 9;
          }
        } else {
          this.skilling = false;
          this.comeBackToIdle();
        }
        this.frameX = 1;
      }
    } else if (this.currState === "kick") {
      if (this.frameX < this.maxFrameX) {
        this.frameX++;
      } else {
        if (this.row < this.maxRow) {
          this.row++;
          this.srcY += 170;
          this.maxFrameX = 6;
          this.spriteWidth = 90;
        } else {
          this.comeBackToIdle();
        }
        this.frameX = 1;
      }
    } else if (this.currState === "blast") {
      if (this.frameX < this.maxFrameX) {
        this.frameX++;
      } else {
        if (this.row < this.maxRow) {
          this.row++;
          this.srcY += 170;
          this.maxFrameX = 3;
          this.spriteWidth = 90;
        } else {
          this.comeBackToIdle();
        }
        this.frameX = 1;
      }
    } else {
      if (this.frameX < this.maxFrameX) {
        this.frameX++;
      } else this.frameX = 1;
    }
  }
}
