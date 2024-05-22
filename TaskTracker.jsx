import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';
import { format } from 'date-fns';

const TaskTracker = () => {
  // State variables
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('');

  const containerStyles = {
    backgroundColor: '#212529', // Dark background color
    color: '#ffffff', // White text colorg
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Drop shadow effect
    borderRadius: '10px', // Rounded corners
  };

  const darkModeStyles = {
    backgroundColor: '#343a40', // Dark background color for toggle switch
    color: '#ffffff', // White text color for toggle switch
  };

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim() === '') return;

    const newTaskItem = {
      id: tasks.length + 1,
      title: newTask,
      priority,
      deadline: deadline !== '' ? new Date(deadline) : null,
      completed: false
    };

    setTasks([...tasks, newTaskItem]);
    setNewTask('');
    setPriority('');
    setDeadline('');
  };

  // Function to handle task completion
  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Function to handle task deletion
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to toggle show completed tasks
  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  // Function to filter tasks by priority
  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  return (
    <div className="container" style={containerStyles}>
      <h1 className="my-4">Task Tracker</h1>

      {/* Task input form */}
      <Card className="mb-4" style={darkModeStyles}>
        <Card.Body style={darkModeStyles}>
          <Form style={darkModeStyles}>
            <Form.Group className="mb-3" controlId="taskInput">
              <Form.Label style={darkModeStyles}>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                style={{ ...darkModeStyles, color: 'white' }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="prioritySelect">
              <Form.Label style={darkModeStyles}>Priority</Form.Label>
              <Form.Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={darkModeStyles}
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="deadlineInput">
              <Form.Label style={darkModeStyles}>Deadline</Form.Label>
              <Form.Control
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{ ...darkModeStyles, color: 'white' }}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddTask}>
              Add Task
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Task list */}
      <Card style={darkModeStyles}>
        <Card.Body>
          <div className="mb-3">
            <Form.Check
              type="switch"
              id="completedSwitch"
              label="Show completed tasks"
              checked={showCompleted}
              onChange={toggleShowCompleted}
              style={darkModeStyles}
            />
          </div>
          <Form.Select
            className="mb-3"
            value={priorityFilter}
            onChange={handlePriorityFilterChange}
            style={darkModeStyles}
          >
            <option value="">Filter by Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Form.Select>
          {tasks.map(task => (
            (!task.completed || showCompleted) &&
            (priorityFilter === '' || task.priority === priorityFilter) && (
              <Card key={task.id} className={`mb-3${task.completed ? ' text-muted' : ''}`} style={darkModeStyles}>
                <Card.Body>
                  <Card.Title style={darkModeStyles}>{task.title}</Card.Title>
                  <Card.Text style={darkModeStyles}>
                    <strong>Priority:</strong> {task.priority}<br />
                    {task.deadline && (
                      <>
                        <strong>Deadline:</strong> {format(task.deadline, 'dd/MM/yyyy HH:mm')}<br />
                      </>
                    )}
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleTaskCompletion(task.id)}
                    >
                      <BsCheckCircle />
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          ))}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskTracker;
