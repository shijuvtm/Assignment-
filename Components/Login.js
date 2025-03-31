import React,{ useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
            height: '27%',
            width:'100%',
        },
        input: {
            marginBottom: '15px',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            padding: '10px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    const handleLogin = async(e)=>{
        e.preventDefault(); // Prevent default form submission
        try{
            const response = await axios.post("http://localhost:5000/login",{email,password});
            localStorage.setItem("token",response.data.access_token);
            alert("Login successful");
            navigate("/upload"); // Redirect to the dashboard after successful login
        }
        catch(error){
            console.error("Error logging in:", error);
            alert("Login failed");
        }
    }

    return (
        <div style={styles.container}>
            <h2>USER LOGIN</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <input 
                    type="email" 
                    placeholder='email' 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    style={styles.input}
                />
                <input 
                    type="password" 
                    placeholder='password' 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                    style={styles.input}
                />
                <button 
                    type='submit' 
                    style={styles.button}
                    onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;