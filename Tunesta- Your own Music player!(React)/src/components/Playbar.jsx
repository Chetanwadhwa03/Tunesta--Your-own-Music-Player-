import React, { useState } from 'react'
import "./Style.css"
import "./Utility.css"

const Playbar = ({ songs, isplaying, currentsong, audioref, setisplaying, handleNextButton, handlePrevButton }) => {

    return (
        <>
        <audio ref={audioref} src={currentsong? `${import.meta.env.VITE_API_URL}${currentsong.path}` : ""}></audio>


            <div>
                <div className="seekbar">
                    <div className="circle">
                    </div>
                </div>

                <div className="abovebar">
                    <div className="songinfo">
                        {currentsong ? currentsong.name : "Select an Album"}
                    </div>
                    <div className="songbuttons">
                        <img width="35" id="previous" src="/img/previoussong.svg" alt="previoussong" onClick={()=> {handlePrevButton()}} />
                        <img width="35" id="play" src={isplaying ? "/img/pausesong.svg" : "/img/playsong.svg"} alt="play-pause" onClick={() => setisplaying(!isplaying)} />
                        <img width="35" id="next" src="/img/nextsong.svg" alt="nextsong" onClick={()=>
                            {handleNextButton()}} />
                    </div>
                    <div className="timeandvolume">
                        <div className="songtime">

                        </div>

                        <div className="volume">
                            <img src="/img/volume-on.svg" alt="volume-on" />
                            <div className="range">
                                <input type="range" name="vou" id="" />
                            </div>
                        </div>

                    </div>
                </div>
            </div></>
    )
}

export default Playbar
