import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Form from "./Form";
import { useEffect, useState } from "react";
import Table from "./Table";
import "../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import './main.css';

const Main = ({ accountList, getAccountList }) => {
  const [itemList, setItemList] = useState([]);
  const [userId, setUserId] = useState("");
  const currentEmail = getAuth().currentUser

  const userName = accountList.filter((acc) => acc.email === currentEmail.email )[0]?.userName

  const itemCollectionRef = collection(db, "restaurants");

  const getItemList = async () => {
    try {
      const data = await getDocs(itemCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        itemId: doc.itemId,
      }));

      setItemList(filteredData);
      setUserId(getAuth()?.currentUser?.uid);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAccountList();
    getItemList();
  }, [accountList]);

  const logoutHandler = () => {
    signOut(getAuth())
  };

  return (
    <Box>
      <Container>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ width:"100%", background:"blueviolet", }}
        >
          <Stack width={100}>
            <img src="./yelp-logo.png" alt="logo" />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Typography variant="h4" pt={1.5}>
              {userName && userName}
            </Typography>
            <Button>
              <Avatar sx={{ background: "blue" }}></Avatar>
            </Button>
          </Stack>
        </Stack>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button className="Logout"
           onClick={logoutHandler} variant="contained">
            Logout
          </Button>
        </Stack>
        <Stack direction={"row"} spacing={10} mt={5}>
          <Stack
            sx={{
              backgroundSize:"cover",
              borderRadius: "10px",
              width: "400px",
              height: "355px",
            }}
          >
            <Form
              itemCollectionRef={itemCollectionRef}
              getItemList={getItemList}
            />
          </Stack>
          <Stack
            
          >
            <Table itemList={itemList} userId={userId} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Main;
