import React, { useState } from 'react'
import "../components/Style.css"
import "../components/Utility.css"

import { Link } from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlelogin = (e) => {
        // to prevent the default action of the form to go submit the data to the server.
        e.preventDefault();
        console.log("Login Successful with: ", email, password);
    }


    return (
        <>
            <div className="container" style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                <div className="glass-effect" style={{
                    width: '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '40px',
                    boxShadow: '0 0 40px rgba(0,0,0,0.5)'
                }}>
                    {/* cross button */}
                    <button className='close-btn'>Cross</button>
                    <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px', fontSize: '32px' }}>Login</h1>

                    <form onSubmit={handlelogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* inputting the email */}
                        <div className="input-group">
                            <input
                                type='email'
                                // placeholder gives the hint to the user that what is the field is about.
                                placeholder='Email Address'
                                className='auth-input'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                className="auth-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="auth-btn">
                            Log In
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', color: '#a0aec0', fontSize: '14px', marginTop: '10px' }}>
                        Don't have an account?
                        <Link to="/signup" className="auth-link">Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;
