import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import axios from 'axios';

export default function AddTaskPage() {
    const [form, setForm] = useState({})


    // this is where form data goes for validation and to be insered in DB
    const dbUrl = 'http://localhost:3004/projects'
    
    // updates the form data as the user provides data
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setForm(values => ({...values, [name]: value}))
      }

    console.log(form)

  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post(dbUrl, form)
            .then(function (res) {
              console.log(res.data);
              // routes the user to added product page after form is submitted
              handleClick();
            });
  }

  // page routing
  const navigate = useNavigate()

  function handleClick() {
    navigate("/")
  }

  return (
    <Container>
      <Row>
        <Col>
        <Row>
          <Col>
          <h1 className='mt-3'>Add Task</h1>
          </Col>
          <Col className="d-flex justify-content-end">
          <Button className='add-btn mt-4' variant="warning" onClick={handleClick}>Cancel</Button>
          </Col>
          </Row>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formTaskName'>
              <Form.Label>Project Name</Form.Label>
              <Form.Control type='text' placeholder='Enter task name' name='projectName' onChange={handleChange} required/>
            </Form.Group>

            <Form.Group controlId='formTaskDescription'>
              <Form.Label>Task Description</Form.Label>
              <Form.Control as='textarea' rows={3} placeholder='Enter task description' name='task' onChange={handleChange} required/>
            </Form.Group>

            <Form.Group controlId='formTaskDate'>
              <Form.Label>Task Due Date</Form.Label>
              <InputGroup>
                <Form.Control value={form.dueDate} type='date' name='dueDate' onChange={(e) => {
                  setForm({
                    ...form,
                    dueDate: e.target.value,
                    start_date: new Date().toISOString().substr(0, 10), 
                  })
                }} required/>
                
                  <Button variant='outline-secondary'>Today</Button>
                
              </InputGroup>
            </Form.Group>

            <Button className='mt-3' variant='primary' type='submit'>
              Add Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
