import { useEffect } from 'react';
import { useFileStore } from '../../store/useFileStore';
import styles from './SendCsv.module.css';
import {useLogMetrics} from '../../features/LogMetric'

export const SendCsv = function () {
    const {
        uploadedFile,
        isInvalidType,
        isProcessing,
        isDone,
        setIsProcessing,
        setIsDone,
        metrics,
        setMetrics,
        setIsInvalidType
    } = useFileStore();
    useLogMetrics()
   
    const handleSend = async () => {
        if (!uploadedFile || isInvalidType) {
            alert('Сначала загрузите корректный CSV файл');
            return;
        }

        setIsProcessing(true);

        const formData = new FormData();
        formData.append('file', uploadedFile);

        try {
            const response = await fetch('http://localhost:3000/aggregate?rows=10000', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                setIsInvalidType(true);
                throw new Error('Ошибка при отправке файла');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop();

                for (const line of lines) {
                    if (line.trim()) {
                        try {
                            const json = JSON.parse(line);
                            setMetrics(json);
                        } catch (err) {
                            console.error('Ошибка парсинга JSON:', err, line);
                        }
                    }
                }
            }

            if (buffer.trim()) {
                try {
                    const json = JSON.parse(buffer);
                    setMetrics(json);
                } catch (err) {
                    console.error('Ошибка парсинга последнего JSON:', err, buffer);
                }
            }

            setIsDone(true);

        } catch (error) {
            console.error('Ошибка:', error);
            setIsInvalidType(true); 
        } finally {
            setIsProcessing(false);
        }
    };

    const shouldShowButton =
        (!uploadedFile && !isInvalidType) ||
        (uploadedFile && !isInvalidType && !isProcessing && !isDone);

    if (!shouldShowButton) return null;

    return (
        <button
            className={`${styles.button} ${uploadedFile ? styles.activeButton : ''
                }`}
            onClick={handleSend}
        >
            Отправить
        </button>
    );
};