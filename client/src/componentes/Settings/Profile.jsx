import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserEmail } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "../css/profile.css";
import userImg from '../../user.png'
//IMPORT DE MATERIAL UI
import Typography from "@mui/material/Typography";
import { useAuth } from "../../context/authContext";
import { Box } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Profile() {
  const { user } = useAuth();
  const estado = useSelector((state) => state.filter);
  const navigate = useNavigate();
  

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUserEmail(user?.email));
  // }, [dispatch, user?.email]);



    return (
      <Box sx={{ width: "70%" }}>
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
            sx={{ display:'flex', padding:'10%' }}
          >
              <Box sx={{width:'30%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <img
                  style={{ width: '150px'}}
                  src={estado[0].img ? estado[0].img : userImg}
                  alt="Profile"
                />
                <Box sx={{display:'flex', justifyContent:'center', padding:'4%'}}>
                  <LocationOnIcon sx={{fontSize:'1.8rem'}}/>
                  <Typography variant="h6">
                    {estado[0].location}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{width:'70%', display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
              <Box
                sx={{ display: "flex", gap: "20px", padding:'5px 20px', borderBottom:'solid black 1px' }}
                variant="div"
              >
                <Typography variant="h4">
                  {
                  estado[0].firstName[0].toUpperCase().concat(estado[0].firstName.slice(1))
                  }
                </Typography>
                <Typography variant="h4">
                  {
                  estado[0].lastName[0].toUpperCase().concat(estado[0].lastName.slice(1))
                  }</Typography>
              </Box>
              <Typography sx={{padding:'4%'}} variant="h6">{estado[0].description}</Typography>

              </Box>
             
            </Box>
        ) }
      </Box>
    );
  

}
