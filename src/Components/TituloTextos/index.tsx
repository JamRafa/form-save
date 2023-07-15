import styles from './TextosTitulos.module.scss';


interface TextosTitulosProps {
  titulo?: string
  tituloColorido?: string
  subtitulo: string
}

export default function TextoTitulos({
  titulo = 'Preencha os',
  tituloColorido = 'campos',
  subtitulo='councluido' }: TextosTitulosProps) {


  return (
    <div className={styles.titulos}>
      <p className={styles.titulo}>{titulo}<b> {tituloColorido}</b> </p>
      <p className={styles.subTitulo}>{subtitulo!}</p>
    </div>


  )
}