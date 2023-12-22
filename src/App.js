/* src/App.js */
import React, { useEffect, useState } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: "", description: "", city: "" };

const App = ({ signOut, user }) => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      // For demo purposes, using fake data
      const fakeData = [
        { id: 1, name: "Tashkent Plov Center", description: "All types of food have", city: "Tashkent" },
        { id: 2, name: "Milliy taomlar", description: "uzbek milliy taomlari", city: "Tashkent" },
        { id: 3, name: "Kafe Zebo", description: "milliy taomlar, va buyurtma taomlar", city: "Chirchiq" },
        
      ];

      setTodos(fakeData);
    } catch (err) {
      console.log("error fetching todos", err);
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description || !formState.city) return;

      const todo = { ...formState };
      setTodos((prevTodos) => [...prevTodos, todo]);
      setFormState(initialState);

      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
    } finally {
      closeModal();
    }
  }

  const handleInputChange = (key, value) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={styles.navbar}>
        <div style={styles.logo}>
          <span style={styles.yelpText}>YELP</span>
        </div>

        <div style={styles.userInfo}>
          <span style={styles.welcome}>Welcome, {user.username}</span>
          <Button onClick={openModal} style={styles.addButton}>
            Create
          </Button>
          <Button onClick={signOut} style={styles.button}>
            Sign out
          </Button>
        </div>
      </div>

      {/* Create Todo Modal */}
      {isModalOpen && (
        <div id="todoModal" style={styles.modal}>
          <h2>Create Restaurant</h2>
          <input
            onChange={(event) => handleInputChange("name", event.target.value)}
            style={styles.input}
            value={formState.name}
            placeholder="Name"
          />
          <input
            onChange={(event) =>
              handleInputChange("description", event.target.value)
            }
            style={styles.input}
            value={formState.description}
            placeholder="Description"
          />
          <input
            onChange={(event) =>
              handleInputChange("city", event.target.value)
            }
            style={styles.input}
            value={formState.city}
            placeholder="City"
          />
          <div style={{ display: "flex" }}>
            <Button onClick={addTodo} style={styles.addButton}>
              Create
            </Button>
            <Button onClick={closeModal} style={styles.closeButton}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={styles.container}>
        <div className="addItems">
          {todos.map((todo, index) => (
            <div key={todo.id ? todo.id : index} style={styles.todo}>
              <p style={styles.todoName}>Name: {todo.name}</p>
              <p style={styles.todoDescription}>
                Description: {todo.description}
              </p>
              <p style={styles.todoCity}>City: {todo.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#333",
    color: "white",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    flex: 1,
  },
  yelpText: {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: "20px",
  },
  cityText: {
    marginRight: "10px",
  },
  userInfo: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  welcome: {
    marginRight: "10px",
  },
  button: {
    backgroundColor: "#f23d",
    color: "white",
    fontSize: 18,
    padding: "10px 20px",
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1000",
  },
  container: {
    width: "50%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
  },
  addButton: {
    backgroundColor: "#45824",
    color: "black",
    fontSize: 18,
    borderRadius: 8,
    cursor: "pointer",
    marginRight: "10px",
  },
  todo: {
    marginBottom: "15px",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "8px",
  },
  todoName: {
    marginBottom: "5px",
    fontSize: "16px",
  },
  todoDescription: {
    fontSize: "14px",
  },
  todoCity: {
    fontSize: "14px",
    fontStyle: "italic",
  },
  input: {
    border: "none",
    backgroundColor: "#f8f8f8",
    marginBottom: "10px",
    padding: "10px",
    fontSize: "18px",
    borderRadius: "8px",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  closeButton: {
    backgroundColor: "#aaa",
    color: "white",
    fontSize: 18,
    borderRadius: 8,
    cursor: "pointer",
    marginLeft: "15px",
  },
};

export default withAuthenticator(App);
