import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css'
const {format} = require('date-fns');

function TaskListPage() {
  const [tasks, setTask] = useState([])
  const [editTask, setEditedTasks] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  // Šodienas datums
  const today = format(new Date(),'yyyy-MM-dd')

  
  const fetchAllProjects = () => {
    axios.get('http://localhost:3004/projects').then((response) => {
  
      setTask(response.data)  
    });
  }

  const deleteProject = (projectId) => {
    axios.delete(`http://localhost:3004/projects/${projectId}`).then((response) => {

      fetchAllProjects();
    });
  };

  const editProject = (project) => {
    axios.put(`http://localhost:3004/projects/${project.id}`, {
      projectName: project.project_name,
      task: project.task,
      start_date: project.start_date,
      dueDate: project.due_date,
    }).then(() => {
      setIsUpdated(true)
    });
  }

  useEffect(() => {
    if (isUpdated) {
      fetchAllProjects();
      setIsUpdated(false);
    }
  }, [isUpdated]);

  // izskauksies vienu reizi uz komponenta ielādi
  useEffect(() => {
    fetchAllProjects()
  }, [])

  const fetchAllUsers = () => {
    axios.get('http://localhost:3004/users').then((response) => {

      // console.log(response.data)
    });
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  // page routing
  const navigate = useNavigate()

  function handleClick() {
    navigate("../addtask")
  }

  
  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div>
      
    <Container>
    <Row >
      <Col className='d-flex justify-content-start'>
      <Button className='mt-2 mb-2 logOutBtn' variant='outline-info' type='button' size="sm" onClick={handleLogout}>
        Log Out
        </Button>
        </Col>
      </Row>
      <Row>
        
        <Col>
        <Row>
          <Col>
          <h1 className='mt-3'>Task List</h1>
          </Col>
          <Col className="d-flex justify-content-end">
          <Button className='add-btn mt-4' variant="primary" onClick={handleClick}>Add new task</Button>{' '}
          </Col>
          </Row>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Current Tasks</h2>

      {tasks.length === 0 && <h2 className='no_tasks mt-3'>No tasks for now!</h2>}

    <Table striped bordered hover className={tasks.length === 0 ? 'all-tasks-hidden' : 'all-tasks'}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Project</th>
          <th>Task</th>
          <th>Starting Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>
            {selectedRow === task.id ? (
                <FloatingLabel
                  controlId="floatingInput"
                  label={task.project_name}
                  className="mb-3"
                >
                  <Form.Control  value={task.project_name} type="text" placeholder={task.project_name} 
                      onChange={(e) => {
                        const updatedTasks = tasks.map((t) => {
                          if (t.id === task.id) {
                            return {
                              ...t,
                              project_name: e.target.value,
                            };
                          } else {
                            return t;
                          }
                        });
                        setTask(updatedTasks);
                      }}
                    />

                </FloatingLabel>
              ) : (
                task.project_name
              )}
            </td>
            <td>
            {selectedRow === task.id ? (
                <FloatingLabel
                  controlId="floatingInput"
                  label={task.task}
                  className="mb-3"
                >
                  <Form.Control value={task.task} type="text" placeholder={task.task} 
                  onChange={(e) => {
                    const updatedTasks = tasks.map((t) => {
                      if (t.id === task.id) {
                        return {
                          ...t,
                          task: e.target.value,
                        };
                      } else {
                        return t;
                      }
                    });
                    setTask(updatedTasks);
                  }}
                     />
                </FloatingLabel>
              ) : (
                task.task
              )}
            </td>
            <td>{task.start_date}</td>
            <td>
            {selectedRow === task.id ? (
                <FloatingLabel
                  controlId="floatingInput"
                  label={task.due_date}
                  className="mb-3"
                >
                  <Form.Control value={task.due_date} type="text" placeholder={task.due_date} 
                  onChange={(e) => {
                    const updatedTasks = tasks.map((t) => {
                      if (t.id === task.id) {
                        return {
                          ...t,
                          due_date: e.target.value,
                        };
                      } else {
                        return t;
                      }
                    });
                    setTask(updatedTasks);
                    
                  }}
                     />
                </FloatingLabel>
              ) : (
                task.due_date
              )}
            </td>
            <td>
              <Col className='d-flex justify-content-center'>
                 <Button
                  key={task.id}
                  variant={task.due_date <= today ? 'success' : 'warning'}
                  size="sm"
                >
                  {task.due_date <= today ? 'Done' : 'In progress'}
                </Button>   
              </Col>

            </td>
            <td className='d-flex justify-content-lg-evenly'>
              <Button variant='danger' onClick={() => {
                deleteProject(task.id)
              }}>
                Delete
              </Button>
              <Button variant='warning' onClick={() => {
                setEditedTasks(true)
                setSelectedRow(task.id)
              }}>
                Edit
              </Button>
              {selectedRow === task.id && (
              <Button style={{display: editTask ? 'block' : 'none'}} variant='info' onClick={() => {
                editProject(task)
                setSelectedRow(null);
              }}>
                Save
              </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default TaskListPage;
