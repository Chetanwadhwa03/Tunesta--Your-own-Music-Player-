import React from 'react'
import "./Style.css"
import "./Utility.css"

const Maincontent = ({albums,handleAlbumClick}) => {
    return (
        <>
            {/* This is my right side of the Tunesta app */}
            <div className="header">
                <div className="nav">
                    <div className="hamburgercontainer">
                        <img className="hamburger" width="45px" src="/img/hamburger.svg" alt="hamburger" />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15 6L9.70711 11.2929C9.37377 11.6262 9.20711 11.7929 9.20711 12C9.20711 12.2071 9.37377 12.3738 9.70711 12.7071L15 18"
                                stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 18L14.2929 12.7071C14.6262 12.3738 14.7929 12.2071 14.7929 12C14.7929 11.7929 14.6262 11.6262 14.2929 11.2929L9 6"
                                stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className="buttons">
                    <button className="signupbtn">Sign up</button>
                    <button className="loginbtn">Log in</button>
                </div>
            </div>
            <div className="MusicPlaylists ">
                <h1>Tunesta's Albums</h1>
                <div className="cardcontainer">
                    {/* <!-- Dyamically cards will be inserted using JS --> */ }
                    {albums.map((album) => {
                        return (
                            <div key={album.folder} data-folder="album.folder" className="card" onClick={()=>handleAlbumClick(album)}>
                                <div className="play">
                                    <svg role="img" height="50" width="50" aria-hidden="true" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="12" fill="#1DB954" />
                                        <polygon points="9,7 17,12 9,17" fill="#000000" />
                                    </svg>
                                </div>
                                <img src={`${import.meta.env.VITE_API_URL}${album.cover}`}  alt="song image" />
                                <h2>{album.title}</h2>
                                <p>{album.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Maincontent
