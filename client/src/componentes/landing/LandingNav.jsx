import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from "@mui/material";
import { useAuth } from "../../context/authContext.js";
import s from './LandingNav.module.css'
import { useState } from "react";


export default function Nav() {
const { logAnonymous } = useAuth();
const navigate = useNavigate();
const [btn, setBtn] = useState(false)


const handleAnonymous = async (e) => {
  e.preventDefault();
  try {
    await logAnonymous();
    navigate("/home");
  } catch (error) {
    console.log("Error anonimo");
  }
};

const handleOnClic = (e) => {
  e.preventDefault()
  setBtn(!btn)
} 


    return(
        <div>
            <Box  className={s.navBar}>
              <div className={s.responsive}>
              <MenuIcon value={btn} onClick={handleOnClic} fontSize='large'/>
              </div>
              <NavLink className={s.appTitle}  to='/'><Typography variant="h4">ChangApp</Typography></NavLink>
                <Box className={ btn ? s.btnUno : s.btnContainer}>
                    <Button className={s.anonBtn} onClick={handleAnonymous} >Ir al Inicio</Button>
                    <Button className={s.anonBtn} onClick={() => {navigate('/login')}}>Iniciar sesión</Button>
                </Box>
            </Box>
        </div>)
}