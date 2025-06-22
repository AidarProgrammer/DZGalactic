import styles from './CloseBtn.module.css'

export const CloseBtn = ({ onClick, className = '' }) => {
    return (
        <button 
            className={`${styles.closeButton} ${className}`}
            onClick={onClick}
        >
            ×
        </button>
    );
};