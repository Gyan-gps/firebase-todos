import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebaseInitisize";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");
  const userID = JSON.parse(localStorage.getItem("user"));
  // console.log(userID)
  const navigate = useNavigate();
  // console.log(token)
  const handleSubmit = async () => {
    if (token) {
      try {
        await addDoc(collection(db, "todos"), {
          todo: text,
          createdAt: Timestamp.fromDate(new Date()),
          uid: userID.uid,
          isCompleted:false
        }).then((res) => {
          // console.log(res)
          setText("");
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/signup");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      {/* <form onSubmit={(e)=>handleSubmit(e)}> */}
      <input
        style={{
          // backgroundColor:"gray",
          minWidth: "250px",
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
        minWidth:"100px",
        padding: "8px",
        fontSize: "20px",
        border: "none",
        borderRadius: "8px",
        marginTop: "4px",
      }}
      type="submit" onClick={(e) => handleSubmit(e)}>
        ADD
      </button>
      {/* </form> */}
    </div>
  );
};

export default Form;
