import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import BubbleSort from './algorithms/BubbleSort'


function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<BubbleSort />} />
       {/* More routes for other algorithms */}
      </Routes>
    </Router>
  )
}

export default App
