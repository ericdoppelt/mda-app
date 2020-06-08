// from https://serverless-stack.com/chapters/create-a-login-page.html

import React from 'react';
import './LoginForm.css'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";



export default function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [correctPassword, setCorrectness] = React.useState(true);
  const [testText, setText] = React.useState("");


  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    setCorrectness(true)
    if (username === 'mike') {
      const params = new URLSearchParams;
      params.append('username', username);
      params.append('password', password);
      axios.post('https://mda-phoenix.herokuapp.com/login', params);
      
      setText('hi mike')
    } else {
      setCorrectness(false)
    }
    event.preventDefault();
  }

  return (
    <div className="LoginForm">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="text" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
      
      {correctPassword ? testText : <div>Incorrect Password</div>}

    </div>
  );
}