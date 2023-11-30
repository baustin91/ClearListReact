import React from "react";
import { Card, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListCard = ({ list, onEditList, onDeleteList }) => {
  const navigate = useNavigate();

  const onViewTasks = () => {
    navigate(`/tasks/${list.listID}`, {
      state: { listTitle: list.list_title },
    });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-light">{list.list_title}</Card.Title>

        <div className="d-flex justify-content-end">
          <Dropdown as={ButtonGroup}>
            <Button
              variant="secondary"
              onClick={() => onViewTasks(list.listID)}
            >
              View Tasks
            </Button>

            <Dropdown.Toggle
              split
              variant="primary"
              id={`dropdown-split-${list.listID}`}
            />

            <Dropdown.Menu>
              <Dropdown.Item
                eventKey="1"
                onClick={() => onEditList(list.listID)}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={() => onDeleteList(list.listID)}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListCard;
