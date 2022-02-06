import { AppActions, AppState } from "src/types";
import { dataArrToObj } from "src/utils/parsers";
import { AppDispatch } from "./store";

export function setOrderList(payload: AppState["orderList"]): AppActions {
  return {
    type: "SET_ORDER_LIST",
    payload,
  };
}

export function updateOrderList(response: Array<Array<number>>) {
  const [, dataArr] = response;
  const dataObj = dataArrToObj(dataArr);

  return async (dispatch: AppDispatch, getState: () => AppState) => {
    const { orderList } = getState();
    const updatedList = [...orderList];
    if (updatedList.length === 50) {
      updatedList.shift();
      updatedList.push(dataObj);
    } else {
      updatedList.push(dataObj);
    }

    dispatch(setOrderList(updatedList));
  };
}
