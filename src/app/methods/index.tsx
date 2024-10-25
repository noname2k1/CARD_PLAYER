export const getStarCard = () => {
  // Tạo một số ngẫu nhiên từ 0 đến 100
  const random = Math.random() * 100;

  const percent1star = 40;
  const percent2star = 60;
  const percent3star = 70;
  const percent4star = 80;
  const percent5star = 90;
  if (random < percent1star) {
    return 2;
  } else if (random < percent2star) {
    return 2;
  } else if (random < percent3star) {
    return 3;
  } else if (random < percent4star) {
    return 4;
  } else if (random < percent5star) {
    return 5;
  } else {
    return 6;
  }
};

export function formatCurrency(number: number) {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(1).replace(/\.0$/, "") + "b"; // Tỷ (billion)
  }
  if (number >= 1e6) {
    return (number / 1e6).toFixed(1).replace(/\.0$/, "") + "m"; // Triệu (million)
  }
  if (number >= 1e3) {
    return (number / 1e3).toFixed(1).replace(/\.0$/, "") + "k"; // Nghìn (thousand)
  }
  return number.toString(); // Số nhỏ hơn nghìn
}
