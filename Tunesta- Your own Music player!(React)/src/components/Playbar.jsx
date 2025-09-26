import React, { useState,useEffect} from 'react'
import "./Style.css"
import "./Utility.css"

const Playbar = ({ songs, isplaying, currentsong, audioref, setisplaying, handleNextButton, handlePrevButton, duration, setDuration, currentTime, setCurrentTime, volume, setVolume, muteplaytoggle, currentTimeInSeconds, setcurrentTimeInSeconds, durationInSeconds, setdurationInSeconds }) => {

    const formatTime = (seconds) => {
        if (isNaN(seconds) || seconds < 0) {
            return "00:00";
        }

        let mins = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);

        // Add leading zeros if needed
        mins = String(mins).padStart(2, '0');
        secs = String(secs).padStart(2, '0');

        return `${mins}:${secs}`;
    }

    // We could also write the function directly without using the useEffect hook, but the main fact is that when the audioref get's connected to our audio player(DVD player), then only we wanted this function to work that's why it is imp to use this useEffect hook.

    // loadedmetadata and the timeupdate are two event listeners that helps us to access the data like the duration, time, dimensions and majorily they are used for the audio and the video tags of the HTML.

    // The loadedmetadata tells us that when the enough data is loaded to know the duration this event get's fired and the function inside it starts working and the timeupdate event listener regularly get's fired when the time changes, and all these time would come in seconds so we have customised a function name formaTime which helps us to convert that seconds in to the format which is usually used in the music players.

    useEffect(() => {
        if (audioref.current) {
            audioref.current.addEventListener('loadedmetadata', () => {
                setDuration(formatTime(audioref.current.duration));
                setdurationInSeconds(audioref.current.duration);
            })

            audioref.current.addEventListener('timeupdate', () => {
                setCurrentTime(formatTime(audioref.current.currentTime));
                setcurrentTimeInSeconds(audioref.current.currentTime);
            })
        }
    }, [audioref])


    // e is a special object that gives information about the click.
    // We don't have to remember the functions, only the thing we have to remember is the logic that is:
    // on how much percentage on the seekbar we are clicking, so for that we have to calculate the width
    // on which we clicked on the seekbar / the total offsetwidth of the seekbar: This will give us the 
    // percentage and when we will multiply that percentage with the duration it will give us the exact
    // seconds on which we have to go and then we can eaisly pass them in to our respective functions 
    // to update the respective states.

    const handleseek = (e)=>{
        if(audioref.current && audioref.current.duration>0){
            // 1. This would give us the div element of the seekbar.
            const seekbar= e.currentTarget; 
            
            // 2. Calculation of how much this div element left edge is far from the screen's left edge.
            const faraway=seekbar.getBoundingClientRect().left;

            // 3. Calculation of where the click happened. here clientX is a property of the click which tells us the exact horizontal position where the click happened, Therefore by subtracting them we got to know that click position w.r.t to the left of the seekbar.
            const clickPosition= e.clientX - faraway;

            // 4. Calculation of the seekpercentage
            const seekpercentage=clickPosition/seekbar.offsetWidth;

            // 5. Calculation of the time corresponding to this percentage and assigining it to the currenTime
            audioref.current.currentTime=seekpercentage*audioref.current.duration;
        }
    }



    return (
        <>
            <audio ref={audioref} src={currentsong ? `${import.meta.env.VITE_API_URL}${currentsong.path}` : ""}></audio>


            <div>
                <div className="seekbar" onClick={handleseek}>
                    <div className="circle" style={{left: (audioref.current && duration != "00:00")? 
                        `${(currentTimeInSeconds/durationInSeconds)*100}%` : `0%`
                    }}>
                    </div>
                </div>

                <div className="abovebar">
                    <div className="songinfo">
                        {currentsong ? currentsong.name : "Select an Album"}
                    </div>
                    <div className="songbuttons">
                        <img width="35" id="previous" src="/img/previoussong.svg" alt="previoussong" onClick={() => { handlePrevButton()}} />
                        <img width="35" id="play" src={isplaying ? "/img/pausesong.svg" : "/img/playsong.svg"} alt="play-pause" onClick={() => setisplaying(!isplaying)} />
                        <img width="35" id="next" src="/img/nextsong.svg" alt="nextsong" onClick={() => { handleNextButton() }} />
                    </div>
                    <div className="timeandvolume">
                        <div className="songtime">
                            {currentTime}/{duration}
                        </div>

                        <div className="volume">
                            <img src={volume===0 ? "/img/volume-mute.svg" : "/img/volume-on.svg"} onClick={()=> muteplaytoggle()} alt="volume-on" />
                            <div className="range">
                                <input type="range" name="vou" min="0" max="1" step="0.01" value={volume} onChange={(e)=>{setVolume(parseFloat(e.target.value))}} />
                            </div>
                        </div>

                    </div>
                </div>
            </div></>
    )
}

export default Playbar
