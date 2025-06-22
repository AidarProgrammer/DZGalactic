import { useCallback, useState, useRef } from 'react';
import styles from './DownloadFile.module.css';
import { useFileStore } from '../../store/useFileStore';
import { CloseBtn } from '../CloseBtn/CloseBtn';

export const DownloadFile = function () {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

     const {
        uploadedFile,
        setUploadedFile,
        resetFile,
        isInvalidType,
        setIsInvalidType,
        isProcessing,
        isDone,
        setIsDone,
        setMetrics 
    } = useFileStore();

     const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
            setIsInvalidType(!file.name.toLowerCase().endsWith('.csv'));
            setIsDone(false);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(e.type === 'dragenter' || e.type === 'dragover');
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setUploadedFile(file);
            setIsInvalidType(!file.name.toLowerCase().endsWith('.csv'));
            setIsDone(false); 
        }
    }, [setUploadedFile, setIsInvalidType, setIsDone]);

    const handleReset = (e) => {
        e.stopPropagation();
        resetFile();
        setIsInvalidType(false);
        setIsDone(false);
        setMetrics(null); 
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setIsDragging(false)
    };
    return (
        
        <div className={styles.container}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".csv"
            />
            <div
                className={ `${styles.dropZone}
    ${isInvalidType ? styles.hasInvalid : ''}
    ${uploadedFile && !isInvalidType ? styles.hasFile : ''}
    ${isDragging ? styles.dragging : ''}
    ${isProcessing ? styles.processing : ''}
    ${isDone ? styles.done : ''}
  `}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                
            >
                <div className={styles.btn}>
                    <button
                        className={`${styles.uploadButton} 
                                  ${isInvalidType ? styles.error : ''}
                                  ${isProcessing ? styles.processing : ''}
                                  ${isDone ? styles.done : ''}
                                  ${uploadedFile && !isInvalidType && !isProcessing && !isDone ? styles.uploaded : ''}`}
                        onClick={handleButtonClick}
                        disabled={isProcessing}
                    >
                        {uploadedFile ? uploadedFile.name : 'Загрузить файл'}
                    </button>
                    
                    {(uploadedFile && !isProcessing) && (
                        <CloseBtn onClick={handleReset}/>
                    )}
                </div>
                <p className={isInvalidType ? styles.hintTextError : styles.hintText}>
                    {isInvalidType
                        ? 'упс, не то...'
                        : isProcessing
                            ? 'Идёт парсинг файла'
                            : isDone
                                ? 'Готово!'
                                : uploadedFile
                                    ? 'Файл загружен!'
                                    : 'Или перетащите отсюда'}
                </p>
            </div>
        </div>
    );
};