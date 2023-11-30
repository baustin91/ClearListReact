import React, { useEffect, useState } from "react";
import ListCard from "./ListCard";
import { Button, Modal, Form } from "react-bootstrap";

const ListsPage = () => {
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentList, setCurrentList] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:5000/lists?userID=${userId}`
          );
          if (response.ok) {
            const data = await response.json();
            setLists(data);
          } else {
            console.error("Failed to fetch lists");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchLists();
  }, []);

  const handleAddList = () => {
    setIsEditMode(false);
    setCurrentList(null);
    setListName("");
    setShowModal(true);
  };

  const handleOpenEditModal = (list) => {
    setIsEditMode(true);
    setCurrentList(list);
    setListName(list.list_title);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId && !isEditMode) {
      console.error("User ID not found");
      return;
    }

    let url = "http://localhost:5000/lists";
    let method = "POST";
    let bodyData = {
      userID: userId,
      list_title: listName,
    };

    if (isEditMode && currentList) {
      method = "PUT";
      bodyData = {
        listID: currentList.listID,
        list_title: listName,
      };
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
        setListName("");
        setShowModal(false);
        setIsEditMode(false);
        setCurrentList(null);
        window.location.reload();
      } else {
        console.error("Failed to process list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onDeleteList = async (listID) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      try {
        const response = await fetch(`http://localhost:5000/lists/${listID}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setLists((currentLists) =>
            currentLists.filter((list) => list.listID !== listID)
          );
        } else {
          console.error("Failed to delete list");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-between">
        <h1 className="col-8 mt-2 text-light">Lists</h1>
        <Button
          variant="info"
          style={{ fontSize: "24px" }}
          className="col-2 col-sm-1 my-2 mr-3 p-0"
          onClick={handleAddList}
        >
          +
        </Button>
      </div>
      <div className="row">
        {lists.map((list) => (
          <div className="col-sm-4 col-12 mb-1" key={list.listID}>
            <ListCard
              list={list}
              onDeleteList={() => onDeleteList(list.listID)}
              onEditList={() => handleOpenEditModal(list)}
            />
          </div>
        ))}
      </div>


      {/* Modal */}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit List" : "Add New List"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="text-light">List Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter list name"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </Form.Group>
            <Button variant="info" type="submit" className="mt-2 w-100">
              {isEditMode ? "Update List" : "Create List"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListsPage;
