import { useState } from 'react';
import SortVisualizer from './components/SortVisualizer'; 
import { bubbleSort, selectionSort } from './algorithms/Algorithms';

function App() {
  const [globalArray, setGlobalArray] = useState([5, 3, 8, 1, 2, 4, 6, 7]);
  const [globalSpeed, setGlobalSpeed] = useState(1000);
  const [isSorting, setIsSorting] = useState(false);
  const [hoverStates, setHoverStates] = useState({ bubble: false, selection: false }); // Hover states for visualizers
  
  
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

  return (
    <div style={{padding: "20px", textAlign: "center", display: 'grid', marginTop: '5px', marginLeft: '20px'}}>
      <h1>Algorithm Visualizer</h1>
      {/* Global Controls */}
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto auto", gap: "20px", marginTop: "20px" }}>
      {/* Bubble Sort Visualizer */}
      <div style={{ gridColumn: "1 / 2", gridRow: "1", borderRadius: "8px", padding: "5px", transition: 'transform 0.3s ease',  transform: hoverStates.bubble ? 'scale(1.05)' : 'scale(1)'}}
      onMouseEnter={() => handleMouseEnter('bubble')} 
      onMouseLeave={() => handleMouseLeave('bubble')}>
      <SortVisualizer algorithmName="Bubble Sort" sortingLogic={bubbleSort} globalArray={globalArray} globalSpeed={globalSpeed} isGlobalSorting={isSorting} />
      </div>
      {/* Selection Sort Visualizer */}
      <div style={{ gridColumn: "2 / 3", gridRow: "1", borderRadius: "8px", padding: "5px", transition: 'transform 0.3s ease',  transform: hoverStates.selection ? 'scale(1.05)' : 'scale(1)'}}
      onMouseEnter={() => handleMouseEnter('selection')} 
      onMouseLeave={() => handleMouseLeave('selection')}>
      <SortVisualizer algorithmName="Selection Sort" sortingLogic={selectionSort} globalArray={globalArray} globalSpeed={globalSpeed} isGlobalSorting={isSorting} />
      </div>
    </div>
    </div>
  );
}

export default App;