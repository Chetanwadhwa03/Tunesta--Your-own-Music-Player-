    import React from 'react'
    import "./Style.css"
    import "./Utility.css"

    const Maincontent = () => {
    return (
    <>
    {/* This is my right side of the Tunesta app */}
        <div class="header">
                    <div class="nav">
                        <div class="hamburgercontainer">
                            <img class="hamburger" width="45px" src="/img/hamburger.svg" alt="hamburger" />
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 6L9.70711 11.2929C9.37377 11.6262 9.20711 11.7929 9.20711 12C9.20711 12.2071 9.37377 12.3738 9.70711 12.7071L15 18"
                                    stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9 18L14.2929 12.7071C14.6262 12.3738 14.7929 12.2071 14.7929 12C14.7929 11.7929 14.6262 11.6262 14.2929 11.2929L9 6"
                                    stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="signupbtn">Sign up</button>
                        <button class="loginbtn">Log in</button>
                    </div>
                </div>
                <div class="MusicPlaylists ">
                    <h1>Tunesta's Albums</h1>
                    <div class="cardcontainer">
                            {/* <!-- Dyamically cards will be inserted using JS --> */}

                        
                    </div>

                    <div class="playbar">
                        <div class="seekbar">
                            <div class="circle">

                            </div>
                        </div>

                        <div class="abovebar">
                            <div class="songinfo">

                            </div>
                            <div class="songbuttons">
                                <img width="35" id="previous" src="/img/previoussong.svg" alt="previoussong" />
                                <img width="35" id="play" src="/img/playsong.svg" alt="playsong" />
                                <img width="35" id="next" src="/img/nextsong.svg" alt="nextsong" />
                            </div>
                            <div class="timeandvolume">
                                <div class="songtime">
        
                                </div>

                                <div class="volume">
                                    <img src="/img/volume-on.svg" alt="volume-on" />
                                    <div class="range">
                                        <input type="range" name="vou" id="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


    </>
    )
    }

    export default Maincontent
