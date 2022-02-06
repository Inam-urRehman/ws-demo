export type Order = {
  price: number;
  count: number;
  amount: number;
};

export interface AppState {
  orderList: Array<Order>;
}

export type AppActions = {
  type: "SET_ORDER_LIST";
  payload: AppState["orderList"];
};
