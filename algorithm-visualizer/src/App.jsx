import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import BubbleSort from './algorithms/BubbleSort'
import BubbleSortVisualizer from './algorithms/BubbleSortVisualizer'

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<BubbleSortVisualizer />} />
       {/* More routes for other algorithms */}
      </Routes>
    </Router>
  )
}

export default App
