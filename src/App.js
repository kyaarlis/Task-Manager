import React from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

function TaskListPage() {
  const tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ];

  return (
    <Container>
      <Row>
        <Col>
          <h1>Task List</h1>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Current Tasks</h2>
          <ListGroup>
            {tasks.map(task => (
              <ListGroup.Item key={task.id}>
                <Form.Check
                  type="checkbox"
                  id={`task-${task.id}`}
                  label={task.title}
                  checked={task.completed}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskListPage;
