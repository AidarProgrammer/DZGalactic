import { Link } from 'react-router-dom'
import { Container } from '../Container/Container'
import styles from './Header.module.css'
import { Navigation } from '../Navigation/Navigation'

export const Header = function Header() {
    return (
        <Container>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.header__inner}>
                        <div className={styles.header__info}>
                            <div className={styles.header__logo}>
                                <img src="/images/header_logo.png" alt="Логотип" />
                            </div>
                            <h2 className={styles.header__heading}>
                                Межгалактическая аналитика
                            </h2>
                        </div>
                        <div className={styles.header__btns}>
                            <Navigation/>
                        </div>
                    </div>
                </div>
            </header>
        </Container>
    )
}