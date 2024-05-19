export function formatPrice(price: number): string {
  if (price === 0) {
    return "БЕСПЛАТНО";
  }
  if (price >= 10000) {
    const left = Math.floor(price / 1000);
    const right = Math.floor(price % 1000);
    return `руб. ${left.toString()}.${right.toString().padStart(3, "0")}`;
  }
  return `руб. ${price.toString()}`;
}

export const SALE_CATEGORY_ID = -1;
export const DEFAULT_DESCRIPTION = 'С 1994 года Санкт-Петербургская мастерская МАКСАКОВ занимается производством изделий ручной работы из натуральной шорно-седельной кожи.'
export const DEFAULT_TITLE = 'Максаков - Кожаные портфели, сумки, рюкзаки ручной работы'
