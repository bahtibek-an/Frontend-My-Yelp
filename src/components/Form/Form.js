
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { CSSTransition } from "react-transition-group";
import "./Form.css";

const Form = ({ itemCollectionRef, getItemList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [isFormVisible] = useState(true);

  const auth = getAuth();

  const onSubmitItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(itemCollectionRef, {
        name,
        description,
        city,
        userId: auth?.currentUser?.uid,
      });

      setName("");
      setDescription("");
      setCity("");

      getItemList();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <CSSTransition
      in={isFormVisible}
      timeout={300}
      classNames="form"
      unmountOnExit
    >
      <div className="form-container">
        <div>
          <h2 className="form-heading">Add Restaurant</h2>
          <form onSubmit={onSubmitItem}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
              required
            />
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-input"
              required
            />
            <button type="submit" className="form-button">
              Add New
            </button>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Form;
