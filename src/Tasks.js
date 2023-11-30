import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Card,
  ListGroup,
  Button,
  ButtonGroup,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { listID } = useParams();
  const location = useLocation();
  const listTitle = location.state?.listTitle || "Unknown List";
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskNote, setTaskNote] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/tasks?listID=${listID}`
        );
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [listID]);

  const handleOpenModalForAdd = () => {
    setIsEditMode(false);
    setCurrentTask(null);
    setTaskTitle("");
    setDueDate("");
    setTaskNote("");
    setShowModal(true);
  };

  const handleOpenModalForEdit = (task) => {
    setIsEditMode(true);
    setCurrentTask(task);
    setTaskTitle(task.task_title);
    setDueDate(task.due_date.split("T")[0]); // Assuming the date is in ISO format
    setTaskNote(task.task_note);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "http://localhost:5000/tasks";
    let method = isEditMode ? "PUT" : "POST";
    let bodyData = {
      listID: listID,
      task_title: taskTitle,
      due_date: dueDate,
      task_note: taskNote,
    };

    if (isEditMode && currentTask) {
      bodyData.taskID = currentTask.taskID;
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        if (isEditMode) {
          setTasks((prevTasks) =>
            prevTasks.map((t) =>
              t.taskID === currentTask.taskID ? { ...t, ...bodyData } : t
            )
          );
        } else {
          const newTask = await response.json();
          setTasks((prevTasks) => [...prevTasks, newTask]);
        }
        setShowModal(false);
        resetFormFields();
        window.location.reload();
      } else {
        console.error("Failed to process task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetFormFields = () => {
    setTaskTitle("");
    setDueDate("");
    setTaskNote("");
    setIsEditMode(false);
    setCurrentTask(null);
  };

  const onDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to complete this task?")) {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setTasks((currentTasks) =>
            currentTasks.filter((task) => task.taskID !== taskId)
          );
        } else {
          console.error("Failed to delete task");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="my-4 col-12 text-center text-light">{listTitle}</h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-8 col-12">
          <Button
            className="w-100 p-2 my-2"
            style={{ fontSize: "18px" }}
            variant="info"
            onClick={() => handleOpenModalForAdd()}
          >
            + Add Task
          </Button>
          {tasks.map((task) => (
            <Card key={task.taskID} className="mb-3">
              <Card.Header
                as="h5"
                className="d-flex justify-content-between align-items-center text-light"
              >
                {task.task_title}
                <Dropdown as={ButtonGroup}>
                  <Button
                    variant="success"
                    onClick={() => onDeleteTask(task.taskID)}
                  >
                    Complete
                  </Button>

                  <Dropdown.Toggle
                    split
                    variant="primary"
                    id={`dropdown-split-${task.taskID}`}
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleOpenModalForEdit(task)}>
                      Edit
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5 className="text-light">Due Date</h5>
                  {new Date(task.due_date).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5 className="text-light">Notes</h5>
                  {task.task_note}</ListGroup.Item>
              </ListGroup>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal Start */}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Task" : "Add New Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTaskTitle">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formTaskNote">
              <Form.Label>Task Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task note"
                value={taskNote}
                onChange={(e) => setTaskNote(e.target.value)}
              />
            </Form.Group>

            <Button className="w-100 my-2" variant="info" type="submit">
              {isEditMode ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Tasks;
