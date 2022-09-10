import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { registerUser } from "../../../redux/actions";
import toast, {Toaster} from 'react-hot-toast'
import s from './CompleteProfile.module.css'

function validate(fire) {
  let error = {};

  if (!fire.firstName) error.name = "Debes ingresar un nombre";
  else if (!/^[a-z ñ]+$/i.test(fire.firstName))
    error.name = "El nombre no puede contener numeros ni caracteres especiales";
  //ERROR APELLIDO
  else if (!fire.lastName) error.lastname = "Debes ingresar un apellido";
  else if (!/^[a-z ñ]+$/i.test(fire.lastName))
    error.lastName =
      "El apellido no puede contener numeros ni caracteres especiales";
  //ERROR FECHA DE NACIMIENTO
  else if (!fire.birthDate)
    error.birthDate = "Debes ingresar una fecha de nacimiento";
  else if (fire.birthDate < 18)
    error.birthDate =
      "Para registrarte a esta plataforma debes ser mayor de 18 años";
  // ERROR UBICACION
  else if (!/^[a-z ñ , ]+$/i.test(fire.location))
    error.location = "La direccion debe ser valida";

  return error;
}

export default function CompleteProfile() {
  const { user } = useAuth();
  const [fire, setFire] = useState({
    email: "",
    img: "",
    firstName: "",
    lastName: "",
    description: "",
    birthDate: "",
    location: "",
  });
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  
  //PARA QUE NO PONGAN CUALQUIER INFORMACION
  useEffect(() => {
    if (
      fire.lastName &&
      fire.firstName &&
      fire.birthDate &&
      fire.location &&
      !error.birthDate &&
      !error.firstName &&
      !error.lastName &&
      !error.description &&
      !error.location
    ) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [fire, error]);
  //ESTOS HANDLES SON PARA EL CASO EN QUE LOGEA CON FACEBOOK O GOOGLE
  const handleOnChange = (e) => {
    e.preventDefault();
    setFire({
      ...fire,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...fire,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (fire.img === "") fire.img = user?.photoURL;
    if (fire.email === "") fire.email = user?.email;
    dispatch(registerUser(fire));
    toast.success('Datos recibidos exitosamente')
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  };
  return (
    <Box className={s.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <Box className={s.boxUno}>
        <Typography className={s.textoUno} variant='h5'>Completar tus datos antes de seguir</Typography>
        <form className={s.form} onSubmit={(e) => handleOnSubmit(e)}>
            <Box className={s.boxDos}>
                <Typography className={s.textoDos}>
                  Nombre: 
                </Typography>
                <TextField
                  sx={{padding:'1%'}}
                  type="text"
                  value={fire.firstName}
                  name="firstName"
                  onChange={handleOnChange}
                  />
              </Box>

              <Box className={s.boxDos}>
                <Typography className={s.textoDos}>
                  Apellido: 
                </Typography>
                <TextField
                  sx={{padding:'1%'}}                
                  type="text"
                  value={fire.lastName}
                  name="lastName"
                  onChange={handleOnChange}
                  />
              </Box>

              <Box className={s.boxDos}>
                <Typography className={s.textoDos}>
                  Edad: 
                </Typography>
                <TextField
                  sx={{padding:'1%'}}                
                  type="number"
                  value={fire.birthDate}
                  name="birthDate"
                  onChange={handleOnChange}
                  />
              </Box>

              <Box className={s.boxDos}>
                <Typography className={s.textoDos}>
                  Localidad: 
                </Typography>
                <TextField
                  sx={{padding:'1%'}}
                  type="text"
                  value={fire.location}
                  name="location"
                  onChange={handleOnChange}
                  />
              </Box>

              <Box className={s.boxDos}>
                <Typography className={s.textoDos}>
                  Descripción: 
                </Typography>
                <TextField
                  sx={{padding:'1%'}}
                  type="text"
                  value={fire.description}
                  name="description"
                  onChange={handleOnChange}
                  />
              </Box>

         
          <Button variant='contained' sx={{margin:'4% 30%'}} type="submit" disabled={btn}>
            Cargar Datos
          </Button>
        </form>
      </Box>
    </Box>

  );
}
