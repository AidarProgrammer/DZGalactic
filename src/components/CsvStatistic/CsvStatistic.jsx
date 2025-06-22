import styles from './CsvStatistic.module.css'

export const CsvStatistic = function({title, info, index}){
    return(
    <div className={styles.metric} key={index}>
        <p className={styles.tit}>{title}</p>
        <p className={styles.paragraph}>{info}</p>
    </div>
    )
}