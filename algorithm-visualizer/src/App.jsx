import { useState } from 'react';
import SortVisualizer from './components/SortVisualizer'; 
import { bubbleSort, selectionSort, mergeSort, quickSort, insertionSort, heapSort, radixSort, countingSort, timSort} from './algorithms/Algorithms';

function App() {
  const [globalArray, setGlobalArray] = useState([5, 3, 8, 1, 2, 4, 6, 7]);
  const [globalSpeed, setGlobalSpeed] = useState(1000);
  const [isSorting, setIsSorting] = useState(false);
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
    const value = e.target.value;
    const validNumbers = value.split(",").map(num => parseInt(num)).filter(num => !isNaN(num));
    setGlobalArray(validNumbers);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", display: 'grid', marginTop: '5px', marginLeft: '20px' }}>
      <h1>Algorithm Visualizer</h1>
      <div>
        <input
          type="text"
          placeholder="Enter numbers separated by commas"
          onChange={handleArrayInput}
          value={globalArray.join(",")}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={generateArray}>New Values</button>
        <button onClick={handleGlobalSort} disabled={isSorting}>Sort All</button>
        <button onClick={handleActivate}>Activate</button>
        <div>
          <label htmlFor="globalSpeed">Global Speed:</label>
          <input type='range' min='100' max='2000' value={globalSpeed} onChange={(e) => setGlobalSpeed(Number(e.target.value))} />
          <span>{globalSpeed} ms</span>
        </div>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "20px",
        gridAutoRows: "1fr"
      }}>
        {algorithms.map(({ key, name, sortFunc }) => (
          <div key={key} style={{
            borderRadius: "8px",
            padding: "5px",
            transition: 'transform 0.3s ease',
            transform: hoverStates[key] ? 'scale(1.05)' : 'scale(1)',
            height: "100%",
            overflow: "hidden"
          }}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={() => handleMouseLeave(key)}>
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