import { useNavigate } from 'react-router-dom';
import styles from './home.module.scss';


export default function Home() {

    const nav = useNavigate()
    return (
        <div className={styles.home}>
            <div className={styles.fundoCard}>
                <button
                    className={styles.botaoComecar}
                    onClick={() => nav('/questions')}
                >começar
                </button>
            </div>
        </div>
    )
}