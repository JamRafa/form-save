import { createSlice } from "@reduxjs/toolkit";
import { IEstagio } from "../../tipos/funcao";

const initialState = [
  { id: 1, resposta: "Livre", check: false },
  { id: 2, resposta: "Angustiado", check: false },
  { id: 3, resposta: "Ancioso", check: false },
  { id: 4, resposta: "Depressivo", check: false },
  { id: 5, resposta: "Escasso", check: false },
  { id: 6, resposta: "Travado", check: false },
] as IEstagio[];

const estagioSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    cadastraEstagio: (state, { payload }) => {
        const index = state.findIndex(state => state.id === payload.id)
        Object.assign(state[index], payload.item)
    },
  },
});

export const { cadastraEstagio } = estagioSlice.actions;
export default estagioSlice.reducer;
