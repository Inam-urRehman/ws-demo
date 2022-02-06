import { Order } from "src/types";

export function dataArrToObj(arr: Array<number>): Order {
  const [price, count, amount] = arr;

  return {
    price,
    count,
    amount,
  };
}
