import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import './Form.css';
import { CSSTransition } from 'react-transition-group';

const Form = ({ itemCollectionRef, getItemList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [isFormVisible, setFormVisible] = useState(true);

  const auth = getAuth();

  const onSubmitItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(itemCollectionRef, {
        name,
        description,
        city,
        userId: auth?.currentUser?.uid
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
      <Stack p={2}>
        <Typography textAlign={"center"} fontWeight={"bold"} fontSize={20}>
          Add Restaurant
        </Typography>
        <form onSubmit={onSubmitItem}>
          <Box mb={2}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Box>
          <Stack direction={"row"} justifyContent={"end"}>
            <Button type="submit" variant="contained" sx={{ width: "170px" }}>
              Add New
            </Button>
          </Stack>
        </form>
      </Stack>
    </CSSTransition>
  );
};

export default Form;
