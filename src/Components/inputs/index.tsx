import { useState } from "react";
import styles from "./inputs.module.scss";
import { useDispatch } from "react-redux";
import { cadastraPessoa } from "../../Store/reducers/Pessoais";
import NextButton from "../NextButton";
import { mudaEstado } from "../../Store/reducers/BotaoClick";
import { useSelector } from "react-redux";
import { Iredux } from "../../tipos/funcao";

export default function Inputs() {
  const dispatch = useDispatch();

  const [actualStatate] = useSelector((state: Iredux) => state.pessoais);

  const [name, setName] = useState<string>(actualStatate.name);

  function Handle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    salva(ev);
    if (isActive) {
      dispatch(mudaEstado());
    }
  }

  const isActive = name.length >= 3 ? true : false;

  function salva(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const pessoaData = [
      {
        name: name,
      },
    ];
    dispatch(cadastraPessoa(pessoaData));
  }

  return (
    <>
      <form onSubmit={(ev) => Handle(ev)} className={styles.struturaFormInputs}>
        <p className="titulo">Digite nome completo</p>
        <input
          type="text"
          placeholder="nome"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <NextButton isActive={isActive} />
      </form>
    </>
  );
}
