import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
    const data = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    return data.json();
}

export default function Login({ setUserToken }) {
    let navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { token, error } = await loginUser({
          email,
          password
        });
        if (error) {
            setError(error);
        } else {
            setUserToken(token);
            navigate("/recipes/new");  // TODO: redirect to the page the user attempted to view
        }
      }    

    return(
      <div className="login-wrapper">
            <h1>Please Log In</h1>
            <p className="error">{error}</p>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }