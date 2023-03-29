import {useState} from 'react'
import Popup from "./Modal";

export default function Home(){
    const[showPopup,setShowPopup]=useState(false);
    const handleSaveSegment=()=>{
       setShowPopup(!showPopup);
    }
    return(
        <div>
             <button className="segmentButton" type="button" onClick={()=>handleSaveSegment()}>Save Segment</button>
             {showPopup?<Popup show={showPopup} onSubmit={()=>handleSaveSegment()}/>:''}
        </div>
    )
}