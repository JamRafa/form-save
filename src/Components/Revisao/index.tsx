import styles from "./Revisao.module.scss";
import NextButton from "../NextButton";
import { useDispatch } from "react-redux";
import { mudaEstado } from "../../Store/reducers/BotaoClick";
import { useSelector } from "react-redux";
import { IEstagio, INota, Iredux } from "../../tipos/funcao";
import GroupsIcon from "@mui/icons-material/Groups";
import CollapseComponent from "../Collapse";
import LandscapeIcon from "@mui/icons-material/Landscape";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceFrown,
  faFaceSmile,
  faFaceMeh,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { memo } from "react";


 function Revisao() {
  const dispatch = useDispatch();

  const { pessoais, estagios, nota, desafio } = useSelector(
    (state: Iredux) => state
  );

  const [name] = pessoais;
  const estagiosTrue = estagios.filter(
    (estagio: IEstagio) => estagio.check === true
  );
  const [notaTrue] = nota.filter((nota: INota) => nota.check === true);
  const [desafios] = desafio;

  function HandleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    dispatch(mudaEstado());
  }

  function mood() {
    const nota = Number(notaTrue.resposta);
    if (nota <= 3) {
      return <FontAwesomeIcon icon={faFaceFrown} fade size="lg" />;
    }
    if (nota <= 6) {
      return <FontAwesomeIcon icon={faFaceMeh} size="lg" />;
    } else {
      return <FontAwesomeIcon icon={faFaceSmile} bounce size="lg" />;
    }
  }


  return (
    <>
      <form
        onSubmit={(ev) => HandleSubmit(ev)}
        className={styles.struturaFormInputs}
      >
        <div className={styles.nota}>
          <div>
            Nome: <p className={styles.resposta}>{name.name}</p>
          </div>
          <div>
            <FontAwesomeIcon
              className={styles.flip}
              icon={faIdCard}
              bounce
              size="lg"
            />
          </div>
        </div>

        <div className={styles.nota}>
          <div>
            Vontade de mudar de vida:{" "}
            <p className={styles.resposta}>{notaTrue.resposta}</p>
          </div>
          <div>{mood()}</div>
        </div>

        <div className={styles.struturaCollapse}>
          <CollapseComponent
            text="Como me sinto"
            conteudoArray={estagiosTrue}
            icon={<ThumbUpAltIcon className={styles.icon} />}
          />
        </div>
        <div className={styles.struturaCollapse}>
          <CollapseComponent
            text="Desfio da vida"
            conteudo={desafios.desafio}
            icon={<LandscapeIcon className={styles.icon} />}
          />
        </div>
        <div className={styles.struturaCollapse}>
          <CollapseComponent
            text={"Encontro presencial"}
            conteudo={desafios.presencial}
            icon={<GroupsIcon className={styles.icon} />}
          />
        </div>

        <NextButton />
      </form>
    </>
  );
}

export default memo(Revisao)