import styles from "./Revisao.module.scss";
import NextButton from "../NextButton";
import { useDispatch } from "react-redux";
import { mudaEstado, resetButton } from "../../Store/reducers/BotaoClick";
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
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { memo, useState } from "react";
import { resetDesafio } from "../../Store/reducers/Desafio";
import { resetEstagio } from "../../Store/reducers/Estagios";
import { resetPessoais } from "../../Store/reducers/Pessoais";
import { useNavigate } from "react-router-dom";
import venomBot from "../../Services/venomBot";
import { resetNota } from "../../Store/reducers/Nota";

function Revisao() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let buttonIsValid: boolean = true;
  const [isValid, setIsvalid] = useState<boolean>(false);

  const { pessoais, estagios, nota, desafio } = useSelector(
    (state: Iredux) => state
  );

  const [name] = pessoais;
  const estagiosTrue = estagios.filter(
    (estagio: IEstagio) => estagio.check === true
  );
  const [notaTrue] = nota.filter((nota: INota) => nota.check === true);
  const [desafios] = desafio;

  const [phoneNumber, setPhoneNUmber] = useState<string>("");

  function handleTelefone(ev: React.ChangeEvent<HTMLInputElement>) {
    const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
    var str = ev.target.value.replace(/[^0-9]/g, "").slice(0, 11);
    const result = str.replace(regex, "($1)$2-$3");

    //console.log(regex.test(str))
    regex.test(str) ? setIsvalid(true) : setIsvalid(false);
    setPhoneNUmber(result);
  }

  function formatoResposta() {
    const estagioUsuario = estagiosTrue.map((esta) => esta.resposta);
    const text = `*Nome:* ${name.name}\n*Numero de telefone:* ${phoneNumber}\n\n*Nota do usuario:* ${notaTrue.resposta}\n\n*Estagios de sentimento do usuario:*\n${estagioUsuario}\n\n*Desafio devida no momento:*\n ${desafios.desafio}\n\n*Encontro presencial:*\n ${desafios.presencial}`;

    const resposta = {
      token: "5jpmhoraolsf9t44",
      to: "+5561984074416",
      body: text,
    };

    return resposta;
  }

  async function HandleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (isValid) {
      dispatch(mudaEstado());
      Swal.fire({
        background: "none",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await venomBot
        .post("/messages/chat", formatoResposta())
        .then(() => {
          navigate("/");
          Swal.hideLoading()
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Dados salvos com sucesso",
            showConfirmButton: false,
            background: "#222831",
            color: "#F5F5F5",
            timer: 2000,
          }).then(() => {
            dispatch(resetButton());
            dispatch(resetEstagio());
            dispatch(resetNota());
            dispatch(resetDesafio());
            dispatch(resetPessoais());
          });
        })
        .catch((error) => {
          Swal.hideLoading()
          console.log(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Nao foi possivel salvar a mensagem tente mais tarde",
            showConfirmButton: false,
            background: "#222831",
            color: "#F5F5F5",
            timer: 2000,
          });
        });
      } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Numero de telefone deve ter formato correto",
        showConfirmButton: false,
        background: "#222831",
        color: "#F5F5F5",
        timer: 2000,
      });
    }
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
        <div>
          <div className={styles.input}>
            <input
              placeholder="Ddd + Número de telefone"
              type="tel"
              id="phone"
              name="phone"
              value={phoneNumber}
              onChange={(ev) => handleTelefone(ev)}
              required
            />
            <div className={styles.iconPhone}>
              <FontAwesomeIcon icon={faPhone} shake />
            </div>
          </div>
        </div>
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

        <NextButton isActive={buttonIsValid} />
      </form>
    </>
  );
}

export default memo(Revisao);
