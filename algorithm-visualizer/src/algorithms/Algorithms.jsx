export const bubbleSort = async (array, setArray, setCurrentIndex, speed) => {
    let sortedArray = [...array];
    for (let i = 0; i < sortedArray.length - 1; i++) {
        for (let j = 0; j < sortedArray.length - i - 1; j++) {
            setCurrentIndex(j + 1);
            if (sortedArray[j] > sortedArray[j + 1]) {
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                setArray([...sortedArray]);
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        }
    }
};


export const selectionSort = async (array, setArray, setCurrentIndex, setMinIndex, speed) => {
    let sortedArray = [...array];
    
    for (let i = 0; i < sortedArray.length; i++) {
        let minIndex = i;
        setCurrentIndex(i);
        setMinIndex(minIndex);  // Inicializar minIndex en cada iteración externa
        
        for (let j = i + 1; j < sortedArray.length; j++) {
            if (sortedArray[j] < sortedArray[minIndex]) {
                minIndex = j;
                setMinIndex(minIndex);  // Actualizar minIndex cuando se encuentra uno nuevo
            }
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        
        if (minIndex !== i) {
            // Intercambiar los elementos en los índices i y minIndex
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
            setArray([...sortedArray]);
            await new Promise(resolve => setTimeout(resolve, speed));  // Pausa para animación
        }
    }
    
    setCurrentIndex(null);  // Limpiar índices después de la ordenación
    setMinIndex(null);
};

