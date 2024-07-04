import { useEffect, useRef, useState } from "react";
import "./style.css"

function TextDocAnimation(){
    const [textVal, setTextVal] = useState("");
    const [htmlArr, setHtmlArr] = useState([]);
    const notepadRef = useRef(null);

    const handleTextChange = (e)=>{
        setTextVal(e.target.value);
    }

    const handleEnterPress = (e)=>{
        if(e.keyCode === "13" || e.key == "Enter"){
            e.preventDefault();
            let text = e.target.value.trim();
            let jsx = text;
            setHtmlArr([...htmlArr, jsx]);
            setTextVal("");
            setTimeout(()=>{
                if(notepadRef.current) notepadRef.current.scrollTop = notepadRef.current?.scrollHeight;
            }, 100);
        }
    }

    useEffect(()=>{
        alert("Jot down your thoughts by just simply typing in and then, just press enter!");
    }, []);

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col md:flex-row h-[80%] w-[80%] justify-start items-start">
                <div className="md:basis-1/2 w-full">
                    <textarea 
                        placeholder="Enter your text here..." 
                        value={textVal} 
                        onChange={handleTextChange} 
                        onKeyDown={handleEnterPress} 
                        data-testid="textareaEl"
                        className="bg-gray-100 w-[100%] md:w-[95%] h-[150px] md:h-[300px] rounded-md outline-none p-[20px] resize-none border border-black shadow-md"
                    />
                </div>
                <div
                    data-testid="notepadEl"
                    ref={notepadRef}
                    className="bg-gray-100 md:basis-1/2 p-[20px] h-full  w-full overflow-auto  border border-black shadow-md rounded-md"
                >
                    {htmlArr.map((html, i) => <p data-testid="text-unit" className="p-fade-out" key={i}>{html}</p>)}
                </div>
            </div>
        </div>
    )
}

export default TextDocAnimation;