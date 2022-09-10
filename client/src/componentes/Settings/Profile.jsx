import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userImg from '../../user.png'
import s from './Profile.module.css'
//IMPORT DE MATERIAL UI
import Typography from "@mui/material/Typography";
import { useAuth } from "../../context/authContext";
import { Box } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Profile() {
  const { user } = useAuth();
  const estado = useSelector((state) => state.filter);
  const navigate = useNavigate();

  return (
      <Box className={s.boxUno}>
        {user?.email === null ? (
          <Box sx={{ display: "flex" }}>
            No tienes acceso a estos datos ya que ingresaste como un usuario
            anonimo. Ve a la seccion de registrar para poder utilizar estos
            servicios.
            <Link to="/register">Registrarse</Link>
          </Box>
        ) : estado.length === 0 ? navigate("/settings/edit") : (
         
          <Box
            variant="section"
            className={s.boxDos}
          >
              <Box className={s.boxTres}>
                <img
                  className={s.imagen}
                  src={estado[0].img ? estado[0].img : userImg}
                  alt="Profile"
                />
                <Box className={s.boxCuatro}>
                  <LocationOnIcon sx={{fontSize:'1.8rem'}}/>
                  <Typography variant="h6">
                    {estado[0].location}
                  </Typography>
                </Box>
              </Box>
              
              <Box className={s.boxCinco}>
              <Box
                className={s.boxSeis}
                variant="div"
              >
                <Typography variant="h4">
                  {
                  estado[0].firstName[0].toUpperCase().concat(estado[0].firstName.slice(1))
                  }
                
                {' '}
                
                  {
                  estado[0].lastName[0].toUpperCase().concat(estado[0].lastName.slice(1))
                  }</Typography>
              </Box>
              <Typography className={s.description} variant="h6">{estado[0].description}</Typography>

              </Box>
             
            </Box>
        ) }
      </Box>
    );
  

}
