import styles from "./Notas.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import NextButton from "../NextButton";
import { mudaEstado } from "../../Store/reducers/BotaoClick";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Iredux } from "../../tipos/funcao";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { cadastraNota } from "../../Store/reducers/Nota";

export default function Notas() {
  const dispatch = useDispatch();

  const listaRespostas = useSelector((state: Iredux) => {
    return state.nota;
  });

  const [isChecked, setIsChecked] = useState(
    new Array(listaRespostas.length).fill(false)
  );

  const isActive = listaRespostas.some((item) => item.check === true);

  function handleChange(id: number, resposta: boolean) {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === id ? !item : false
    );
    setIsChecked(updatedCheckedState);
    let check = !resposta;
    dispatch(cadastraNota({ id, item: { check } }));
  }

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (isActive) {
      dispatch(mudaEstado());
    }
  }

  return (
    <>
      <p>De 0 a 10, quanto você está disposto a transformar sua vida</p>
      <form onSubmit={(ev) => handleSubmit(ev)} className={styles.estrutura}>
        <div className={styles.estruturaCheck}>
          {listaRespostas.map((resposta) => (
            <FormControlLabel
              key={resposta.id}
              className={classNames({
                [styles.checkboxLabel]: !resposta.check,
                [styles.checkboxLabeltrue]: resposta.check,
              })}
              control={
                <Checkbox
                  checked={resposta.check}
                  value={resposta.id}
                  className={styles.checkbox}
                  onChange={() => handleChange(resposta.id, resposta.check)}
                />
              }
              label={resposta.resposta}
            />
          ))}
        </div>

        <NextButton isActive={isActive} />
      </form>
    </>
  );
}
