import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import {auth} from '../../config/firebaseInitisize' 
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = localStorage.getItem("token");
  const userID = JSON.parse(localStorage.getItem("user"));
  
  const navigate = useNavigate();

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  //   console.log(event)
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    // console.log(event.currentTarget)
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    console.log(e)
    if(e==="logout"){
      handleLogout();
    }
    else if(e==="profile"){
      handleProfile();
    }
    else{
      handleLogin();
    }
  };
  const handleLogin = (e)=>{
    navigate("/signup")
  }
  const handleLogout = (e)=>{
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      console.log(error)
    });
    
    localStorage.removeItem("token")
    localStorage.removeItem("user")

  }
  const handleProfile = (e)=>{
    if(userID)navigate("/profile")
    else navigate("/signup")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor:"pointer" }} onClick={()=>navigate("/")}>
            Firebase Todos
          </Typography>
            <>
            <Box sx={{display:{xs:"none", sm:"block"},width:"20%"}}>
              <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-evenly", cursor:"pointer"}}>
                <Typography onClick={handleProfile}>Profile</Typography>
                {!token?<Typography onClick={handleLogin}>Login</Typography>:
                <Typography onClick={handleLogout}>Logout</Typography>}
              </Box>
            </Box >
            <Box sx={{display:{xs:"block", sm:"none"}}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem name="profile" onClick={()=>handleClose("profile")}>Profile</MenuItem>
                {!token?<MenuItem name="login" onClick={()=>handleClose("login")}>Login</MenuItem>
                :<MenuItem name="logout" onClick={()=>handleClose("logout")}>Logout</MenuItem>}
              </Menu>
            </Box>
            </>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
// {/* <FormGroup>
//         <FormControlLabel
//           control={
//             <Switch
//               checked={auth}
//               onChange={handleChange}
//               aria-label="login switch"
//             />
//           }
//           label={auth ? 'Logout' : 'Login'}
//         />
//       </FormGroup> */}