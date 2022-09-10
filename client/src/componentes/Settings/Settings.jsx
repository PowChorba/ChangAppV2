import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect} from "react";
import { NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Navbar from "../PrivateRoute/Navbar";
import Footer from "../Footer";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useSelector, useDispatch } from "react-redux";
import { getUserEmail, allNotifications, getAllReviews, allRequest, getAllServices } from "../../redux/actions";
import CircularProgress from '@mui/material/CircularProgress';
import CompleteProfile from "./AuxEditProfile/CompleteProfile";
import s from './Settings.module.css'


export default function Settings(id) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth();

  const userData = useSelector(state => state.filter)[0];
  const Notifications = useSelector(state => state.allNotifications)
  const totalNotifications = Notifications.filter(e => e.userNotificated_id === userData?.id).length;
  const totalServices = userData?.services ? userData?.services.length : 0;
  let totalRequestsReceived = 0;
  userData?.services?.forEach((e) => totalRequestsReceived += e.request.length);
  const totalRequestsMade = userData?.requester.length;
  const totalReviews = userData?.reviews.length;

  //PARA QUE NO EXPLOTE Y SE RECARGUE MUCHAS VECES
  const userDb = useSelector(state => state.filter)

  useEffect(() => {
    dispatch(allNotifications())
    dispatch(getAllReviews())
    dispatch(getAllServices())
    dispatch(allRequest())  
    dispatch(getUserEmail(user?.email));

  }, [dispatch, user?.email]);
 
  const handleClick = (e) => {
    e.preventDefault()
    logout()
    navigate('/')
  }

  const handleSelected = ({ isActive }) => {
    return{
      
      color: isActive ? "#E5E7EB" : '#1F2937',
      backgroundColor: isActive ? '#1976d2' : "#fff",
      textDecoration: isActive ? 'none' : 'none'
      
    }
  }

  if(userDb.length === 0 && user?.emailVerified === true){
    return (
      <div>
        <Navbar/>
        <div>
          <CompleteProfile/>
        </div>
        <Footer/>
      </div>)
  }
  if (userDb.length === 0)
    return (
      <div style={{backgroundColor: 'rgba(0, 0, 0, 0.644)'}}>
        <Navbar />
      <div style={{display:'flex' ,height: '80vh', alignItems:'center', justifyContent: 'center'}}>
        <CircularProgress />
      </div>
        <Footer />
      </div>
    );
  return (
    <Box>

      <Navbar />
        <Box className={s.container} variant='section'>
            <Box className={s.contenedorNavLinks}>
              
              <NavLink className={s.links} to='/home'>
                <Box className={s.boxAdentro}>
                  <HomeIcon className={s.icons} fontSize='large'/>
                  <Typography className={s.listText}>Ir al inicio</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} id='profile'  to="profile">
                <Box className={s.boxAdentro}>
                  <AccountBoxIcon id="profileIcon" className={location?.pathname === '/settings/profile' ? s.icons2 : s.icons} fontSize='large'/>
                  <Typography className={s.listText}>Perfil</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)}  to="edit">
                <Box className={s.boxAdentro}>
                  <EditIcon id="editIcon" className={location?.pathname === '/settings/edit' ? s.icons2 : s.icons} fontSize='large'/>
                  <Typography className={s.listText}>Editar Perfil</Typography>
                </Box>
              </NavLink>
              
              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='notifications'>
                <Box className={s.boxAdentro}>
                  <NotificationsIcon id="notificationsIcon" className={location?.pathname === '/settings/notifications' ? s.icons2 : s.icons} fontSize='large'/>
                  <Typography className={s.listText}>Notificaciones</Typography>
                  <label className={s.lengthCosas} htmlFor="">{totalNotifications >= 99 ? `+${99}` : totalNotifications}</label>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='services'>
                <Box className={s.boxAdentro}>
                  <WorkIcon id="servicesIcon" className={location?.pathname === '/settings/services' ? s.icons2 : s.icons} fontSize='large'/>
                  <Typography className={s.listText}>Servicios publicados</Typography>
                  <label className={s.lengthCosas} htmlFor="">{totalServices}</label>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='reviews'>
                <Box className={s.boxAdentro}>
                  <RateReviewIcon id="servicesIcon" className={location?.pathname === '/settings/reviews' ? s.icons2 : s.icons} fontSize='large'/>
                  <Typography className={s.listText}>Reseñas</Typography>
                  <label className={s.lengthCosas} htmlFor="">{totalReviews}</label>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='request'>
                <Box className={s.boxAdentro}>
                  <EmailIcon id="requestIcon" className={location?.pathname === '/settings/request' ? s.icons2 : s.icons} fontSize='large'/>
                  <Typography className={s.listText}>Solicitudes recibidas</Typography>
                  <label className={s.lengthCosas} htmlFor="">{totalRequestsReceived}</label>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='requester'>
                <Box className={s.boxAdentro}>
                  <SendIcon id="requesterIcon" className={location?.pathname === '/settings/requester' ? s.icons2 : s.icons} fontSize='large'/>
                  <Typography className={s.listText}>Solicitudes enviadas</Typography>
                  <label className={s.lengthCosas} htmlFor="">{totalRequestsMade}</label>
                </Box>
              </NavLink>

              <Divider variant="inset" />

                <Box className={s.boxAdentro} onClick={handleClick}>
                  <LogoutIcon className={s.icons} fontSize='large'/>
                  <Typography className={s.listText}>Cerrar Sesion</Typography>
                </Box>
            </Box>
            

            <Outlet />
        </Box>
      {/* <Footer/> */}
    </Box>
);
}
