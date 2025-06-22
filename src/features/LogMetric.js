import { useEffect, useRef } from 'react';
import { useFileStore } from '../store/useFileStore';
import {roundMetricsValues} from './roundedMetrics.js'

export const useLogMetrics = () => {
  const {
    isDone,
    isProcessing,
    isInvalidType,
    metrics,
    uploadedFile,
  } = useFileStore();

  const prevProcessingRef = useRef(false);

  useEffect(() => {
    const date = new Date();
    const formattedDate = [
      date.getDate().toString().padStart(2, '0'),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getFullYear(),
    ].join('.');

    const logToStorage = (status) => {
      if (!uploadedFile) return;

      const key = `id_${Date.now()}`;
      const data = JSON.stringify({
        metrics: roundMetricsValues(metrics),
        fileName: uploadedFile.name,
        date: formattedDate,
        status,
      });

      localStorage.setItem(key, data);
    };

    if (prevProcessingRef.current && isDone && uploadedFile) {
      logToStorage(true);
    }

    if (prevProcessingRef.current && isInvalidType && uploadedFile) {
      logToStorage(false);
    }

    prevProcessingRef.current = isProcessing;

    if (!uploadedFile) {
      prevProcessingRef.current = false;
    }
  }, [isDone, isProcessing, isInvalidType, uploadedFile, metrics]);
};