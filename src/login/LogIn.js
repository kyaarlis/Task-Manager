import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import './login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs'

const LoginPage = () => {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })
  const [users, setUsers] = useState([])
  const [loginFail, setLoginFail] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();

    // Pārbaudām vai lietotājvārds atrodas datubāzē
      const existingUser = users.find((user) => user.username === login.username);

      // Ja lietotājvārds atrodas datubāzē un ja atširfrētā parole ir piederīga
      // lietotājvārdam tad jāvirza lietotājs uz nākamo lapu
      if (existingUser && bcrypt.compareSync(login.password, existingUser.password)) {
        handleClick();
        return;
      } else {
        setLoginFail(true)
      }
    }; 

  // Pieprasam visus lietotāju datus no datubāzes
  // un ieliekam tos veidlapā
  const fetchAllUsers = () => {
    axios.get('http://localhost:3004/users').then((response) => {
      setUsers(response.data)
    });
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  // Lapu maršrutēšana
  const navigate = useNavigate()

  function handleClick() {
    navigate("tasks")
  }

  return (
    <div className='topG'>
      <Container className='login-container mt-5'>
        <div className='login-form'>
          <Form className='form' onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={login.username}
                onChange={(event) => setLogin({
                  ...login,
                  username: event.target.value
                })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={login.password}
                onChange={(event) => setLogin({
                  ...login,
                  password: event.target.value
                })}
                required
              />
            </Form.Group>

            <Button className='mt-2' variant="primary" type="submit">
              Log in
            </Button>

            {loginFail ? <h6 className='mt-2 mb-0 login-fail'>Username or password incorrect!</h6> : null}

            <Link to="/signup" className="btn btn-link mt-3">
              Don't have an account yet? Sign up here.
            </Link>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;

