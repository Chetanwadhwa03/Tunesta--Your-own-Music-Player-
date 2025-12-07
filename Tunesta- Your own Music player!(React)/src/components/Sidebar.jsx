import React from 'react'
import "./Style.css"
import "./Utility.css"

const Sidebar = ({ songs, handlesongclick, handleclosebutton, handleOpenUpload }) => {
    return (
        <>
            <div className="close" onClick={handleclosebutton}>
                <img width="30" className="invert" src="/img/close.svg" alt="close" />
            </div>
            <div className="home glass-effect round m-1 p-1">
                <div className="logo"><img width="54px" className="invert" src="/img/logo1.svg" alt="logo" /></div>
                <ul>
                    <li><img className="invert" src="/img/home.svg" alt="Home" />Home</li>
                    <li><img className="invert" src="/img/search.svg" alt="Search" />Search</li>
                </ul>
            </div>
            
            <div className="library glass-effect round m-1 p-1" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="heading">
                    <img className="invert" src="/img/playlist.svg" alt="playlist" />
                    <h3>Your library</h3>
                </div>

                {/* --- MODIFIED UPLOAD BUTTON --- */}
                {/* Centered, Glassmorphism Background, Prominent */}
                <div
                    onClick={handleOpenUpload}
                    style={{
                        cursor: 'pointer',
                        marginTop: '15px',
                        marginBottom: '15px',
                        display: 'flex',            // Makes content align nicely
                        alignItems: 'center',       // Vertically center content
                        justifyContent: 'center',   // Horizontally center content
                        gap: '12px',                // Space between icon and text
                        padding: '12px',            // Breathing room
                        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle white tint (Glass)
                        border: '1px solid rgba(255, 255, 255, 0.1)', // Thin glass border
                        borderRadius: '10px',       // Rounded corners
                        width: '90%',               // Width relative to sidebar
                        alignSelf: 'center',        // Center the button itself in the sidebar
                        transition: 'background 0.3s' // Smooth hover effect
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                >
                    <div className="home-icon">
                        <img className="invert" src="/img/plus.svg" alt="Upload" style={{ width: '20px' }} />
                    </div>
                    <div className="home-text" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                        Upload Song
                    </div>
                </div>
                {/* ----------------------------- */}

                <div className="songlist">
                    <ul>
                        {songs.map((song, index) => {
                            return (
                                <li key={song.path} onClick={() => { handlesongclick(song, index) }}>
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

                {/*for now i have not added any footer section... */}
            </div>
        </>
    )
}

export default Sidebar