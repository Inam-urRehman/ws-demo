import { useCallback, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setOrderList, updateOrderList } from "src/redux/action";
import { AppState } from "src/types";
import { dataArrToObj } from "src/utils/parsers";
import Table from "./table";

import "src/styles/orders.css";

export default function Orders() {
  const [openConnection, setOpenConnection] = useState(true);
  const dispatch = useDispatch();

  const ws = useRef<any>(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://api.bitfinex.com/ws/2");
    ws.current.onopen = () => {
      ws.current.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          pair: "tBTCUSD",
          prec: "P0",
        })
      );
    };
    ws.current.onclose = () => console.log("ws closed");
    ws.current.onmessage = () => {
      console.log("connection established");
    };
    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (msg: any) => {
      if (!openConnection) return;
      console.log(msg.data);
      const data = JSON.parse(msg.data);
      if (data.event) return;

      if (data[1].length === 50) {
        const initialValues = data.map(dataArrToObj);
        dispatch(setOrderList(initialValues));
      }
      dispatch(updateOrderList(data));
    };
  }, [openConnection]);

  const toggleOpenConnection = useCallback(() => {
    setOpenConnection((st) => {
      return !st;
    });
  }, []);

  const { orderList } = useSelector((state: AppState) => state);

  return (
    <main>
      <h1 className="orders-heading">
        Order Book{" "}
        <button className="btn" onClick={toggleOpenConnection}>
          {openConnection ? (
            <i className="fa fa-close"></i>
          ) : (
            <i className="fab fa-connectdevelop"></i>
          )}
        </button>
      </h1>
      <section className="orders-content">
        <Table
          className="orders"
          headers={[
            { label: "count" },
            { label: "amount" },
            { label: "price", className: "align-right" },
          ]}
          data={orderList}
        >
          {(row) => (
            <tr>
              <td>{row.count}</td>
              <td>{row.amount}</td>
              <td className="align-right">{row.price}</td>
            </tr>
          )}
        </Table>
      </section>
    </main>
  );
}
