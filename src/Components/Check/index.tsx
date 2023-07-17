import styles from "./Check.module.scss";
import { useDispatch } from "react-redux";
import NextButton from "../NextButton";
import { mudaEstado } from "../../Store/reducers/BotaoClick";
import { Checkbox, FormControlLabel } from "@mui/material";
import { IEstagio, Iredux } from "../../tipos/funcao";
import { useSelector } from "react-redux";
import { cadastraEstagio } from "../../Store/reducers/Estagios";
import classNames from "classnames";

export default function Check() {
  const dispatch = useDispatch();

  const listaRespostas = useSelector((state: Iredux) => {
    return state.estagios;
  });

  const isActive = listaRespostas.some((item) => item.check === true);

  function handleChange(position: number, resposta: boolean) {
    let check = !resposta;
    dispatch(cadastraEstagio({ id: position, item: { check } }));
  }

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if(isActive){
      dispatch(mudaEstado());
    }
  }

  return (
    <form onSubmit={(ev) => handleSubmit(ev)} className={styles.estrutura}>
      <div className={styles.estruturaCheck}>
        <p>Em qual desses estagios voce se encontra ?</p>
        {listaRespostas.map((resposta: IEstagio) => (
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

      <NextButton isActive={isActive}/>
    </form>
  );
}
