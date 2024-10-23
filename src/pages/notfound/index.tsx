import { Link } from 'react-router-dom'
import styles from './notfound.module.css'

export function Notfound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.text}><span className={styles.span}>Página 404,</span> cripto não encontrada!</h1>
      <Link to="/">
        <button type="button" className={styles.buttonMore}>
          voltar
        </button>
      </Link>
    </div>
  )
}