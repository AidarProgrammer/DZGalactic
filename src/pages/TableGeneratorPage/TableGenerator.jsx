import { useState } from "react";
import { CloseBtn } from "../../components/CloseBtn/CloseBtn";
import { Container } from "../../components/Container/Container"
import styles from "./TableGenerator.module.css"

const STATUS = {
    default: 'default',
    uploaded: 'uploaded',
    process: 'processing',
    error: 'error',
    done: 'done',
};

export const TableGenerator = function () {

    const [actualStatus, setActualStatus] = useState(STATUS.default)

    const downloadCsv = async () => {
        try {
            setActualStatus(STATUS.process);
            const url = 'http://localhost:3000/report?size=0.1&maxSpend=1000';

            const response = await fetch(url);
            if (!response.ok) throw new Error('Server error');

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'report.csv';
            link.click();

            setTimeout(() => {
                window.URL.revokeObjectURL(downloadUrl);
                setActualStatus(STATUS.done);
            }, 100);

        } catch (error) {
            setActualStatus(STATUS.error);
        }
    };



    return (
        <Container>
            <div className={styles.content}>
                <p className={styles.paragraph}>
                    Сгенерируйте готовый csv-файл нажатием одной кнопки
                </p>
                <div>
                    <button className={`
                            ${styles.button}
                            ${actualStatus === STATUS.default ? styles.defaultState : ''}
                            ${actualStatus === STATUS.process ? styles.processState : ''}
                            ${actualStatus === STATUS.error ? styles.errorState : ''}
                            ${actualStatus === STATUS.done ? styles.doneState : ''}
                    `}
                        onClick={downloadCsv}>
                        {
                            actualStatus === STATUS.default ? 'Начать генерацию' :
                                actualStatus === STATUS.error ? 'Ошибка' :
                                    actualStatus === STATUS.done ? "Done!" : '_'
                        }
                    </button>
                    <CloseBtn
                        className={
                            actualStatus === STATUS.default || actualStatus === STATUS.process
                                ? styles.closed
                                : ''
                        }
                        onClick={() => { setActualStatus(STATUS.default) }}
                    />
                    <p className={`${styles.information} ${actualStatus === STATUS.error ? styles.error : ''}`}>{actualStatus === STATUS.process ? 'идёт процесс генерации' :
                        actualStatus === STATUS.error ? 'упс, не то...' :
                            actualStatus === STATUS.done ? 'файл сгенерирован!' : ''
                    }
                    </p>
                </div>
            </div>

        </Container >
    );
};


