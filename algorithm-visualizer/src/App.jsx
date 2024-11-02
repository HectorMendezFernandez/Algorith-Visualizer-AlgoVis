import { useState } from 'react';
import SortVisualizer from './components/SortVisualizer'; 
import { bubbleSort, selectionSort, mergeSort, quickSort, insertionSort, heapSort, radixSort, countingSort, timSort} from './algorithms/Algorithms';
import './styles/App.css';

function App() {
  const [globalArray, setGlobalArray] = useState([5, 3, 8, 1, 2, 4, 6, 7]);
  const [globalSpeed, setGlobalSpeed] = useState(1000);
  const [isSorting, setIsSorting] = useState(false);
  const [inputArray, setInputArray] = useState(globalArray); // Array estático para el input
  // eslint-disable-next-line no-unused-vars
  const [hoverStates, setHoverStates] = useState({ bubble: false, selection: false, merge: false , quick: false, insertion:false, heap: false, radix: false, counting:false, shell:false, tim: false }); // Hover states for visualizers
  
  var algorithms = [
    { key: 'bubble', name: 'Bubble Sort', sortFunc: bubbleSort },
    { key: 'selection', name: 'Selection Sort', sortFunc: selectionSort },
    { key: 'merge', name: 'Merge Sort', sortFunc: mergeSort },
    { key: 'quick', name: 'Quick Sort', sortFunc: quickSort },
    { key: 'insertion', name: 'Insertion Sort', sortFunc: insertionSort },
    { key: 'heap', name: 'Heap Sort', sortFunc: heapSort },
    { key: 'radix', name: 'Radix Sort', sortFunc: radixSort },
    { key: 'counting', name: 'Counting Sort', sortFunc: countingSort },
    { key: 'tim', name: 'Tim Sort', sortFunc: timSort }
  ];
  // Function to sort all the algorithms simultaneously
  const handleGlobalSort = () => {
  // this will click all the sort buttons simultaneously
  setIsSorting(true);
  document.querySelectorAll(".sort-btn").forEach((button) => button.click());
  }

  // Function to generate a new array
  const generateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10) + 1);
    setGlobalArray(newArray);
    setInputArray(newArray); // Actualiza también la copia estática
  };

  // Function to restart the app
  const handleActivate = () => {
    setIsSorting(false);
  }

  // Function to handle hover states
  const handleMouseEnter  = (key) => {
    setHoverStates(prevState => ({ ...prevState, [key]: true }));
  }

  const handleMouseLeave = (key) => {
    setHoverStates(prevState => ({ ...prevState, [key]: false }));
  };

  const handleArrayInput = (e) => {
    const inputValue = e.target.value;
    if (/^[0-9, ]*$/.test(inputValue) && !isSorting) { // Solo permitir cambios si no está ordenando
      const newArray = inputValue.split(",").map(Number).filter(num => !isNaN(num));
      setGlobalArray(newArray);
      setInputArray(newArray); // Actualiza también la copia estática
    }
  };

  return (
    <div className="app-container">
      <h1>Algorithm Visualizer</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter numbers separated by commas"
          onChange={handleArrayInput}
          value={inputArray.join(",")}
          className="array-input"
        />
      </div>
      <div className="controls">
        <button onClick={generateArray}>New Values</button>
        <button onClick={handleGlobalSort} disabled={isSorting}>Sort All</button>
        <button onClick={handleActivate}>Activate</button>
        <div>
          <label htmlFor="globalSpeed">Global Speed:</label>
          <input
            type="range"
            min="100"
            max="2000"
            value={globalSpeed}
            onChange={e => setGlobalSpeed(Number(e.target.value))}
          />
          <span>{globalSpeed} ms</span>
        </div>
      </div>
      <div className="visualizers">
        {algorithms.map(({ key, name, sortFunc }) => (
          <div key={key}
            className="visualizer"
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={() => handleMouseLeave(key)}
          >
            <SortVisualizer
              algorithmName={name}
              sortingLogic={sortFunc}
              globalArray={globalArray}
              globalSpeed={globalSpeed}
              isGlobalSorting={isSorting}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;