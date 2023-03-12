import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import './signup.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs'


const SignUpPage = () => {
  const [signUpForm, setSignUpForm] = useState({
    username: '',
    password: '',
    passwordRepeat: ''
  });

  const [users, setUsers] = useState([])

  const hashedPassword = bcrypt.hashSync(signUpForm.password, 10)

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Pārbauda vai lietotājvārds eksistē
    const existingUser = users.find(user => user.username === signUpForm.username);
    if (existingUser) {
      alert('Username already exists. Please choose a different username.');
      return;
    }

    if (signUpForm.password === signUpForm.passwordRepeat) {
      try {
        const response = await axios.post(`http://localhost:3004/users`, {
          username: signUpForm.username,
          password: hashedPassword
        });
        
        handleClick();
  
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Passwords aren\'t matching!');
    }
  };

  const fetchAllUsers = () => {
    axios.get('http://localhost:3004/users').then((response) => {
      setUsers(response.data)
    });
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  const navigate = useNavigate()

  function handleClick() {
    navigate("../tasks")
  }

  return (
    <div className='topG'>
    <Container className='main-contaier'>
      <div className='login-form'>
        <Form className='signup-form' onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          className='control'
          type="text"
          placeholder="Enter username"
          value={signUpForm.username}
          onChange={(event) => setSignUpForm({
            ...signUpForm,
            username:  event.target.value
          })
        }
          required
        />
      </Form.Group>

      <Form.Group className='mt-2' controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
        className='control'
          type="password"
          placeholder="Enter password"
          value={signUpForm.password}
          onChange={(event) => setSignUpForm({
            ...signUpForm,
            password:  event.target.value
          })
        }
          required
        />
      </Form.Group>

      <Form.Group className='mt-2' controlId="formBasicPasswordRepeat">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
        className='control'
          type="password"
          placeholder="Re-enter password"
          value={signUpForm.passwordRepeat} 
          onChange={(event) => setSignUpForm({
            ...signUpForm,
            passwordRepeat:  event.target.value
          })
        }
          required
        />
      </Form.Group>

      <Button className='mt-3' variant="primary" type="submit">
        Sign up
      </Button>

      <Link to="/" className="btn btn-link mt-3">
        Already have an account? Log in here.
      </Link>
    </Form>
      </div>
    
    </Container>
    </div>
  );
};

export default SignUpPage;
