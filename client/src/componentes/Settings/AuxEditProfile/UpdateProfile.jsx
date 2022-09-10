import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { postNotification, updateUser} from "../../../redux/actions";
import axios from "axios";
import { CLODUNIARY_API } from "../../../Secret/Secret";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import camera from "../../../pngwing.com.png";
import toast, {Toaster} from 'react-hot-toast'
import EditIcon from '@mui/icons-material/Edit';
import s from './UpdateProfile.module.css'


function validate(input) {
  let error = {};

  if (!/^[a-z ñ]+$/i.test(input.firstName))
    error.firstName = "El nombre solo puede contener letras";
  else if (!/^[a-z ñ]+$/i.test(input.lastName))
    error.lastName = "El apellido solo puede contener letras";
  // else if(/^[a-z ñ]+$/i.test(input.phone)) error.phone = 'Numero de telefono invalido, solo puedes agregar numeros'

  return error;
}

export default function UpdateProfile() {
  const { user } = useAuth();
  //ESTADO PARA ACTUALIZAR
  const estado = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    img: "",
    firstName: "",
    lastName: "",
    description: "",
    location: "",
  });
  const [setError] = useState("");
  const [btn, setBtn] = useState(false);
  const dispatch = useDispatch();
  //PARA MANDAR UNA NOTIFICACION AUTOMATICA
  const [noti] = useState({
    message: `Perfil actualizado.`,
    userNotification_id: estado[0]?.id,
    userNotificated_id: estado[0]?.id,
  });
  //PARA TRAER LA DATA DESDE LA BASE DE DATOS

  // PARA MANEJAR LOS NUEVOS DATOS INGRESADOS
  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
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
      setInput({
        ...input,
        img: cloudinary.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // PARA GUARDAR LOS CAMBIOS
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.img === "") input.img = estado[0].img;
    if (input.lastName === "") input.lastName = estado[0].lastName;
    if (input.firstName === "") input.firstName = estado[0].firstName;
    if (input.description === "") input.description = estado[0].description;
    if (input.location === "") input.location = estado[0].location;

    dispatch(updateUser(user?.email, input));
    dispatch(postNotification(noti));
    toast.success("Cambios guardados con exito");
    setTimeout(() => {
      navigate("/settings/profile");
    }, 2000);
  };

  //PARA CONTROLAR QUE SI NO INGRESO NINGUN DATO NO PUEDA GUARDAR LOS CAMBIOS
  useEffect(() => {
    if (
      input.img ||
      input.firstName ||
      input.lastName ||
      input.location ||
      input.description
    ) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [input]);

  return (
    <Box className={s.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
          <Box>
          <Box className={s.relative}>
            <label className={s.editImg} htmlFor="inputTag">
              <img
                className={s.imgStyle}
                src={
                  input.img
                    ? input.img
                    : estado[0].img !== ""
                    ? estado[0].img
                    : camera
                }
                alt=""
              />
              <EditIcon className={s.editIcon} />
              <input
                id="inputTag"
                className={s.imgInput}
                type="file"
                accept="image/jpeg"
                name="img"
                onChange={handleImage}
              />
            </label>
          </Box>
            <Box
              className={s.boxDos}
            >
              <Typography className={s.formLabel}>Nombre:</Typography>
              <TextField
                type="text"
                value={input.firstName} 
                placeholder={estado[0].firstName}
                name="firstName"
                onChange={handleChange}
              />
            </Box>
            <Box
              className={s.boxDos}
            >
              <Typography className={s.formLabel}>Apellido:</Typography>
              <TextField
                type="text"
                placeholder={estado[0].lastName}
                value={input.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </Box>
            <Box
              className={s.boxDos}
            >
              <Typography className={s.formLabel}>Localidad:</Typography>
              <TextField
                type="textArea"
                placeholder={estado[0].location}
                value={input.location}
                name="location"
                onChange={handleChange}
              />
            </Box>
          </Box>
        <Box className={s.bottomSection}>
          <Typography className={s.formLabel}>Descripción:</Typography>
          <textarea
            className={s.textArea}
            // rows='5'
            // cols='60'
            type="text"
            placeholder={estado[0].description}
            value={input.description}
            name="description"
            onChange={handleChange}
          />
        </Box>
        <Button type="submit" disabled={btn}>
          Guardar Cambios
        </Button>
      </form>
    </Box>
  );
}
