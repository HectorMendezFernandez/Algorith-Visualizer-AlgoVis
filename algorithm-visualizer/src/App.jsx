// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import BubbleSort from './algorithms/BubbleSort'
import BubbleSortVisualizer from './algorithms/BubbleSortVisualizer'
import SelectionSortVisualizer from './algorithms/SelectionSortVisualizer'
import { useState } from 'react'

function App() {
  const [globalArray, setGlobalArray] = useState([5, 3, 8, 1, 2, 4, 6, 7]);
  const [globalSpeed, setGlobalSpeed] = useState(1000); //Initial speed in milliseconds

  // Function to generate a new array
  const generateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10) + 1);
    setGlobalArray(newArray);
  };

  // Function to sort all the algorithms simultaneously
  const handleGlobalSort = () => {
    // this will click all the sort buttons simultaneously
    document.querySelectorAll(".sort-btn").forEach((button) => button.click());
  }


  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Algorithm Visualizer</h1>
      {/* Controles globales */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={generateArray}>Restart Values</button>
        <button onClick={handleGlobalSort}>Sort All</button>
        <div>
          <label htmlFor="globalSpeed">Global Speed:</label>
          <input
            type="range"
            min="100"
            max="2000"
            value={globalSpeed}
            onChange={(e) => setGlobalSpeed(Number(e.target.value))}
          />
          <span>{globalSpeed} ms</span>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr", // Tres columnas
        gridTemplateRows: "auto auto auto", // Tres filas (una por algoritmo)
        gap: "20px",
        marginTop: "20px"
      }}>
        {/* Bubble Sort Visualizer */}
        <div style={{ gridColumn: "1 / 2", gridRow: "1", borderRadius: "8px", padding: "5px" }}>
          <BubbleSortVisualizer globalArray = {globalArray} globalSpeed={globalSpeed}/>
        </div>

        {/* Selection Sort Visualizer */}
        <div style={{ gridColumn: "2 / 3", gridRow: "1", borderRadius: "8px", padding: "5px" }}>
          <SelectionSortVisualizer globalArray = {globalArray} globalSpeed={globalSpeed}/>
        </div>
      </div>
    </div>
  )
}

export default App
