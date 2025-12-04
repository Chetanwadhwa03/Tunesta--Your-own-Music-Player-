import React, { useState } from 'react'
import "../components/Style.css"
// import "../components/Utility.css" 
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // This is to reflect back the error on the UI.
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("Signup Logic will go here:", email, password);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,password}), // Convert your data to a JSON string
            })

            const data = response.json();

            if (response.ok) {
                navigate('/login');
                console.log('signup successful')
            }
            else {
                setError(data.message);
                console.log("Signup unsuccessful with the message ", data.message)
            }
        }
        catch (e) {
            console.log("Signup unsuccessful with the error: ", e);
        }



    }

    return (
        <div className="container" style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-effect" style={{ width: '450px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }}>

                <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '32px' }}>Sign Up</h1>

                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input type='email' placeholder='Email Address' className='auth-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Create Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {/* Visual change: Different button color or text */}
                    <button type="submit" className="auth-btn" style={{ backgroundColor: '#1DB954' }}>
                        Create Account
                    </button>
                </form>

                {/* To show the error, if login is not successful. */}
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

                <p style={{ textAlign: 'center', color: '#a0aec0', fontSize: '14px', marginTop: '10px' }}>
                    Already have an account?
                    {/* Link back to Login */}
                    <Link to="/login" className="auth-link">Log In</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup