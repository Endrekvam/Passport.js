import React, { useState } from "react";
import "./App.css";
import axios from 'axios';

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  const register = () => {
    axios({
      method: "post",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => console.log(res)); 
  };
  const login = () => {
    axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => console.log(res));
  };
  const getUser = () => {
    axios({
      method: "get",
      
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
};

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input placeholder="username"
        onChange={e => setRegisterUsername(e.target.value)}
        />
        <input placeholder="password"
        onChange={e=> setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input placeholder="username" 
          onChange={e => setLoginUsername(e.target.value)}
        />
        <input placeholder="password"
          onChange={e => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get user</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Velkommen tilbake, {data.username}</h1> : null}
      </div>
    </div>
  );
}

export default App;
