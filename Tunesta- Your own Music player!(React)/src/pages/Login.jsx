import React, { useState } from 'react'
import "../components/Style.css"
import "../components/Utility.css"

import { Link, useNavigate } from 'react-router-dom'
import { useAuth,Authprovider } from '../context/Authcontext'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // This is to reflect back the error on the UI.
    const [error, setError]=useState('');

    // to use the login function declared in the authcontext.
    const {login} = useAuth();
    // to use the navigate function of the react-router-dom.    
    const navigate= useNavigate();

    const handlelogin = async (e) => {
        // to prevent the default action of the form to refresh the server upon submission.
        e.preventDefault();
        console.log("Login Successful with: ", email, password);


        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,password}), // Convert your data to a JSON string
                
            });

            const data= await response.json();

            if(response.ok){
                // 1. Updating the login status at the Authcontext to make the app know that the user is login
                // ye nahi likh paa raha ki login ko kaise use karunga context se.
                login(data.user,data.token);

                // route change to home page
                Navigate("/");

            }
            else{
                setError(data.message);
                console.log("Login failed because of the message: ", data.message);
            }

        }
        catch(e) {
            console.log("login failed with the error: ",e);
        }




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
                    <button className='close-btn'></button>
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

                    {/* To show the error, if login is not successful. */}
                    {error && <div style={{color:'red', marginTop:'10px'}}>{error}</div>}

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
