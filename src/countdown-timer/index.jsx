import { useState } from "react";
import "./style.css";

function formatTimeToHHMMSS(value){
    let hrs = Math.floor(value/3600);
    let balance = value%3600;
    let mins = Math.floor(balance/60);
    let secs = balance%60;

    let hrsStr = hrs < 10 ? `0${hrs}` : hrs;
    let minsStr = mins < 10 ? `0${mins}` : mins;
    let secsStr = secs < 10 ? `0${secs}` : secs;
    return `${hrsStr}:${minsStr}:${secsStr}`;
}

function CountdownTimer(){
    const [inputMins, setInputMins] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [btnState, setBtnState] = useState(1);
    const [timeInSecs, setTimeInSecs] = useState(0);
    const [countdownOver, setCountdownOver] = useState(false);

    const startPauseHandler = ()=>{
        if(btnState === 1){
            if(inputMins <= 0) return;
    
            if(timeInSecs === 0) {
                setTimeInSecs(inputMins*60);
                setCountdownOver(false);
            }

            let timerId = setInterval(()=>{
                setTimeInSecs(timeInSecs => {
                    if(timeInSecs === 1) {
                        clearInterval(timerId);
                        setBtnState(1);
                        setCountdownOver(true);
                    }
                    return (timeInSecs - 1);
                });
            },1000);

            setTimerId(timerId);  
            setBtnState(2);
        }
        else{
            // pause
            clearInterval(timerId);
            setBtnState(1);
        }
    }

    const resetHandler = ()=>{
        clearInterval(timerId);
        setTimeInSecs(inputMins*60);
        setBtnState(1);
        setCountdownOver(false);
    }

    const inputChangeHandler = (e)=>{
        setInputMins(e.target.value);
        resetHandler();
        setTimeInSecs(+e.target.value * 60);   
    }

    return (
        <>  
            <div>Enter minutes</div>
            <input type="number" value={inputMins} onChange={inputChangeHandler}></input>
            <div>{formatTimeToHHMMSS(timeInSecs)}</div>
            <button onClick={startPauseHandler}>{btnState === 1 ? "Start" : "Pause"}</button>
            <button onClick={resetHandler}>Reset</button>
            {countdownOver && <div className="blink-it">Time&apos;s up!</div>}
        </>
    )
}

export default CountdownTimer;