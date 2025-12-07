import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/Authcontext'

const FileModal = ({ isUploadOpen, handleCloseUpload }) => {
    // since this for file upload we need states like
    const [songFile, setsongFile] = useState(null);
    const [albumTitle, setalbumTitle] = useState("");
    const [albumDescription, setalbumDescription] = useState("");
    const [songName, setsongName] = useState("");

    const { Token } = useAuth();

    // The Gatekeeper: that make sure the upload file only appears when the isUploadOpen is true.
    if (!isUploadOpen) return null;

    // We set the file that we uploaded in the state.
    const handlefileselection = (e) => {
        // files stay in the file of the target of the event object, and it is an array.
        setsongFile(e.target.files[0]);
    }

    // We will click on the submit button after entering all the necessary information related to the uploaded song.
    const handleSubmit = async (e) => {

        e.preventDefault();


        // 1. Creating the enevelope in which the mp3 file will go that is our formdata.
        const formdata = new FormData();
        formdata.append('song', songFile);
        formdata.append('albumTitle', albumTitle);
        formdata.append('songName', songName);
        formdata.append('description', albumDescription);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/upload-song`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${Token}`
                },
                body: formdata
            })

            const data = response.json();

            if (response.ok) {
                // Success Status code-> file has been uploaded to either exisiting album or new album
                alert('Upload Successful');
                handleCloseUpload();
            }
            else {
                alert('Upload Failed: ' + data.message);

            }
        }
        catch (e) {
            console.log("Error uploading: ", e);
        }
    }


    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(5px)' // Adds a nice blur to the background
        }}>

            {/* 2. The Glass Card */}
            <div className="glass-effect" style={{
                width: '500px', padding: '30px', position: 'relative',
                display: 'flex', flexDirection: 'column', gap: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>

                {/* Close Button (Using the onClose prop!) */}
                <button onClick={handleCloseUpload} style={{
                    position: 'absolute', top: '15px', right: '15px',
                    background: 'transparent', border: 'none', color: 'white',
                    fontSize: '24px', cursor: 'pointer'
                }}>&times;</button>

                <h2 style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Upload to Studio</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    {/* File Input */}
                    <div className="input-group" style={{ border: '1px dashed #ffffff50', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                        <label style={{ color: '#b3b3b3', fontSize: '14px', display: 'block', marginBottom: '10px', cursor: 'pointer' }}>
                            {songFile ? songFile.name : "Click to Select MP3 File"}
                        </label>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handlefileselection}
                            style={{ display: songFile ? 'none' : 'block', color: 'white', margin: '0 auto' }}
                        />
                    </div>

                    {/* Song Name */}
                    <input
                        type="text"
                        placeholder="Song Name"
                        value={songName}
                        onChange={(e) => setsongName(e.target.value)}
                        className="auth-input"
                        required
                    />

                    {/* Album Title */}
                    <input
                        type="text"
                        placeholder="Album Title (New or Existing)"
                        value={albumTitle}
                        onChange={(e) => setalbumTitle(e.target.value)}
                        className="auth-input"
                        required
                    />

                    {/* Description */}
                    <textarea
                        placeholder="Description (Optional)"
                        value={albumDescription}
                        onChange={(e) => setalbumDescription(e.target.value)}
                        className="auth-input"
                        rows="3"
                    ></textarea>

                    {/* Submit Button */}
                    <button type="submit" className="auth-btn" style={{ marginTop: '10px', backgroundColor: '#1DB954' }}>
                        Upload Track
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FileModal
