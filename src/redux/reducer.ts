import { AppActions, AppState } from "src/types";

const initialState: AppState = {
  orderList: [],
};

export default function reducer(
  state = initialState,
  actions: AppActions
): AppState {
  switch (actions.type) {
    case "SET_ORDER_LIST":
      return {
        ...state,
        orderList: actions.payload,
      };

    default:
      return state;
  }
}
