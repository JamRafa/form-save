import styles from "./questions.module.scss";
import musculacao from "./../../Assests/musculacao.png";
import Inputs from "../../Components/inputs";
import fundo from "./../../Assests/academia.jpg";
import StepperComponent from "../../Components/Stepper";
import { useState } from "react";
import Check from "../../Components/Check";
import TextoTitulos from "../../Components/TituloTextos";
import { useSelector } from "react-redux";
import { Iredux } from "../../tipos/funcao";
import Notas from "../../Components/Notas";
import Desafio from "../../Components/Desafio";
import { useDispatch } from "react-redux";
import { voltaEstado } from "../../Store/reducers/BotaoClick";
import Revisao from "../../Components/Revisao";

export default function Question() {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const actualStatate = useSelector((state: Iredux) => {
    return state.botao;
  });

  const steps = ["Dados pessoais", "Estagios", "Nota", "Desafio", "Revisão"];

  function retunComponent() {
    switch (actualStatate) {
      case 0:
        return <Inputs />;
      case 1:
        return <Check />;
      case 2:
        return <Notas />;
      case 3:
        return <Desafio />;
      case 4:
        return <Revisao />;
      case 5:
        return <Revisao />;
    }
  }

  return (
    <div className={styles.responsivo}>
      <img className={styles.fundo} src={fundo} alt="academia" />
      <div className={styles.questions}>
        <div className={styles.logoContainer}>
          <img
            className={styles.logo}
            src={musculacao}
            alt="imagem de musculacao"
          />
        </div>
        <TextoTitulos subtitulo={steps[actualStatate]} />

        <div className={styles.step}>
          <StepperComponent
            activeStep={actualStatate}
            completed={completed}
            setCompleted={setCompleted}
            steps={steps}
          />
        </div>

        <section className={styles.struturaForm}>
          {actualStatate === 0 ? (
            <></>
          ) : (
            <button
              className={styles.voltar}
              onClick={() => dispatch(voltaEstado())}
            >
              Voltar
            </button>
          )}
          {retunComponent()}
        </section>
      </div>
    </div>
  );
}
