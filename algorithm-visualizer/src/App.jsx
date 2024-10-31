/* eslint-disable no-unused-vars */
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import BubbleSort from './algorithms/BubbleSort'
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import BubbleSortVisualizer from './algorithms/BubbleSortVisualizer'
// import SelectionSortVisualizer from './algorithms/SelectionSortVisualizer'
// import { useState } from 'react'

// function App() {
//   const [globalArray, setGlobalArray] = useState([5, 3, 8, 1, 2, 4, 6, 7]);
//   const [globalSpeed, setGlobalSpeed] = useState(1000); //Initial speed in milliseconds
//   const [hoverStates, setHoverStates] = useState({ bubble: false, selection: false }); // Hover states for visualizers
//   const [isSorting, setIsSorting] = useState(false);


//   // Function to generate a new array
//   const generateArray = () => {
//     const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10) + 1);
//     setGlobalArray(newArray);
//   };

//   // Function to sort all the algorithms simultaneously
//   const handleGlobalSort = () => {
//     // this will click all the sort buttons simultaneously
//     setIsSorting(true);
//     document.querySelectorAll(".sort-btn").forEach((button) => button.click());
//   }

//   // Function to handle hover states
//   const handleMouseEnter  = (key) => {
//     setHoverStates(prevState => ({ ...prevState, [key]: true }));
//   }

//   const handleMouseLeave = (key) => {
//     setHoverStates(prevState => ({ ...prevState, [key]: false }));
//   };

//   // Function to restart the app
//   const handleActivate = () => {
//     setIsSorting(false);
//   }

//   return (
//     <div style={{
//       padding: "20px", 
//       textAlign: "center",
//       display: 'grid',
//       marginTop: '5px',
//       marginLeft: '20px',
//       }}>
//       <h1>Algorithm Visualizer</h1>
//       {/* Controles globales */}
//       <div style={{ marginBottom: "20px" }}>
//         <button onClick={generateArray} disabled={isSorting}>New Values</button>
//         <button onClick={handleGlobalSort} disabled={isSorting}>Sort All</button>
//         <button onClick={handleActivate}>Activate</button>
//         <div>
//           <label htmlFor="globalSpeed">Global Speed:</label>
//           <input
//             type="range"
//             min="100"
//             max="2000"
//             value={globalSpeed}
//             onChange={(e) => setGlobalSpeed(Number(e.target.value))}
//           />
//           <span>{globalSpeed} ms</span>
//         </div>
//       </div>

//       <div style={{
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr 1fr", // Tres columnas
//         gridTemplateRows: "auto auto auto", // Tres filas (una por algoritmo)
//         gap: "20px",
//         marginTop: "20px"
//       }}
//       >
//         {/* Bubble Sort Visualizer */}
//         <div style={{ 
//           gridColumn: "1 / 2", 
//           gridRow: "1", 
//           borderRadius: "8px", 
//           padding: "5px",
//           transition: 'transform 0.3s ease', //Smooth transition
//            transform: hoverStates.bubble ? 'scale(1.05)' : 'scale(1)', // Scale on hover
//            }} onMouseEnter={() => handleMouseEnter('bubble')} // Activa el hover al entrar
//            onMouseLeave={() => handleMouseLeave('bubble')}>
//           <BubbleSortVisualizer globalArray = {globalArray} globalSpeed={globalSpeed} isGlobalSorting={isSorting}/>
//         </div>

//         {/* Selection Sort Visualizer */}
//         <div style={{ gridColumn: "2 / 3", gridRow: "1", borderRadius: "8px", padding: "5px",transition: 'transform 0.3s ease', //Smooth transition
//            transform: hoverStates.selection ? 'scale(1.05)' : 'scale(1)',  }} 
//            onMouseEnter={() => handleMouseEnter('selection')} // Activa el hover al entrar
//            onMouseLeave={() => handleMouseLeave('selection')}>
//           <SelectionSortVisualizer globalArray = {globalArray} globalSpeed={globalSpeed} isGlobalSorting={isSorting}/>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default App

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
      <button onClick={() => setGlobalArray(Array.from({ length: 8 }, () => Math.floor(Math.random() * 10) + 1))}>New Values</button>
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