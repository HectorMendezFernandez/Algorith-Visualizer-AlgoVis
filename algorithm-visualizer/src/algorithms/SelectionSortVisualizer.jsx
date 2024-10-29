import { useState } from "react";
import { useSpring, animated } from "react-spring";


const SelectionSortVisualizer = () => {
    const [array, setArray] = useState([5, 3, 8, 1, 2, 4, 6, 7]);
    const [speed, setSpeed] = useState(1000); //Initial speed in milliseconds
    const [currentIndex, setCurrentIndex] = useState(null); // State for the current index being evaluated
    const [minIndex, setMinIndex] = useState(null); // State for the minimum index found

    // Function to sort the array using Selection Sort
    const handleSort = async () => {
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
}
export default SelectionSortVisualizer;