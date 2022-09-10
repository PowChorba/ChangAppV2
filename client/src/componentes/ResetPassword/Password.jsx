import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Nav from "../landing/LandingNav";
import { Link } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";
import s from './Password.module.css'

export default function Password() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) setError("Debes ingresar un email");
    try {
      await resetPassword(email);
      setError(
        "Email enviado correctamente, verifica tu casilla de correo. Redireccionando al inicio..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box className={s.container}>
      <Nav />
      <Box className={s.containerForm}>
      <Box className={s.containerReset}>
        <Typography variant='h4'>Recuperar constraseña</Typography>
        <TextField
          id="outlined-basic"
          label="Ingresa un email"
          variant="outlined"
          className={s.input}
          type="email"
          name="name"
          value={email}
          onChange={handleChange}
        />
        <Box className={s.containerButtons}>
          <Button variant='contained' type="button" onClick={handleReset}>
            Enviar
          </Button>
          {error && <Typography>{error}</Typography>}
        
          <Link style={{textDecoration:'none'}} to='/login'>
            <Button variant='contained'>Volver</Button>
          </Link>
        </Box>        
        
      </Box>
      </Box>
      
    </Box>
  );
}
