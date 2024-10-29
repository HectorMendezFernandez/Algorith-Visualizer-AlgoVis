// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import BubbleSort from './algorithms/BubbleSort'
import BubbleSortVisualizer from './algorithms/BubbleSortVisualizer'
import SelectionSortVisualizer from './algorithms/SelectionSortVisualizer'

function App() {

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Algorithm Visualizer</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr", // Tres columnas
        gridTemplateRows: "auto auto auto", // Tres filas (una por algoritmo)
        gap: "20px",
        marginTop: "20px"
      }}>
        {/* Bubble Sort Visualizer */}
        <div style={{ gridColumn: "1 / 2", gridRow: "1", border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}>
          <h2>Bubble Sort</h2>
          <BubbleSortVisualizer />
        </div>

        {/* Selection Sort Visualizer */}
        <div style={{ gridColumn: "2 / 3", gridRow: "1", border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}>
          <h2>Selection Sort</h2>
          <SelectionSortVisualizer />
        </div>
      </div>
    </div>
  )
}

export default App
