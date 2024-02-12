import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Form from "../Form/Form";
import Table from "../Table/Table";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./main.css";

const Main = ({ accountList, getAccountList }) => {
  const [itemList, setItemList] = useState([]);
  const [userId, setUserId] = useState("");
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const itemCollectionRef = collection(db, "restaurants");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const data = await getDocs(collection(db, "accounts"));
        const accounts = data.docs.map((doc) => doc.data());
        getAccountList(accounts);
        sessionStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        getAccountList([]);
        sessionStorage.removeItem("currentUser");
      }
    });

    return () => unsubscribe();
  }, [getAccountList]);

  const getItemList = async () => {
    try {
      const data = await getDocs(itemCollectionRef);
      const filteredData = data.docs.map((doc, index) => ({
        ...doc.data(),
        id: doc.id,
        itemId: index + 1,
      }));

      setItemList(filteredData);
      setUserId(currentUser?.uid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemList();
  }, [currentUser, itemCollectionRef]);

  useEffect(() => {
    const userFromSessionStorage = sessionStorage.getItem("currentUser");
    setCurrentUser(JSON.parse(userFromSessionStorage));
  }, []);

  const logoutHandler = () => {
    signOut(getAuth());
  };

  return (
    <Box>
      <Container>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          onMouseEnter={() => setIsLogoutVisible(true)}
          onMouseLeave={() => setIsLogoutVisible(false)}
        >
          <Stack width={100}>
            <img src="yelp-logo.png" alt="logo" />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Typography variant="h6" pt={1.5}>
              {currentUser ? currentUser.email : "Guest"}
            </Typography>
            <Button>
              <Avatar></Avatar>
            </Button>
            {isLogoutVisible && (
              <Button
                className="Logout"
                onClick={logoutHandler}
                variant="contained"
              >
                Logout
              </Button>
            )}
          </Stack>
        </Stack>
        <Stack direction={"row"} justifyContent={"end"}></Stack>
        <Stack spacing={1} mt={2}>
          <Stack>
            <Form
              itemCollectionRef={itemCollectionRef}
              getItemList={getItemList}
            />
          </Stack>
          <Stack>
            <Table itemList={itemList} userId={userId} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Main;
