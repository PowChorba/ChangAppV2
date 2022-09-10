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
import s from "./Register.module.css";

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
  else if (!/^[a-z ñ , ]+$/i.test(user.location))
    error.location = "La direccion debe ser valida";
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
  const { signUp } = useAuth();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    img: "",
    password: "",
    description: "",
    location: "",
  });
  const [boton, setBoton] = useState(false);
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
      toast("Registro completado", {
        icon: "👏",
      });
      setTimeout(() => {
        navigate("/home");
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

  return (
    <div>
      <Nav />
      <Toaster position="top-center" reverseOrder={false} />
      <Box className={s.container}>
        <Box className={s.containerForm}>
          <Typography variant="h4" sx={{ padding: "10px" }}>
            Registrarse
          </Typography>
          {fire && <p>{fire}</p>}
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <Box className={s.boxUno}>
              <Typography variant="h6">Foto de Perfil: </Typography>
              <label for="inputTag">
                <img
                  style={{ width: "60px", height: "60px", cursor: "pointer" }}
                  src={user.img !== "" ? user.img : camera}
                  alt=""
                />
                <input
                  id="inputTag"
                  className={s.imgInput}
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
              className={s.input}
              style={{margin: '10px'}}
              type="text"
              name="firstName"
              value={user.firstName}
              error={error.name}
              onChange={handleOnChange}
            />
            {error.name && <p className={s.error}>{error.name}</p>}

            <TextField
              id="outlined-basic"
              label="Apellido"
              variant="outlined"
              className={s.input}
              style={{margin: '10px'}}
              type="text"
              name="lastName"
              value={user.lastName}
              error={error.lastname}
              onChange={handleOnChange}
            />
            {error.lastname && <p className={s.error}>{error.lastname}</p>}

            <TextField
              id="outlined-basic"
              label="Edad"
              variant="outlined"
              className={s.input}
              style={{margin: '10px'}}
              type="number"
              name="birthDate"
              value={user.birthDate}
              error={error.birthDate}
              onChange={handleOnChange}
            />
            {error.birthDate && <p className={s.error}>{error.birthDate}</p>}

            <TextField
              id="outlined-basic"
              label="Descripcion"
              variant="outlined"
              className={s.input}
              style={{margin: '10px'}}
              type="textarea"
              name="description"
              value={user.description}
              error={error.description}
              onChange={handleOnChange}
            />

            <TextField
              id="outlined-basic"
              label="Ubicacion"
              variant="outlined"
              className={s.input}
              style={{margin: '10px'}}
              type="textarea"
              name="location"
              value={user.location}
              error={error.location}
              onChange={handleOnChange}
            />
            {error.location && <p className={s.error}>{error.location}</p>}

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className={s.input}
              style={{margin: '10px'}}
              type="email"
              name="email"
              value={user.email}
              error={error.email}
              onChange={handleOnChange}
            />
            {error.email && <p className={s.error}>{error.email}</p>}

            <TextField
              id="outlined-basic"
              label="Contraseña"
              variant="outlined"
              className={s.input}
              style={{margin: '10px'}}
              type="password"
              name="password"
              value={user.password}
              error={error.password}
              onChange={handleOnChange}
            />
            {error.password && <p className={s.error}>{error.password}</p>}
            <p>
              Al hacer clic en Registrarte, aceptas las Condiciones, la Política
              de privacidad y la Política de cookies.
            </p>
            <Box className={s.boxUno}>
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
