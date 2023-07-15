import { configureStore } from "@reduxjs/toolkit";
import pessoaisSlice from "./reducers/Pessoais";
import botaoClickSlice from "./reducers/BotaoClick";
import estagioSlice from "./reducers/Estagios";
import notaSlice from "./reducers/Nota";
import desafioSlice from "./reducers/Desafio";

const store = configureStore({
  reducer: {
    botao: botaoClickSlice,
    pessoais: pessoaisSlice,
    estagios: estagioSlice,
    nota: notaSlice,
    desafio: desafioSlice
  },
});

export default store;
