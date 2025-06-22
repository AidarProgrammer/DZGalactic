import { create } from 'zustand';

export const useFileStore = create((set) => ({
    uploadedFile: null,
    metrics: null,
    isInvalidType: false,
    isProcessing: false,
    isDone: false,
    
    setUploadedFile: (file) => set({ uploadedFile: file }),
    setMetrics: (metrics) => set({ metrics }),
    setIsInvalidType: (state) => set({ isInvalidType: state }),
    setIsProcessing: (state) => set({ isProcessing: state }),
    setIsDone: (done) => set({ isDone: done }),
    
    resetFile: () => set({ 
        uploadedFile: null,
        metrics: null, 
        isInvalidType: false,
        isProcessing: false,
        isDone: false
    }),
}));