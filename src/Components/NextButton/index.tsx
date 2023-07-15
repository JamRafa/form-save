import { useSelector } from "react-redux";
import styles from "./nextButton.module.scss";
import { Iredux } from "../../tipos/funcao";

export default function NextButton() {
  const steps = ["Dados pessoais", "Estagios", "Nota", "Desafio", "Revisao"];

  const actualStatate = useSelector((state: Iredux) => {
    return state.botao;
  });

  return (
    <div className={styles.botaoContainer}>
      {actualStatate < steps.length - 1 ? (
        <button type="submit">Proximo</button>
      ) : (
        <button type="submit">Concluir</button>
      )}
    </div>
  );
}
