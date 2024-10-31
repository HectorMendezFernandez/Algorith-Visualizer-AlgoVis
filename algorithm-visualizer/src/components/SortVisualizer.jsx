/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const SortVisualizer = ({ 
    algorithmName, 
    sortingLogic, 
    globalArray, 
    globalSpeed, 
    isGlobalSorting 
}) => {
    const [array, setArray] = useState(globalArray);
    const [speed, setSpeed] = useState(globalSpeed || 1000);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isSorting, setIsSorting] = useState(false);
    const [realTimeDuration, setRealTimeDuration] = useState(0);
    const [titleStyle, setTitleStyle] = useState({});
    const [minIndex, setMinIndex] = useState(null);

    useEffect(() => setArray(globalArray), [globalArray]);
    useEffect(() => setSpeed(globalSpeed), [globalSpeed]);

    const handleSort = async () => {
        setIsSorting(true);
        setTitleStyle({});
        setRealTimeDuration(0);
        const startTime = Date.now();
        const intervalId = setInterval(() => {
            setRealTimeDuration(Date.now() - startTime);
        }, 100);
        
        if (algorithmName === "Selection Sort") {
            await sortingLogic(array, setArray, setCurrentIndex, setMinIndex, speed);
        }else{
            await sortingLogic(array, setArray, setCurrentIndex, speed);
        }

        clearInterval(intervalId);
        setCurrentIndex(null);
        setMinIndex(null);
        setIsSorting(false);

        setTitleStyle({ color: '#90EE90', transform: 'scale(1.1)', transition: 'transform 0.3s, color 0.3s' });
        setTimeout(() => setTitleStyle({ color: 'initial', transform: 'scale(1)', transition: 'color 0.3s' }), 500);
    };

        //Function to generate a new array
        const generateArray = () => {
            let newArray = [];
            for (let i = 0; i < 8; i++) {
              newArray.push(Math.floor(Math.random() * 10) + 1);
            }
            setArray(newArray);
          };

    const animatedProps = useSpring({ from: { transform: "translateY(0px)" }, to: { transform: `translateY(-${10 * array.length}px)` }, config: { duration: speed } });

    return (
        <div style={{ display: 'grid', marginTop: '5px', marginLeft: '20px' }}>
            <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h1 style={titleStyle}>{algorithmName} Visualization</h1>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' , marginBottom: '20px'}}>
                {array.map((value, index) => (
                    <animated.div 
                    key={index} 
                    style={{ 
                        ...animatedProps, 
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '45px', 
                        height: `${value * 10}px`, 
                        backgroundColor: index === currentIndex 
                            ? 'orange' 
                            : index === minIndex 
                            ? 'purple' 
                            : 'teal', 
                        color: 'white',
                        fontWeight: 'bold',
                        marginLeft: '8px' 
                    }} 
                >
                    {value}
                </animated.div>
                               ))}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <span>Duration: {realTimeDuration} ms</span>
            </div>
            {/* input to show the range input */}
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
            <input type="range" min="100" max="2000" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
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

export default SortVisualizer;