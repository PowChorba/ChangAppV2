import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Nav from "../landing/LandingNav";
import { Link } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";

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

  const styles = {
    container: {
      height:`calc(100vh - 62px)`,
    },
    containerForm: {
      height:'100%',
      width:'100%',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    },
    containerReset: {
      width:'40%',
      padding:'35px',
      display:'flex', 
      flexDirection:'column', 
      alignItems:'center', 
      justifyContent:'center',
      gap:'20px',
      border: "solid 3px lightblue",
      borderRadius: "15px",
    },
    input: {
      width:'100%'
    },
    containerButtons: {
      width:'100%',
      display:'flex',
      justifyContent:'space-around'
    }
  }

  return (
    <Box style={styles.container}>
      <Nav />
      <Box style={styles.containerForm}>
      <Box style={styles.containerReset}>
        <Typography variant='h4'>Recuperar constraseña</Typography>
        <TextField
          id="outlined-basic"
          label="Ingresa un email"
          variant="outlined"
          style={styles.input}
          type="email"
          name="name"
          value={email}
          onChange={handleChange}
        />
        <Box style={styles.containerButtons}>
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
