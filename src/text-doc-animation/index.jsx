import { useState } from "react";
import "./style.css"

function TextDocAnimation(){
    const [textVal, setTextVal] = useState("");
    const [htmlArr, setHtmlArr] = useState([]);


    const handleTextChange = (e)=>{
        setTextVal(e.target.value);
    }

    const handleEnterPress = (e)=>{
        if(e.keyCode === "13" || e.key == "Enter"){
            let text = e.target.value;
            let jsx = <p className="p-fade-out">{text}</p>
            setHtmlArr([...htmlArr, jsx]);
            setTextVal("");
        }
    }

    return (
        <>
            <textarea placeholder="Enter your text here..." value={textVal} onChange={handleTextChange} onKeyDown={handleEnterPress} />
            <div>
                {htmlArr.map((html, i) => <p key={i}>{html}</p>)}
            </div>
        </>
    )
}

export default TextDocAnimation;