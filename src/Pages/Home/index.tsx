import { useNavigate } from "react-router-dom";
import styles from "./home.module.scss";
import musculacao from "./../../Assests/musculacao.png";

export default function Home() {
  const nav = useNavigate();
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
            <p>Clique em comecar para iniciar questionario</p>
          <button
            className={styles.botaoComecar}
            onClick={() => nav("/questions")}
          >
            começar
          </button>
        </div>
      </div>
    </div>
  );
}
