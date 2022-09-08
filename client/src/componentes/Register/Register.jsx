import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions";
import { CLODUNIARY_API } from "../../Secret/Secret.js";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, Typography, TextField } from "@mui/material";
import camera from "../../pngwing.com.png";
import Nav from "../landing/LandingNav";
import toast, { Toaster } from "react-hot-toast";

function validate(user) {
  let error = {};

  if (!user.firstName) error.name = "Debes ingresar un nombre";
  else if (!/^[a-z ñ]+$/i.test(user.firstName))
    error.name = "El nombre no puede contener numeros ni caracteres especiales";
  //ERROR APELLIDO
  else if (!user.lastName) error.lastname = "Debes ingresar un apellido";
  else if (!/^[a-z ñ]+$/i.test(user.lastName))
    error.lastname =
      "El apellido no puede contener numeros ni caracteres especiales";
  //ERROR FECHA DE NACIMIENTO
  else if (!user.birthDate)
    error.birthDate = "Debes ingresar una fecha de nacimiento";
  else if (user.birthDate < 18)
    error.birthDate =
      "Para registrarte a esta plataforma debes ser mayor de 18 años";
  // ERROR UBICACION
  else if (!/^[a-z ñ , ]+$/i.test(user.location)) error.location = 'La direccion debe ser valida'     
  //ERROR EMAIL
  else if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(user.email))
    error.email = "El formato ingresado es invalido";
  //ERROR PASSWORD
  else if (
    !/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(
      user.password
    )
  )
    error.password =
      "La contraseña debe tener mas de 6 caracteres, al menos un digito, al menos un minuscula, al menos una mayuscula y al menos un caracter no alfanumerico";

  return error;
}

export default function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    img: "",
    password: "",
    description: '',
    location: '',
  });
  const [boton, setBoton] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [fire, setFire] = useState("");

  const handleOnChange = async (e) => {
    e.preventDefault();

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...user,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleImage = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "changApp");

      const cloudinary = await axios.post(CLODUNIARY_API, data);

      setUser({
        ...user,
        img: cloudinary.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      !error.firstName &&
      !error.lastName &&
      !error.birthDate &&
      !error.img &&
      !error.email &&
      !error.password &&
      !error.location &&
      user.firstName &&
      user.lastName &&
      user.birthDate &&
      user.email &&
      user.password &&
      user.location
    ) {
      setBoton(true);
    } else {
      setBoton(false);
    }
  }, [error, user]);

  const handleOnSubmit = async (e) => {
    e.preventDefault(e);
    try {
      await signUp(user.email, user.password);
      dispatch(registerUser(user));
      toast('Registro completado', {
        icon: '👏',
      });
      setTimeout(() => {
        navigate('/home')
      }, 2000);
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setFire("La contraseña tiene que tener al menos 6 caracteres");
      }
      if (error.code === "auth/email-already-in-use") {
        setFire("El email ya se encuentra registrado");
      }
    }
  };

  const styles = {
    container: {
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#E5E7EB",
      color: "#1F2937",
    },
    containerForm: {
      width: "40%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "solid 3px lightblue",
      borderRadius: "15px",
      padding: "35px",
    },
    box: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      alignItems: "center",
      marginBottom: "15px",
    },
    input: {
      width: "100%",
      margin: "3px 0",
    },
    imgInput: {
      width: "100%",
      display: "none",
    },
  };

  return (
    <div>
      <Nav />
      <Toaster position="top-center" reverseOrder={false} />
      <Box style={styles.container}>
        <Box style={styles.containerForm}>
          <Typography variant="h4" sx={{ padding: "10px" }}>
            Registrarse
          </Typography>
          {fire && <p>{fire}</p>}
          <form style={styles.form} onSubmit={(e) => handleOnSubmit(e)}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Foto de Perfil: </Typography>
              <label for="inputTag">
                <img
                  style={{ width: "60px", height: "60px", cursor: "pointer" }}
                  src={user.img !== "" ? user.img : camera}
                  alt=""
                />
                <input
                  id="inputTag"
                  style={styles.imgInput}
                  type="file"
                  accept="image/jpeg, image/png" 
                  name="img"
                  onChange={handleImage}
                />
              </label>
            </Box>
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              style={styles.input}
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleOnChange}
            />
            {error.name && <p>{error.name}</p>}

            <TextField
              id="outlined-basic"
              label="Apellido"
              variant="outlined"
              style={styles.input}
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleOnChange}
            />
            {error.lastname && <p>{error.lastname}</p>}

            <TextField
              id="outlined-basic"
              label="Edad"
              variant="outlined"
              style={styles.input}
              type="number"
              name="birthDate"
              value={user.birthDate}
              onChange={handleOnChange}
            />
            {error.birthDate && <p>{error.birthDate}</p>}
          
            <TextField
              id="outlined-basic"
              label="Descripcion"
              variant="outlined"
              style={styles.input}
              type="textarea"
              name="description"
              value={user.description}
              onChange={handleOnChange}
            />  

<TextField
              id="outlined-basic"
              label="Ubicacion"
              variant="outlined"
              style={styles.input}
              type="textarea"
              name="location"
              value={user.location}
              onChange={handleOnChange}
            /> 
             {error.location && <p>{error.location}</p>}

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
            {error.email && <p>{error.email}</p>}

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
            {error.password && <p>{error.password}</p>}
            <p>Al hacer clic en Registrarte, aceptas las Condiciones, la Política de privacidad y la Política de cookies.</p>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button variant="outlined" type="submit" disabled={!boton}>
                Registrarse
              </Button>
              <Link style={{ textDecoration: "none" }} to="/login">
                <Button variant="contained">Volver</Button>
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
}
