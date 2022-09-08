import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { getUserEmail, registerUser } from "../../../redux/actions";
import toast, {Toaster} from 'react-hot-toast'

function validate(fire) {
  let error = {};

  if (!fire.firstName) error.name = "Debes ingresar un nombre";
  else if (!/^[a-z ñ]+$/i.test(fire.firstName))
    error.name = "El nombre no puede contener numeros ni caracteres especiales";
  //ERROR APELLIDO
  else if (!fire.lastName) error.lastname = "Debes ingresar un apellido";
  else if (!/^[a-z ñ]+$/i.test(fire.lastName))
    error.lastname =
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
  
  //PARA TRAER LA DATA DE BASE DE DATOS
  // useEffect(() => {
  //   dispatch(getUserEmail(user?.email));
  // }, [dispatch, user?.email]);

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
    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', backgroundColor: "#E5E7EB"}}>
      <Box sx={{border:'solid grey 1px', width:'60%', padding:'0 4%', margin:'4%', display:'flex', flexDirection:'column', borderRadius:'10px'}}>
        <Typography sx={{padding:'6% 0', textAlign:'center'}} variant='h5'>Completar tus datos antes de seguir</Typography>
        <form style={{display:'flex',justifyContent:'center', flexDirection:'column'}} onSubmit={(e) => handleOnSubmit(e)}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <Typography sx={{fontSize:'1.3rem'}}>
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

              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <Typography sx={{fontSize:'1.3rem'}}>
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

              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <Typography sx={{fontSize:'1.3rem'}}>
                  Edad: 
                </Typography>
                <TextField
                  sx={{padding:'1%'}}                
                  type="text"
                  value={fire.birthDate}
                  name="birthDate"
                  onChange={handleOnChange}
                  />
              </Box>

              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <Typography sx={{fontSize:'1.3rem'}}>
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

              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <Typography sx={{fontSize:'1.3rem'}}>
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
