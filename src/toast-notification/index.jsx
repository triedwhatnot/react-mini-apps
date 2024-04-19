import React, { useState } from "react";
import "./style.css"

const iconsArr = [
    {
        id: 1, 
        val: <>&#128508;</>,
    }, 
    {
        id: 2, 
        val: <>&#128509;</>,
    }, 
    {
        id: 3, 
        val: <>&#128511;</>,
    }, 
];

function ToastNotifcation(){
    const [titleText, setTitleText] = useState("");
    const [position, setPosition] = useState(1);
    const [icon, setIcon] = useState(iconsArr[0]);
    const [toastArr, setToastArr] = useState([]);
    const [toastIdCount, setToastIdCount] = useState(1);
    const [isError, setIsError] = useState(false);
    

    const onPositionChange = (e)=>{
        setPosition(e.target.value);
    }

    const onTitleChange = (e)=>{
        setTitleText(e.target.value);
        setIsError(false);
    }

    const onIconChange = (e)=>{
        let target = iconsArr.filter(icon => icon.id === +e.target.value);
        setIcon(...target);
    }

    const deleteToastHandler = function(id){
        setToastArr(toasts => {
            let toastsCopy = [...toasts];
            let targetIndex = toastsCopy.findIndex(obj => obj.id === id);
            if(targetIndex > -1) toastsCopy.splice(targetIndex, 1);
            return toastsCopy;

        });
    }
    
    const showToastHandler = ()=>{
        if(!titleText){
            setIsError(true);
            return;
        }

        let deleteHandler = deleteToastHandler.bind(null, toastIdCount);

        let toast = {
            id: toastIdCount,
            title: titleText,
            icon,
            deleteToastHandler: deleteHandler,
        };
        setToastArr([...toastArr, toast]);
        setToastIdCount(count => count+1);

        setTimeout(deleteHandler, 1500);
    }

    return(
        <div  className="flex flex-col h-screen w-screen justify-center items-center">
            <div className="flex flex-col justify-center items-center border border-dashed border-white rounded-lg p-4 ">
                <div className="mb-4">Configurations</div>
                <div className="flex flex-col w-96">
                    <label className="mb-1">Toast Title</label>
                    <input className="mb-2" onChange={onTitleChange} value={titleText} type="text" placeholder="Enter toast title here..."></input>

                    <label className="mb-1">Position</label>
                    <select className="mb-2" onChange={onPositionChange} name="position" value={position}>
                        <option value={1}>Bottom left</option>
                        <option value={2}>Bottom right</option>
                        <option value={3}>Top left</option>
                        <option value={3}>Top right</option>
                    </select>

                    <label className="mb-1">Icon</label>
                    <select className="mb-2" onChange={onIconChange} name="icon-emoji">
                        {
                            iconsArr.map((icon) => 
                                <option key={icon.id} value={icon.id}>{icon.val}</option>    
                            )
                        }
                    </select>

                    <button className="w-max self-center" onClick={showToastHandler}>Show Toast</button>
                    {isError && <div>Enter toast title</div>}
                </div>
            </div>

            <div className="sticky bottom-2 right-2 w-80">
                {
                    toastArr.map(toast => {
                        return (
                            <React.Fragment key={toast.id}>
                                <Toast {...toast} />
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ToastNotifcation;

function Toast(props){
    let {title, id, icon, deleteToastHandler} = props;

    return (
        <div className="flex border-2  mb-3">
            <div className="p-4">{icon?.val}</div>
            <div className="p-4">{id}</div>
            <div className="p-4">{title}</div>
            <div onClick={deleteToastHandler}>X</div>
        </div>
    )
}
