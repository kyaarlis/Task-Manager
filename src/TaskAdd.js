import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import axios from 'axios';
const {format} = require('date-fns');

export default function AddTaskPage() {
    const [form, setForm] = useState({
      start_date: format(new Date(),'yyyy-MM-dd')
    })

    // Šeit veidlapas dati tiek izmantoti apstiprināšanai un ievietošanai DB
    const dbUrl = 'http://localhost:3004/projects'
    
    // Atjaunina veidlapas datus, kad lietotājs sniedz datus
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setForm(values => ({...values, [name]: value}))
      }

  // Nosūtam datus uz datubāzi 
  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post(dbUrl, form)
            .then(function (res) {
              console.log(res.data);
              // routes the user to added product page after form is submitted
              handleClick();
            });
  }

  const todayBtn = () => {
    setForm({
    ...form,
    dueDate: format(new Date(),'yyyy-MM-dd'), 
  })
  }

  // Lapu maršrutēšana
  const navigate = useNavigate()

  function handleClick() {
    navigate("../tasks")
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
                    start_date: format(new Date(),'yyyy-MM-dd'), 
                  })
                }} required/>
                
                  <Button variant='outline-secondary' onClick={todayBtn}>Today</Button>
                
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
