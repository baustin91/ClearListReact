import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { listID } = useParams();

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

  return (
    <div className="container">
        <div className="row justify-content-center">
      <h2 className="my-4">Tasks for List {listID}</h2>
      </div>
      <div className="row justify-content-center">
      <div className="col-sm-8 col-12">
        {tasks.map((task) => (
          <Card key={task.taskID} className="mb-3">
            <Card.Header as="h5">{task.task_title}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Due Date: {new Date(task.due_date).toLocaleDateString()}
              </ListGroup.Item>
              <ListGroup.Item>Note: {task.task_note}</ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Tasks;
