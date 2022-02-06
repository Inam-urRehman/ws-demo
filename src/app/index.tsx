import { Provider } from "react-redux";
import Orders from "src/components/orders";

import store from "src/redux/store";

import "src/styles/app.css";

function App() {
  return (
    <Provider store={store}>
      <Orders />
    </Provider>
  );
}

export default App;
