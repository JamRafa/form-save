import { useNavigate } from "react-router-dom";
import styles from "./home.module.scss";
import musculacao from "./../../Assests/musculacao.png";
import { useSelector } from "react-redux";
import { Iredux } from "../../tipos/funcao";

export default function Home() {
  const nav = useNavigate();

  const actualStatate = useSelector((state: Iredux) => {
    return state.botao;
  });

  const buttonName = actualStatate === 0 ? "Começar" : "Continuar";

  return (
    <div className={styles.home}>
      <div className={styles.opacity}>
        <div className={styles.fundoCard}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logo}
              src={musculacao}
              alt="imagem de musculacao"
            />
          </div>
          <p>Comece a reponder agora mesmo!</p>
          <button
            className={styles.botaoComecar}
            onClick={() => nav("/questions")}
          >
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
}
