import { createSlice } from "@reduxjs/toolkit";
import { INota } from "../../tipos/funcao";

const initialState = [
  { id: 1, resposta: "0", check: false },
  { id: 2, resposta: "1", check: false },
  { id: 3, resposta: "2", check: false },
  { id: 4, resposta: "3", check: false },
  { id: 5, resposta: "4", check: false },
  { id: 6, resposta: "5", check: false },
  { id: 7, resposta: "6", check: false },
  { id: 8, resposta: "7", check: false },
  { id: 9, resposta: "8", check: false },
  { id: 10, resposta: "9", check: false },
  { id: 11, resposta: "10", check: false },
] as INota[];

const notaSlice = createSlice({
  name: "nota",
  initialState,
  reducers: {
    cadastraNota: (state, { payload }) => {
      const someTrue = state.some((item) => item.check === true);
      
      if (someTrue) {
        const someTrueIndex: number = state.findIndex(
          (state) => state.check === true
        );
        Object.assign(state[someTrueIndex], { check: false });
      }

      const index = state.findIndex((state) => state.id === payload.id);
      Object.assign(state[index], payload.item);
    },
    resetNota: () => initialState 
  },
});

export const { cadastraNota, resetNota } = notaSlice.actions;
export default notaSlice.reducer;
