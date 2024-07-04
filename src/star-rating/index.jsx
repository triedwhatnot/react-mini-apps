/* v8 ignore start */
import { Fragment, useState } from "react";
import "./style.css";
import Star from "./star";

function percColored(rating, index){
    rating = rating - 1;
    if(index <= rating) return 100;
    else if(Math.ceil(rating) === index) return Math.floor((rating % 1)*100);
    else return 0;
}

function StarRating(){
    const starsCount = 5;

    const [persistedRating, setPersistedRating] = useState(1.2);
    const [hoveredRating, setHoveredRating] = useState(0);

     
    const handleMouseLeave = () => {
        setHoveredRating(0)
    };

    const handleMouseMove = (e) => {
        const targetEl = e.target.closest("svg");
        if(targetEl){
            let rating = targetEl.getAttribute("data-id");
            setHoveredRating(+rating);
        }
    }

    const handleMouseClick = (e) => {
        const targetEl = e.target.closest("svg");
        if(targetEl){
            let rating = targetEl.getAttribute("data-id");
            setPersistedRating(+rating);
        }
    }

    return (
        <>
            <div className="flex w-1/4" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseDown={handleMouseClick}>
                {
                    new Array(starsCount).fill(1).map((el, index) => 
                        {
                            return (
                                <Fragment key={index}>
                                    <Star index={index+1} percColor={percColored(hoveredRating || persistedRating, index)} />
                                </Fragment>
                            )
                        }
                    )
                }
            </div>
        </>
    )
}
export default StarRating;
/* v8 ignore stop */