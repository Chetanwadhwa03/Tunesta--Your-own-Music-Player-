import React from 'react'
import "./Style.css"
import "./Utility.css"



const Sidebar = ({ songs }) => {
    return (
        <>
            <div className="close">
                <img width="30" className="invert" src="/img/close.svg" alt="close" />
            </div>
            <div className="home glass-effect round m-1 p-1">
                <div className="logo"><img width="54px" className="invert" src="/img/logo1.svg" alt="logo" /></div>
                <ul>
                    <li><img className="invert" src="/img/home.svg" alt="Home" />Home</li>
                    <li><img className="invert" src="/img/search.svg" alt="Search" />Search</li>
                </ul>
            </div>
            <div className="library glass-effect round m-1 p-1">
                <div className="heading">
                    <img className="invert" src="/img/playlist.svg" alt="playlist" />
                    <h3>Your library</h3>
                </div>
                <div className="songlist">
                    <ul>
                        {songs.map((song) => {
                            return (
                            <li key={song.path}>
                                <img className="invert" src="img/music.svg" alt="" />
                                <div className="info">
                                    <div>{song.name}</div>
                                    <div>Tunesta</div>
                                </div>
                                <div className="playnow">
                                    <span>Play now</span>
                                    <img className="invert" src="img/playsong.svg" alt="" />
                                </div>
                            </li>
                            )
                        })}
                    </ul>
                </div>

                {/*for now i have not added any footer section when i will want some of the links there as privacy and something something then i will just add it. */}
            </div>
        </>

    )
}

export default Sidebar
