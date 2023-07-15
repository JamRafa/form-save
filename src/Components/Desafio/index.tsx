import { useState } from "react";
import styles from "./Desafio.module.scss";
import NextButton from "../NextButton";
import { useDispatch } from "react-redux";
import { mudaEstado } from "../../Store/reducers/BotaoClick";
import { useSelector } from "react-redux";
import { Iredux } from "../../tipos/funcao";
import { cadastraDesafio } from "../../Store/reducers/Desafio";

export default function Desafio() {
  const dispatch = useDispatch();

  const [actualStatate] = useSelector((state: Iredux) => state.desafio);

  console.log(actualStatate, 'a')

  const [chalenge, setChalenge] = useState<string>(actualStatate.desafio);
  const [presencialmente, setPresencialmente] = useState<string>(actualStatate.presencial);


  function Handle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const desafioData = [
      {
        desafio: chalenge,
        presencial: presencialmente
      }
    ]
    dispatch(cadastraDesafio(desafioData))
    dispatch(mudaEstado());
  }

  return (
    <>
      <form onSubmit={(ev) => Handle(ev)} className={styles.struturaFormInputs}>
        <p>Qual o seu maior desafio no momento ?</p>
        <textarea
          rows={4}
          cols={200}
          placeholder="Digite..."
          value={chalenge}
          onChange={(ev) => setChalenge(ev.target.value)}
        />
        <p>Porque devemos nos ver presencialmente ?</p>
        <textarea
          rows={4}
          cols={200}
          placeholder="Digite..."
          value={presencialmente}
          onChange={(ev) => setPresencialmente(ev.target.value)}
        />

        <NextButton />
      </form>
    </>
  );
}
