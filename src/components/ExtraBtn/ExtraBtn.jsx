import { Router } from 'react-router-dom'
import styles from './ExtraBtn.module.css'
import { Link, NavLink } from 'react-router-dom'

export const ExtraBtn = ({ onClick }) => {
    return (
        <div className={styles.cont}>
            <button className={styles.route}>
                <NavLink className={styles.routeLink} to="/table-generator">Сгенерировать больше</NavLink>
            </button>
            <button className={styles.deleteAll} onClick={onClick}>Очистить все</button>
        </div>
    )
}