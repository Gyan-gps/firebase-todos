import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  setDoc,
  collection,
  query,
  // where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebaseInitisize";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  const [userDetails, setUserDetails] = useState({});
  const [update, setUpdate] = useState(false);

  // useEffect(() => {
  //   // const q = query(collection(db, "todos"));
  //   onSnapshot(doc(db, "todos","yvk3TGlX1aeLj57jgf1dU0zokWg1") /*`${user.uid}`)*/, (doc) => {
  //     setUserDetails(doc);
  //     console.log(doc)
  //     // console.log("Current cities in CA: ", cities.join("/n"));
  //   });
  // }, []);
  useEffect(() => {
    const q = query(collection(db, "users"));
    // console.log(q);
    onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid === user.uid) {
          cities.push({ ...doc.data(), id: doc.id });
          // console.log(doc.data());
        }
        // console.log(doc.data().uName);
      });
      if(cities.length===0)setUpdate(true)
      setUserDetails(cities[0]);
      // console.log("Current cities in CA: ", cities.join("/n"));
    });
  }, [user.uid]);
  if( !userDetails.uName)<h1>loading...</h1>
  const [details, setDetails] = useState({
    uName: user.displayName,
    age: "",
    uEmail: user.email,
    uMoNumber: "",
    uid:"yvk3TGlX1aeLj57jgf1dU0zokWg1"
  });


  const handleUpdate = async (e) => {
    await setDoc(doc(db, "users", `${user.uid}`), details);
    setUpdate(false);
  };

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };
  console.log(details,userDetails.age)
  return (
    <div>
      <Navbar />
      <Box sx={{display:update?"none":"block"}}>
        {
          !userDetails.uName?<h1>loading...</h1>:
          <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
         {/* <div style={{backgroundColor:"white",width:"80%"}}> */}
         <label>
            <h3>Name: </h3>
            <input
              style={{
                minWidth: "300px",
                width: "40%",
                height: "30px",
                borderRadius: "8px",
                border: "none",
                padding: "4px",
                fontSize: "18px",
              }}
              value={userDetails.uName}
              disabled            
              />
          </label>
          {/* <label>
            <h3>Name: </h3>
            <input
                style={{
                minWidth: "300px",
                width: "40%",
                height: "30px",
                borderRadius: "8px",
                border: "none",
                padding: "4px",
                fontSize: "18px",
                }}
                name="uName"
                type="text"
                value={details.uName}
                onChange={(e) => handleChange(e)}
            />
          </label> */}
          <label>
            <h3>Email: </h3>
            <input
              style={{
                minWidth: "300px",
                width: "40%",
                height: "30px",
                borderRadius: "8px",
                border: "none",
                padding: "4px",
                fontSize: "18px",
              }}
              value={userDetails.uEmail}
              disabled
            />
          </label>
          <label>
            <h3>Age: </h3>
            <input
              style={{
                minWidth: "300px",
                width: "40%",
                height: "30px",
                borderRadius: "8px",
                border: "none",
                padding: "4px",
                fontSize: "18px",
              }}
              value={userDetails.age}
              disabled
            />
          </label>
          <label>
            <h3>Mobile Number: </h3>
            <input
              style={{
                minWidth: "300px",
                width: "40%",
                height: "30px",
                borderRadius: "8px",
                border: "none",
                padding: "4px",
                fontSize: "18px",
              }}
              value={userDetails.uMoNumber}
              disabled
            />
          </label>
          <button
            style={{
              padding: "8px",
              fontSize: "20px",
              border: "none",
              borderRadius: "8px",
              marginTop: "4px",
            }}
            onClick={(e) => setUpdate(true)}
          >
            Edit
          </button>
         {/* </div> */}
        </div>
        }
      </Box>
      <Modal open={update} onClose={() => setUpdate(false)}>
        
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: {sm:"10%",xs:"25%"},
            // width:"80%"
          }}
        >
          <label>
            <h3>Name: </h3>
            <input
              style={{
                minWidth: "300px",
                width: "40%",
                height: "30px",
                borderRadius: "8px",
                border: "none",
                padding: "4px",
                fontSize: "18px",
              }}
              placeholder="Enter your name"
              name="uName"
              type="text"
              value={details.uName}
              onChange={(e) => handleChange(e)}
            />
          </label>
          {/* <label>
            <h3>Name: </h3>
            <input
                style={{
                minWidth: "300px",
                width: "40%",
                height: "30px",
                borderRadius: "8px",
                border: "none",
                padding: "4px",
                fontSize: "18px",
                }}
                name="uName"
                type="text"
                value={details.uName}
                onChange={(e) => handleChange(e)}
            />
          </label> */}
          <label>
            <h3>Email: </h3>
            <input
              style={{
                minWidth: "300px",
                width: "40%",
                height: "30px",
                borderRadius: "8px",
                border: "none",
                padding: "4px",
                fontSize: "18px",
              }}
              name="uEmail"
              type="text"
              value={details.uEmail}
              onChange={(e) => handleChange(e)}
              disabled
            />
          </label>
          <label>
            <h3>Age: </h3>
            <input
              style={{
                minWidth: "300px",
                width: "40%",
                height: "30px",
                borderRadius: "8px",
                border: "none",
                padding: "4px",
                fontSize: "18px",
              }}
              placeholder="Enter your age"
              name="age"
              type="text"
              value={details.age?details.age:userDetails.age}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            <h3>Mobile Number: </h3>
            <input
              style={{
                minWidth: "300px",
                width: "40%",
                height: "30px",
                borderRadius: "8px",
                border: "none",
                padding: "4px",
                fontSize: "18px",
              }}
              placeholder="Enter Mobile Number"
              name="uMoNumber"
              type="text"
              value={details.uMoNumber?details.uMoNumber:userDetails.uMoNumber}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <button
            style={{
              padding: "8px",
              fontSize: "20px",
              border: "none",
              borderRadius: "8px",
              marginTop: "4px",
            }}
            onClick={(e) => handleUpdate(e)}
          >
            Update
          </button>
        </Box>
        {/* </div> */}
      </Modal>
    </div>
  );
};

export default Profile;
// user.displayName
