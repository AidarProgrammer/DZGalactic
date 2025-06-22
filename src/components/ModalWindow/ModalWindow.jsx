import { createPortal } from 'react-dom';
import { CalculateDay } from '../../features/calculateDay';
import { CsvStatistic } from '../CsvStatistic/CsvStatistic';
import style from './ModalWindow.module.css';

const METRIC_TITLES = [
    ['Общие расходы в галактических кредитах', 'total_spend_galactic'],
    ['Цивилизация с минимальными расходами', 'less_spent_civ'],
    ['Количество обработанных записей', 'rows_affected'],
    ['День года с максимальными расходами', 'big_spent_at'],
    ['День года с минимальными расходами', 'less_spent_at'],
    ['Максимальная сумма расходов за день', 'big_spent_value'],
    ['Цивилизация с максимальными расходами', 'big_spent_civ'],
    ['Средние расходы в галактических кредитах', 'average_spend_galactic']
];

const ModalPortal = ({ children }) => {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;
    return createPortal(children, modalRoot);
};

export const ModalWindow = ({ metrics, isOpen, onClose }) => {
    if (!isOpen || !metrics || typeof metrics !== 'object') return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <ModalPortal>
            <div className={style.modalOverlay} onClick={handleOverlayClick}>
                <div className={style.modalContent}>
                     <button className={style.closeButton} onClick={onClose}>
                            Х
                        </button>
                    <div className={style.mod}>
                       

                        {METRIC_TITLES.map(([info, key]) => {
                            const value = metrics[key];

                            if (value === undefined || value === null) {
                                return (
                                    <CsvStatistic
                                        key={key}
                                        info={info}
                                        title="Данные отсутствуют"
                                    />
                                );
                            }
                                
                            if (key === "less_spent_at" || key === 'big_spent_at') {
                                return (
                                    <CsvStatistic
                                        key={key}
                                        info={info}
                                        title={CalculateDay(Number(value))}
                                    />
                                );
                            }

                            return (
                                <CsvStatistic
                                    key={key}
                                    info={info}
                                    title={value}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </ModalPortal>
    );
};