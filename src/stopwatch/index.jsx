import { useState } from "react";
import "./style.css";

function formatMsToMMSS(ms){
    let mins = Math.floor(ms/(60*1000));
    let secs = Math.floor((ms%(60*1000))/1000);
    let milliSecs = (ms%(60*1000))%1000;

    let formattedMins = mins < 10 ? `0${mins}` : mins;
    let formattedSecs = secs < 10 ? `0${secs}` : secs;
    let formattedMilliSecs = milliSecs < 100 ? (milliSecs < 10 ? `00${milliSecs}` : `0${milliSecs}`) : milliSecs;
    return `${formattedMins}:${formattedSecs}:${formattedMilliSecs}`;
}

function Stopwatch(){
    const [initialTime, setInitialTime] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [btnType, setBtnType] = useState(1);

    const startStopHandler = ()=>{
        if(btnType === 1){
            if(initialTime === 0){
                setInitialTime(new Date().getTime());
                setCurrentTime(new Date().getTime());
            } 

            let tId = setInterval(()=>{
                setCurrentTime(new Date().getTime());
            }, 10);
            setTimerId(tId);

            setBtnType(2);
        }
        else{
            clearInterval(timerId);
            setBtnType(1);
        }
    }

    const resetHandler = ()=>{
       clearInterval(timerId);
       setInitialTime(0);
       setCurrentTime(0);
       setBtnType(1);
    }

    return (
        <>
            <div>Time : {formatMsToMMSS(currentTime-initialTime)}</div>
            <button onClick={startStopHandler}>{btnType === 1 ? "Start" : "Stop"}</button>
            <button onClick={resetHandler}>Reset</button>
        </>
    )
}

export default Stopwatch;