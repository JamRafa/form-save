import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Question from "../Pages/Questions";
import { Provider } from "react-redux";
import store from "../Store";

export default function Rotas() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<Question />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
