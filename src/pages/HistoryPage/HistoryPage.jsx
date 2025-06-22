import { Container } from "../../components/Container/Container";
import { memo, useEffect, useMemo, useState } from 'react';
import styles from './HistoryPage.module.css'; 
import { HistoryElem } from "../../components/HistoryElem/HistoryElem";
import { ExtraBtn } from "../../components/ExtraBtn/ExtraBtn";
import { ModalWindow } from "../../components/ModalWindow/ModalWindow";

export const HistoryPage = function() {
    const [historyItems, setHistoryItems] = useState([]);
    const [openedModalKey, setOpenedModalKey] = useState(null); 

    const deleteAll = () => {
        localStorage.clear();
        setHistoryItems([]);
        setOpenedModalKey(null);
    };

    useEffect(() => {
        const loadHistory = () => {
            const items = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    if (item?.fileName && item?.date && item?.status !== undefined) {
                        items.push({
                            key, 
                            name: item.fileName,
                            date: item.date,
                            status: item.status,
                            metrics: item.metrics || {} 
                        });
                    }
                } catch (e) {
                    console.error('Ошибка парсинга записи:', key, e);
                }
            }
            setHistoryItems(items);
        };

        loadHistory();
        window.addEventListener('storage', loadHistory);
        
        return () => {
            window.removeEventListener('storage', loadHistory);
        };
    }, []);

    const handleDelete = (key) => {
        localStorage.removeItem(key);
        setHistoryItems(prev => prev.filter(item => item.key !== key));
        if (openedModalKey === key) {
            setOpenedModalKey(null); 
        }
    };

    const toggleModal = (key) => {
        setOpenedModalKey(prev => prev === key ? null : key);
    };

    return (
        <Container>
            <div id="modal-root"></div>
            
            <div className={styles.historyContainer}>
                {historyItems.length > 0 ? (
                    historyItems.map((item) => (
                        <div key={item.key} className={styles.historyItemContainer}>
                            <HistoryElem
                                name={item.name}
                                date={item.date}
                                bool={item.status}
                                onClick={() => item.status && toggleModal(item.key)} // Открываем только для успешных статусов
                            />
                            <button 
                                className={styles.delete} 
                                onClick={() => handleDelete(item.key)}
                                aria-label="Удалить запись"
                            >
                                <svg width="25" height="27" viewBox="0 0 25 27" fill="none">
                                    <path 
                                        d="M5 27C4.175 27 3.469 26.7065 2.882 26.1195C2.295 25.5325 2.001 24.826 2 24V4.5H0.5V1.5H8V0H17V1.5H24.5V4.5H23V24C23 24.825 22.7065 25.5315 22.1195 26.1195C21.5325 26.7075 20.826 27.001 20 27H5ZM8 21H11V7.5H8V21ZM14 21H17V7.5H14V21Z" 
                                        fill="#FF5F00" 
                                    />
                                </svg>
                            </button>
                            
                            <ModalWindow 
                                metrics={item.metrics}
                                isOpen={openedModalKey === item.key}
                                onClose={() => setOpenedModalKey(null)}
                            />
                        </div>
                    ))
                ) : (
                    <p className={styles.noDataText}>Нет данных в истории</p>
                )}
            </div>

            <ExtraBtn onClick={deleteAll}/>
        </Container>
    );
};
