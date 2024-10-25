import Decade from "@/app/models/Decade";
import { useEffect, useRef } from "react";
import "@/app/styles/battle.css";
// interface Props {}

const Game = ({}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const refXY = useRef<HTMLSpanElement>(null);
  const fpsRef = useRef<number>(10);

  // change canvas w,h when resize screen
  useEffect(() => {
    const changeResolution = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
      }
    };
    changeResolution();
    window.addEventListener("resize", changeResolution);
    return () => {
      window.removeEventListener("resize", changeResolution);
    };
  }, []);

  const createEvironment = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, 600, canvas.width, canvas.height / 1.5);
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let fps = 10;
      const DecadeController = new Decade(canvas, ctx, fpsRef.current);
      DecadeController.spriteSheet.onload = () => {
        if (inputRef.current) {
          inputRef.current.value = fpsRef.current.toString();
          inputRef.current.onchange = function (e: Event) {
            const target = e.target as HTMLInputElement;
            fpsRef.current = +target.value;
          };
        }
        DecadeController.move();
        const update = () => {
          if (refXY.current) {
            refXY.current.textContent = `(x,y): (${Math.round(
              DecadeController.x,
            ).toString()},${Math.round(DecadeController.y).toString()})`;
          }
          if (cardRef.current) {
            if (
              !cardRef.current.classList.contains(
                "card-" + DecadeController.weaponType,
              )
            ) {
              cardRef.current?.classList.forEach((cl) => {
                if (cl.startsWith("card")) {
                  cardRef.current?.classList.remove(cl);
                }
              });
              cardRef.current.classList.add(
                "card-" + DecadeController.weaponType,
              );
            }
          }
        };
        let lastTime = 0;
        function animate(currentTime: DOMHighResTimeStamp) {
          const fpsInterval = 1000 / fpsRef.current; // Lấy giá trị fps từ fpsRef // Tính khoảng thời gian giữa các khung hình
          // Tính thời gian giữa lần gọi trước và hiện tại
          const elapsed = currentTime - lastTime;
          // Nếu khoảng thời gian đủ lớn, tiến hành cập nhật khung hình
          if (elapsed > fpsInterval) {
            lastTime = currentTime - (elapsed % fpsInterval); // Điều chỉnh thời gian để giữ tốc độ nhất quán
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas
              createEvironment(ctx, canvas);
              DecadeController.draw(ctx);
              DecadeController.update();
              update();
            }
          }
          // Tiếp tục vòng lặp hoạt hình
          requestAnimationFrame(animate);
        }
        // Bắt đầu vòng lặp
        requestAnimationFrame(animate);
      };
    }
  }, []);

  return (
    <div className="">
      <section className="fixed right-0 top-0">
        <div className="mb-[1rem]">
          <span className="text-white" ref={refXY}></span>
          <article
            ref={cardRef}
            className="w-[calc(130px+1rem)] h-[190px] object-fill"
          ></article>
          <div className="bg-white flex items-center">
            <label htmlFor="fps">fps: </label>
            <input
              type="number"
              className="p-4 w-full outline-none"
              name="fps"
              id="fps"
              min={1}
              max={60}
              pattern="\d*"
              step={2}
              ref={inputRef}
            />
          </div>
        </div>
      </section>
      <canvas ref={canvasRef} className=""></canvas>
    </div>
  );
};

export default Game;
