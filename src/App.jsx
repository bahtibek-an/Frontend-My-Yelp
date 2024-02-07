import { useEffect, useState } from "react";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/api";
import { createTodo, deleteTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import "./App.css";

const initialState = { name: "", description: "" };
const client = generateClient();

const App = ({ signOut, user }) => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await client.graphql({
        query: listTodos,
      });
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos", err);
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await client.graphql({
        query: createTodo,
        variables: {
          input: todo,
        },
      });
      setIsModalOpen(false);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  async function removeTodo(id) {
    try {
      await client.graphql({
        query: deleteTodo,
        variables: {
          input: { id },
        },
      });
      fetchTodos();
    } catch (err) {
      console.log("error deleting todo:", err);
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <div style={styles.navbarTitle}>Yelp Clone</div>
        <div style={styles.userInfo}>
          <div style={{ marginRight: '10px'}}>Welcome, {user.username}</div>
          <Button onClick={signOut}>Sign out</Button>
          <Button style={styles.createButton} onClick={openModal}>
            Create Restaurant
          </Button>
        </div>
      </div>
      <h2>Restaurant List</h2>
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <Heading level={2}>Create Restaurant</Heading>
            <input
              onChange={(event) =>
                setFormState({ ...formState, name: event.target.value })
              }
              style={styles.input}
              value={formState.name}
              placeholder="Name"
            />
            <input
              onChange={(event) =>
                setFormState({ ...formState, description: event.target.value })
              }
              style={styles.input}
              value={formState.description}
              placeholder="Description"
            />
            <Button style={styles.button} onClick={addTodo}>
              Create
            </Button>
            <Button style={styles.cancelButton} onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Restaurant Name</th>
            <th style={styles.tableHeader}>Description of Restaurant</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id ? todo.id : index}>
              <td style={styles.tableCell}>{todo.id}</td>
              <td style={styles.tableCell}>{todo.name}</td>
              <td style={styles.tableCell}>{todo.description}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    margin: "0 auto",
    padding: 20,
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  navbarTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  createButton: {
    marginLeft: '10px',
    backgroundColor: "black",
    color: "white",
    fontSize: 16,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 20,
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    display: 'block',
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  input: {
    width: '350px',
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    margin: '10px',
    display: 'block',
    fontSize: 18,
  },
  button: {
    backgroundColor: "black",
    color: "white",
    fontSize: 16,
    margin: '10px',
  },
  cancelButton: {
    backgroundColor: "grey",
    color: "white",
    fontSize: 16,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 14,
  },
};

export default withAuthenticator(App);
