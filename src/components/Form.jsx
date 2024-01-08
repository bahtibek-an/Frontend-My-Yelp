import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Form = ({ itemCollectionRef, getItemList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  let auth = getAuth();

  const onSubmitItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(itemCollectionRef, {
        name,
        description,
        city,
        userId: auth?.currentUser?.uid
      });
      setName('')
      setDescription('')
      setCity('')

      getItemList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack p={2}>
      <Typography textAlign={"center"} fontWeight={"bold"} fontSize={20}>
        Add Restaurant
      </Typography>
      <form onSubmit={onSubmitItem}>
        <Box mb={2}>
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            placeholder="city"
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
  );
};

export default Form;
