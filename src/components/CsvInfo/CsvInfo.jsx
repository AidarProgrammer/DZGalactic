import styles from './CsvInfo.module.css'
import { CalculateDay } from '../../features/calculateDay'

import { useFileStore } from '../../store/useFileStore';
import { CsvStatistic } from '../CsvStatistic/CsvStatistic';
const titles = [
    ['общие расходы в галактических кредитах', 'total_spend_galactic'],
    ['цивилизация с минимальными расходами', 'less_spent_civ'],
    ['количество обработанных записей', 'rows_affected'],
    ['день года с максимальными расходами', 'big_spent_at'],
    ['день года с минимальными расходами', 'less_spent_at'],
    ['максимальная сумма расходов за день', 'big_spent_value'],
    ['цивилизация с максимальными расходами', 'big_spent_civ'],
    ['средние расходы в галактических кредитах', 'average_spend_galactic']
]

export const CsvInfo = () => {
    const metrics = useFileStore(state => state.metrics);

    if (!metrics || Object.keys(metrics).length === 0) {
        return <p className={styles.infoText}>Здесь появятся <br />хайлайты</p>;
    }

    return (
        <div>
            <div className={styles.metric}>
                {titles.map((elem, index) => {
                    if (elem[1] === "less_spent_at" || elem[1] === 'big_spent_at') {
                        return (
                            <CsvStatistic info={elem[0]} key={index} title={CalculateDay(Number(metrics[elem[1]]))} />
                        )
                    }
                    return (
                        <CsvStatistic info={elem[0]} key={index} title={metrics[elem[1]]} />
                    )
                })}
            </div>
        </div>
    );
};
