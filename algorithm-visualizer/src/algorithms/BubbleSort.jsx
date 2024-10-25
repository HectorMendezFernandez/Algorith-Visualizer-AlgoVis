import {useState} from "react";

import {animated} from "react-spring";

const BubbleSort = () => {
    const [array, setArray] = useState([5, 3, 8, 1, 2, 4, 6, 7]);
    const bubbleSort = (arr) => {
        let sortedArray = [...arr];
        for(let i = 0; i <= sortedArray.length; i++) {
            for(let j = 0; j <= sortedArray.length; j++) {
                if(sortedArray[j] > sortedArray[j + 1]) {
                    let temp = sortedArray[j];
                    sortedArray[j] = sortedArray[j + 1];
                    sortedArray[j + 1] = temp;
                }
            }
        }
        return sortedArray;
    }

    const handleSort = () => {
        const sorted = bubbleSort(array);
        setArray(sorted);
    }


    return(
        <div>
            <h1>Bubble Sort Visualization</h1>
            <div>
                {array.map((value, index) => (
                  <animated.div key={index} style={{ margin: '5px', display: 'inline-block' }}>
                    {value}  
                  </animated.div>
                ))}
            </div>
            <button onClick={handleSort}>Sort</button>
        </div>
    )
};

export default BubbleSort;

