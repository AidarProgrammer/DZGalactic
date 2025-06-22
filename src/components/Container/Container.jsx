import { Children } from 'react'
import styles from './Container.module.css'

export const Container = function ({ children }){
    return(
        <div className={styles.container}>{children}</div>
    )
}