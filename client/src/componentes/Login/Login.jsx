import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../landing/LandingNav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { login, loginGoogle, loginFacebook } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("El usuario no esta registrado");
      } else if (error.code === "auth/wrong-password") {
        setError("Usuario o contraseña invalidos");
      }
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      await loginGoogle();
      navigate("/home");
    } catch (error) {
      setError("El e-mail ya se encuentra registrado");
    }
  };

  const handleFacebook = async (e) => {
    e.preventDefault();
    try {
      await loginFacebook();
      navigate("/home");
    } catch (error) {
      setError("El e-mail ya se encuentra registrado");
    }
  };

  const styles = {
    container: {
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E5E7EB",
      color: "#1F2937",
      height: "100vh",
    },
    login: {
      display: "flex",
      flexDirection: "column",
      width: "40%",

      alignItems: "center",
      border: "solid 3px lightblue",
      borderRadius: "15px",
      padding: "35px",
    },
    form: {
      width: "100%",
    },
    button: {
      width: "100%",
      margin: "10px 0",
    },
    input: {
      width: "100%",
      margin: "10px 0 10px 0",
    },
  };

  return (
    <div>
      <Nav />
      <Box style={styles.container}>
        <Box style={styles.login}>
          <Typography variant="h4" sx={{ marginBottom: "30px" }}>
            Login
          </Typography>
          <form style={styles.form} onSubmit={(e) => handleSumbit(e)}>
            {error && <p>{error}</p>}
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                style={styles.input}
                type="email"
                name="email"
                value={user.email}
                onChange={handleOnChange}
              />
              <TextField
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                style={styles.input}
                type="password"
                name="password"
                value={user.password}
                onChange={handleOnChange}
              />
              <Button variant="contained" style={styles.button} type="submit">
                Iniciar Sesion
              </Button>
            </Box>
          </form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography
              sx={{ textAlign: "center", fontWeight: "bold", margin: "0" }}
              mr={4}
              variant="h7"
            >
              ¿Aún no te has registrado?
            </Typography>
            <Link style={{ textDecoration: "none" }} to="/register">
              <Button style={styles.button} variant="contained">
                Registrar
              </Button>
            </Link>

            <Link
              style={{
                textDecoration: "none",
                color: "black",
                textAlign: "center",
                padding: "3px",
              }}
              to="/password"
            >
              <Typography
                sx={{ fontWeight: "bold", margin: "0" }}
                mr={4}
                variant="h7"
              >
                ¿Olvidaste la constraseña?
              </Typography>
            </Link>
          </Box>
          <Button
            sx={{
              backgroundColor: "#030303",
              color: "#E5E7EB",
              "&:hover": {
                color: "primary.main",
              },
            }}
            variant="outlined"
            startIcon={<GoogleIcon />}
            style={styles.button}
            onClick={handleGoogle}
          >
            Iniciar Sesion con Google
          </Button>
          <Button
            sx={{ backgroundColor: "#030303" }}
            variant="outlined"
            startIcon={<FacebookIcon />}
            style={styles.button}
            onClick={handleFacebook}
          >
            Iniciar Sesion con Facebook
          </Button>
        </Box>
      </Box>
    </div>
  );
}
