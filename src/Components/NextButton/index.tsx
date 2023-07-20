import { useSelector } from "react-redux";
import styles from "./nextButton.module.scss";
import { Iredux } from "../../tipos/funcao";
import classNames from "classnames";
import Swal from "sweetalert2";

interface Button {
  isActive?: boolean;
}

export default function NextButton({ isActive = true }: Button) {
  const steps = ["Dados pessoais", "Estagios", "Nota", "Desafio", "Revisao"];

  const actualStatate = useSelector((state: Iredux) => {
    return state.botao;
  });

  function handleClick() {
    if (!isActive) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Preencha os campos corretamente",
        showConfirmButton: false,
        background: "#222831",
        color: "#F5F5F5",
        timer: 2000,
      });
    }
  }

  return (
    <div className={styles.botaoContainer}>
      {actualStatate < steps.length - 1 ? (
        <button
          onClick={() => handleClick()}
          type="submit"
          className={classNames({
            [styles.buttonActive]: isActive,
            [styles.buttonDisabled]: !isActive,
          })}
        >
          Proximo
        </button>
      ) : (
        <button
          type="submit"
          className={classNames({
            [styles.buttonActive]: isActive,
            [styles.buttonDisabled]: !isActive,
          })}
        >
          Concluir
        </button>
      )}
    </div>
  );
}
