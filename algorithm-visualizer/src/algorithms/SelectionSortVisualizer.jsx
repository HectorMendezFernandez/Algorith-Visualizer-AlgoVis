import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

// eslint-disable-next-line react/prop-types
const SelectionSortVisualizer = ({globalArray, globalSpeed, isGlobalSorting}) => {
    const [array, setArray] = useState(globalArray || [5, 3, 8, 1, 2, 4, 6, 7]);
    const [speed, setSpeed] = useState(globalSpeed || 1000); //Initial speed in milliseconds
    const [currentIndex, setCurrentIndex] = useState(null); // State for the current index being evaluated
    const [minIndex, setMinIndex] = useState(null); // State for the minimum index found
    const [isSorting, setIsSorting] = useState(false); // State to check if the array is being sorted

    // Update local array when globalArray changes
    useEffect(() => {
      setArray(globalArray); // Update array
    }, [globalArray]);
  
  useEffect(() => {
    setSpeed(globalSpeed); // Update speed
  }, [globalSpeed]);
    // Function to sort the array using Selection Sort
    const handleSort = async () => {
        setIsSorting(true); // Cambia el estado a "ordenando"
        let sortedArray = [...array];
        for(let i = 0; i < sortedArray.length; i++) {
            let minInd = i;
            setCurrentIndex(i); // Update the current index being evaluated
            for(let j = i + 1; j < sortedArray.length; j++) {
                if(sortedArray[j] < sortedArray[minInd]) {
                    minInd = j;
                }
                setMinIndex(minInd); // Update the minimum index found
                await new Promise(resolve => setTimeout(resolve, speed)); // Pause for animation
            }
            if(minInd !== i) {
                // Swap the elements at the current index and the minimum index
                [sortedArray[i], sortedArray[minInd]] = [sortedArray[minInd], sortedArray[i]];
                setArray([...sortedArray]);
                await new Promise(resolve => setTimeout(resolve, speed)); // Pause for animation
            }
        }
        setCurrentIndex(null); // Reset the current index after sorting
        setMinIndex(null); // Reset the minimum index after sorting
        setIsSorting(false); // Change the state to "not sorting"
    };

    const  generateArray = () => {
        let newArray = [];
        for(let i = 0; i < 8; i++) {
            newArray.push(Math.floor(Math.random() * 10) + 1);
        }
        setArray(newArray);
    }

    // Properties for animation using React Spring
    const animatedProps = useSpring({
        from: {transform: "translateY(0px)"},
        to: { transform: `translateY(-${10 * array.length}px)` },
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
          <h1>Selection Sort Visualization</h1>
        </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
            {array.map((value, index) => (
              <animated.div
                key={index}
                style={{
                  ...animatedProps,
                  width: "30px",
                  height: `${value * 10}px`,
                  backgroundColor:
                    index === currentIndex ? "orange" : index === minIndex ? "purple" : "teal",
                }}
              />
            ))}
          </div>
          <div>
            <label>Speed:</label>
            <input type="range" min="100" max="2000" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
            <span>{speed} ms</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', margin: '10px'}}>
          {/* Button to sort the array */}
          <button onClick={handleSort} disabled = {isGlobalSorting} className="sort-btn">Sort</button>
          {/* Button to generate a new array */}
          <button onClick={generateArray} disabled={isSorting || isGlobalSorting}>New Val</button>
          </div>
        </div>
    );
};

export default SelectionSortVisualizer;