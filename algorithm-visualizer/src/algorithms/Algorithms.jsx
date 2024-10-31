
// Bubble Sort Algorithm
export const bubbleSort = async (array, setArray, setCurrentIndex, speed) => {
    /*
    Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps
    them
    */
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

// Selection Sort Algorithm
export const selectionSort = async (array, setArray, setCurrentIndex, setMinIndex, speed) => {
    /*
    Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: the sublist of items already sorted
    and the sublist of items remaining to be sorted. The algorithm selects the smallest element from the unsorted sublist in each iteration 
    and swaps it with the leftmost unsorted element. The selection sort algorithm has a time complexity of O(n^2) for the worst-case scenario.
    */
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

// Merge Sort Algorithm
export const mergeSort = async (array, setArray, setCurrentIndex, speed) => {
    /*
    Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts the two halves, and then merges
    the sorted halves. The merge sort algorithm has a time complexity of O(n log n) for the worst-case scenario.
    */
    let sortedArray = [...array];
    
    const merge = async (left, right, start, end) => {
        let i = start;
        let j = 0;
        let k = 0;
        
        while (i < end) {
            if (j >= left.length) {
                sortedArray[i++] = right[k++];
            } else if (k >= right.length) {
                sortedArray[i++] = left[j++];
            } else if (left[j] < right[k]) {
                sortedArray[i++] = left[j++];
            } else {
                sortedArray[i++] = right[k++];
            }
            setArray([...sortedArray]);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    };
    
    const mergeSortHelper = async (start, end) => {
        if (end - start <= 1) {
            return;
        }
        
        const mid = Math.floor((start + end) / 2);
        await mergeSortHelper(start, mid);
        await mergeSortHelper(mid, end);
        
        const left = sortedArray.slice(start, mid);
        const right = sortedArray.slice(mid, end);
        
        await merge(left, right, start, end);
    };
    
    await mergeSortHelper(0, sortedArray.length);
    
    setCurrentIndex(null);  // Limpiar índices después de la ordenación
};

// Quick Sort Algorithm
export const quickSort = async (array, setArray, setCurrentIndex, speed) => {
    /*
    Quick Sort is a comparison-based sorting algorithm that uses a divide-and-conquer strategy to divide the input array into two partitions
    (elements less than a pivot and elements greater than a pivot), recursively sorts the partitions, and then combines the sorted partitions.
    The quick sort algorithm has a time complexity of O(n log n) for the average-case scenario and O(n^2) for the worst-case scenario.
    */
    const quickSortHelper = async (arr, left, right) => {
        if (left < right) {
            const pivotIndex = await partition(arr, left, right);
            await quickSortHelper(arr, left, pivotIndex - 1);
            await quickSortHelper(arr, pivotIndex + 1, right);
            setArray([...arr]); // Actualiza el array visualizado
        }
    };

    const partition = async (arr, left, right) => {
        const pivotValue = arr[right];
        let pivotIndex = left;

        for (let i = left; i < right; i++) {
            setCurrentIndex(i); // Resalta el índice actual
            if (arr[i] < pivotValue) {
                [arr[pivotIndex], arr[i]] = [arr[i], arr[pivotIndex]];
                pivotIndex++;
                setArray([...arr]);
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        }
        [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, speed));
        return pivotIndex;
    };

    await quickSortHelper([...array], 0, array.length - 1);
};

// Insertion Sort Algorithm
export const insertionSort = async (array, setArray, setCurrentIndex, speed) => {
    /*
    Insertion Sort is a simple comparison-based sorting algorithm that builds the final sorted array one element at a time. It takes each
    element from the input array and inserts it into its correct position in the sorted array. The insertion sort algorithm has a time
    complexity of O(n^2) for the worst-case scenario.
    */
    let arr = [...array];

    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > current) {
            setCurrentIndex(j);
            arr[j + 1] = arr[j];
            setArray([...arr]);
            await new Promise(resolve => setTimeout(resolve, speed));
            j--;
        }
        arr[j + 1] = current;
        setArray([...arr]);
    }
};



