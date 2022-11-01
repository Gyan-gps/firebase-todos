import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Form from "./Form";
import {
  setDoc,
  collection,
  query,
  // where,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";

import { db } from "../../config/firebaseInitisize";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Delete, UpdateOutlined } from "@mui/icons-material";

const Home = () => {
  const [todos, setTodos] = useState(null);
  const [update, setUpdate] = useState(false);
  const [todo, setTodo] = useState(null);
  const [text, setText] = useState("");
  // const token = localStorage.getItem("token");
  const userID = JSON.parse(localStorage.getItem("user"));
  // console.log(userID)
  useEffect(() => {
    const q = query(collection(db, "todos"));
    onSnapshot(q, orderBy("createdAt", "desc"), (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().uid)
        if (userID && doc.data().uid === userID.uid) {
          cities.push({ ...doc.data(), id: doc.id });
          // console.log(doc.id);
        }
      });
      setTodos(cities);
      // console.log("Current cities in CA: ", cities.join("/n"));
    });
  }, []);

  const handleUpdate = async (e) => {
    await setDoc(doc(db, "todos", `${todo.id}`), {
      ...todo,
      todo: text,
    });
    setUpdate(false);
  };

  const handleDelete = async (e) => {
    await deleteDoc(doc(db, "todos", `${e}`));
  };

  return (
    <div>
      <Navbar />
      <Form />
      {todos===null ? (
        <h1>loading...</h1>
      ) : todos.length===0?
      <h1 
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      >Add todo</h1>:(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: { sm: "50%", xs: "300px" } }}>
            {todos.map((e, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid gray",
                  }}
                >
                  <Typography
                    
                    onClick={async () => {
                      await setDoc(doc(db, "todos", `${e.id}`), {
                        ...e,
                        isCompleted: !e.isCompleted,
                      });
                    }}
                    sx={{
                      textDecoration: e.isCompleted ? "line-through" : "none",
                      color: e.isCompleted ? "gray" : "black",
                      cursor: "pointer",
                      paddingLeft:"10px",
                      // width:"70%"
                    }}
                  >
                    {e.todo.toUpperCase()}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "auto",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setUpdate(true);
                        setText(e.todo);
                        setTodo(e);
                      }}
                    >
                      <UpdateOutlined />
                    </Button>
                    <Button onClick={() => handleDelete(e.id)}>
                      <Delete />
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </div>
      )}

      <Modal open={update} onClose={() => setUpdate(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: {sm:"7%",xs:"28%"},
            alignItems: "center",
          }}
        >
          {/* <form onSubmit={(e)=>handleSubmit(e)}> */}
          <input
            style={{
              minWidth: "300px",
              width: "40%",
              height: "40px",
              borderRadius: "8px",
              border: "none",
              padding: "4px",
              fontSize: "18px",
            }}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            style={{
              padding: "8px",
              fontSize: "20px",
              border: "none",
              borderRadius: "8px",
              marginTop: "4px",
            }}
            type="submit"
            onClick={(e) => handleUpdate(e)}
          >
            Update
          </button>
          {/* </form> */}
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
