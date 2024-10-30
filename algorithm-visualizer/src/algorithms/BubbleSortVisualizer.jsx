import {useState, useEffect} from "react";
import { useSpring, animated } from "react-spring";

// eslint-disable-next-line react/prop-types
const BubbleSortVisualizer = ({globalArray, globalSpeed, isGlobalSorting}) => {
    const [array, setArray] = useState(globalArray || [5, 3, 8, 1, 2, 4, 6, 7]);
    const [speed, setSpeed] = useState(globalSpeed || 1000); //Initial speed in milliseconds
    const [currentIndex, setCurrentIndex] = useState(null); // State for the current index being evaluated
    const [isSorting, setIsSorting] = useState(false); // State to check if the array is being sorted
    const [realTimeDuration, setRealTimeDuration] = useState(0); // Real-time duration state

  // Update local array when globalArray changes
  useEffect(() => {
    setArray(globalArray); // Update array
  }, [globalArray]);

useEffect(() => {
  setSpeed(globalSpeed); // Update speed
}, [globalSpeed]);

     // Function to sort the array using Bubble Sort
     const handleSort = async () => {
      setIsSorting(true); // Change the state to "sorting"

      setRealTimeDuration(0); // Reset the real-time duration
      const startTime = Date.now(); // Store the start time
      const intervalId = setInterval(() => {
        setRealTimeDuration(Date.now() - startTime); // Update the real-time duration
    }, 100); // Update every 100 ms

      let sortedArray = [...array];
      for (let i = 0; i < sortedArray.length - 1; i++) {
        for (let j = 0; j < sortedArray.length - i - 1; j++) {
          setCurrentIndex(j+1); //Update the current index being evaluated
          if (sortedArray[j] > sortedArray[j + 1]) {
            [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
            setArray([...sortedArray]);
            await new Promise(resolve => setTimeout(resolve, speed)); // Pause for animation
          }
        }
      }
      clearInterval(intervalId); // Stop the interval
      setCurrentIndex(null); // Reset the current index after sorting
      setIsSorting(false); // Change the state to "not sorting
    };

    //Function to generate a new array
    const generateArray = () => {
        let newArray = [];
        for (let i = 0; i < 8; i++) {
          newArray.push(Math.floor(Math.random() * 10) + 1);
        }
        setArray(newArray);
      };


    //Properties for animation using React Spring
    const animatedProps = useSpring({
      from: { transform: "translateY(0px)" },
      to: { transform:`translateY(-${10 * array.length}px)` }, // Evita animación en instantSort
      config: { duration: speed },
    });

    return (
         <div
           style={{
           display: 'grid',
           marginTop: '5px',
           marginLeft: '20px',
           }}
        > 
        {/* Title */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1>Bubble Sort Visualization</h1>
        </div>
         {/* Animation Area */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
            {array.map((value, index) => (
              <animated.div
              key={index}
              style={{
                ...animatedProps,
                width: '30px',
                height: `${value * 10}px`,
                backgroundColor: index === currentIndex ? 'orange' : 'teal', // Cambia el color si es el índice actual
                display: 'inline-block',
                marginLeft: '5px',
              }}
              />
            ))}
          </div>
          {/* Real-Time Duration Display */}
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <span>Duration: {realTimeDuration} ms</span>
          </div>

          {/* input to show the range input */}
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
          <label htmlFor="velocity">Speed:</label>
          <input
          
            type="range"
            min="100"
            max="2000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{speed} ms</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', margin: '10px'}}>
          {/* Button to sort the array */}
          <button onClick={handleSort} disabled={isGlobalSorting} className="sort-btn">Sort</button>
          {/* Button to generate a new array */}
          <button onClick={generateArray} disabled={isSorting || isGlobalSorting}>New Val</button>
          </div>
        </div>
      );
    };

    export default BubbleSortVisualizer;