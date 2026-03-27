import  React, {useState, useEffect, useRef} from 'react';

function topwatch(){
      const [isRunning, setISRunning] = useState(false);
      const [elapsedTime,setElapsedTime] = useState(0);
      const intervalIDRef = useRef(null);
      const startTimeRef = useRef(0);  
      useEffect(() =>{
        if(isRunning){
                intervalIDRef.current = setInterval(()=>{
                    setElapsedTime(Date.now() - startTimeRef.current);
                },10);
            }
           
          return() => {
               clearInterval(intervalIDRef.current);
          }

      }, [isRunning]);

         function start(){
            setISRunning(true);
            startTimeRef.current = Date.now() - elapsedTime;

         }
         function stop(){
             setISRunning(false);       
         }
         function restart(){
            setElapsedTime(0);
            setISRunning(false); 
         }
           function formatTime(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }

         return(<div>
             <div className='display'>{formatTime()}</div>
             <div className='controls'>
                <button onClick={start} className='start-button'>Start</button>
                 <button onClick={stop} className='stop-button'>Stop</button>
                  <button onClick={restart} className='reset-button'>restart</button>
              </div>
           
         </div>);
    }

export default Stopwatch;