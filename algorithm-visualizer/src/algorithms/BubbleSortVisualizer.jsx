import {useState} from "react";
import { useSpring, animated } from "react-spring";

const BubbleSortVisualizer = () => {
    const [array, setArray] = useState([5, 3, 8, 1, 2, 4, 6, 7]);
    const [speed, setSpeed] = useState(1000); // Velocidad inicial en milisegundos
    const [isHovered, setIsHovered] = useState(false);
    
     // Función para ordenar con Bubble Sort y actualizar el array con retraso
     const handleSort = async () => {
        let sortedArray = [...array];
        for(let i = 0; i < sortedArray.length; i++) {
            for (let j = 0; j < sortedArray.length - i - 1; j++) {
                if (sortedArray[j] > sortedArray[j + 1]) {
                  [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                  setArray([...sortedArray]);
                  await new Promise(resolve => setTimeout(resolve, speed)); // stops waiting the animation
                }
            }
        }
    };

    //Properties for animation using React Spring
    const animatedProps = useSpring({
        from: {transform: "translateY(0px)"},
        to: { transform: `translateY(-${10 * array.length}px)` },
        config: { duration: speed },
    });

    return (
         <div
           style={{
           gap: '10px',
           marginTop: '20px',
           transition: 'transform 0.3s ease', // Suaviza la transición
           transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Escala al hacer hover
           }}
           onMouseEnter={() => setIsHovered(true)} // Activa el hover al entrar
           onMouseLeave={() => setIsHovered(false)} // Desactiva el hover al salir
        > 
        <h1>Bubble Sort Visualization</h1>
          {/* input to show the range input */}
          <div>
          <input
            type="range"
            min="100"
            max="2000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{speed} ms</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {array.map((value, index) => (
              <animated.div
                key={index}
                style={{
                  ...animatedProps,
                  width: '30px',
                  height: `${value * 10}px`,
                  backgroundColor: 'teal',
                  display: 'inline-block',
                  marginLeft: '5px',
                }}
              />
            ))}
          </div>
          <button onClick={handleSort}>Sort</button>
        </div>
      );
    };

    export default BubbleSortVisualizer;