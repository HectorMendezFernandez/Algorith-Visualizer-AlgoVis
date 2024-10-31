
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


// Heap Sort Algorithm
export const heapSort = async (array, setArray, setCurrentIndex, speed) => {
    /*
    Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure to build a heap from the input array and then
    repeatedly extracts the maximum element from the heap and rebuilds the heap. The heap sort algorithm has a time complexity of O(n log n)
    for the worst-case scenario.
    */
    const heapify = async (arr, n, i) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            setArray([...arr]);
            await new Promise(resolve => setTimeout(resolve, speed));
            await heapify(arr, n, largest);
        }
    };

    const n = array.length;
    let arr = [...array];

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, speed));
        await heapify(arr, i, 0);
    }
};

// Radix Sort Algorithm
export const radixSort = async (array, setArray, setCurrentIndex, speed) => {
    /*
    Radix Sort is a non-comparison-based sorting algorithm that sorts the input array by processing individual digits of the elements in the
    array. The radix sort algorithm has a time complexity of O(nk) for the worst-case scenario, where n is the number of elements in the input
    array and k is the number of digits in the maximum element in the input array.
    */
    const maxNum = Math.max(...array);
    let divisor = 1;

    while (parseInt(maxNum / divisor) > 0) {
        //Create 10 buckets for each digit (0-9)
        let buckets = Array.from({ length: 10 }, () => []);

        for (let i = 0; i < array.length; i++) {
            const digit = Math.floor(array[i] / divisor) % 10;
            setCurrentIndex(i);  // Resaltar el índice actual
            buckets[digit].push(array[i]);
            await new Promise(resolve => setTimeout(resolve, speed));
        }

        //Concatenate the buckets
        array = [].concat(...buckets);
        setArray([...array]);
        divisor *= 10;
    }
    setCurrentIndex(null);
};

// Counting Sort Algorithm
export const countingSort = async (array, setArray, setCurrentIndex, speed) => {
    /*
    Counting Sort is a non-comparison-based sorting algorithm that sorts the input array by counting the number of occurrences of each unique
    element in the input array and using the counts to determine the positions of each element in the sorted array. The counting sort algorithm
    has a time complexity of O(n + k) for the worst-case scenario, where n is the number of elements in the input array and k is the range of
    the input.
    */
    const max = Math.max(...array);
    const count = Array(max + 1).fill(0);

    // Count the number of occurrences of each
    for (let i = 0; i < array.length; i++) {
        setCurrentIndex(i);
        count[array[i]]++;
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    // Reconstruct the sorted array
    let index = 0;
    for (let i = 0; i <= max; i++) {
        while (count[i] > 0) {
            array[index] = i;
            setArray([...array]);
            setCurrentIndex(index);
            count[i]--;
            index++;
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }
    setCurrentIndex(null); // Limpiar después de terminar
};

// Tim Sort Algorithm
export const timSort = async (array, setArray, setCurrentIndex, speed) => {
    /*
    Tim Sort is a hybrid sorting algorithm derived from merge sort and insertion sort. It is designed to perform well on many kinds of real-world
    data. The tim sort algorithm has a time complexity of O(n log n) for the worst-case scenario.
    */

    // Minimum run size
    const RUN = 32;
    // Insertion sort function
    const insertionSort = async (left, right) => {
        for (let i = left + 1; i <= right; i++) {
            let temp = array[i];
            let j = i - 1;

            while (j >= left && array[j] > temp) {
                array[j + 1] = array[j];
                j--;
                setArray([...array]);
                setCurrentIndex(j + 1);
                await new Promise(resolve => setTimeout(resolve, speed));
            }
            array[j + 1] = temp;
            setArray([...array]);
        }
    };
    // Merge function
    const merge = async (l, m, r) => {
        let left = array.slice(l, m + 1);
        let right = array.slice(m + 1, r + 1);

        let i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                array[k] = left[i];
                i++;
            } else {
                array[k] = right[j];
                j++;
            }
            setArray([...array]);
            setCurrentIndex(k);
            await new Promise(resolve => setTimeout(resolve, speed));
            k++;
        }
        
        while (i < left.length) {
            array[k] = left[i];
            i++; k++;
            setArray([...array]);
            setCurrentIndex(k - 1);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        
        while (j < right.length) {
            array[k] = right[j];
            j++; k++;
            setArray([...array]);
            setCurrentIndex(k - 1);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    };
    // Sort the array using insertion sort
    for (let i = 0; i < array.length; i += RUN) {
        await insertionSort(i, Math.min(i + RUN - 1, array.length - 1));
    }
    // Merge the sorted runs
    for (let size = RUN; size < array.length; size = 2 * size) {
        for (let left = 0; left < array.length; left += 2 * size) {
            const mid = Math.min(left + size - 1, array.length - 1);
            const right = Math.min(left + 2 * size - 1, array.length - 1);
            if (mid < right) await merge(left, mid, right);
        }
    }
    setCurrentIndex(null);
};


