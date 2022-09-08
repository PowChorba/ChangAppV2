import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from "react-router-dom";
import '../css/navBar.css'
import { Button } from "@mui/material";
import { useAuth } from "../../context/authContext.js";



export default function Nav() {
  const { logAnonymous } = useAuth();
const navigate = useNavigate();

const handleAnonymous = async (e) => {
  e.preventDefault();
  try {
    await logAnonymous();
    navigate("/home");
  } catch (error) {
    console.log("Error anonimo");
  }
};




    return(
        <div>
            <Box  className="navBar">
                <NavLink className='app-title'  to='/'><Typography variant="h4">ChangApp</Typography></NavLink>
                <Box className="btn-container">
                    <Button className="anon-btn"   onClick={handleAnonymous} >Comienza a buscar</Button>
                    <Button className="anon-btn" onClick={() => {navigate('/login')}}>Registrate/Inicia sesión</Button>
                </Box>
            </Box>
        </div>)
}