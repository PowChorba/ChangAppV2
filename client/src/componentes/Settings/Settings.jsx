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
      backgroundColor: isActive ? '#1F2937' : "#E5E7EB",
      textDecoration: isActive ? 'none' : 'none'
      
    }
  }

  const styles={
    container:{
      display:'flex', 
      width:'100%', 
      alignItems:'start', 
      justifyContent:'center', 
      gap:'20px',
      backgroundColor: "#E5E7EB",

    },
    links:{
      
      textDecoration:'none',
      color:"#1F2937",
    },
    icons:{
      fontSize:'2.5rem',
      padding:'0 0 0 4%',
      color:"#1F2937"
    },
    icons2:{
      fontSize:'2.5rem',
      padding:'0 0 0 4%',
      color:"#fff"
    },
    listText:{
      fontWeight:'bold',
      fontSize:'1.2rem',
      padding:'3.5%',
      width:'80%'
    },
    selected:{
      color:'red'
    },
    
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
        <Box style={styles.container} variant='section'>
            <Box sx={{display:'flex',width:'30%', flexDirection:'column', borderRight:'solid grey 1px', padding:'10px 0 20px 0', fontSize:'1.2rem'}}>
              
              <NavLink style={styles.links} to='/home'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <HomeIcon style={styles.icons}/>
                  <Typography style={styles.listText}>Ir al inicio</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} id='profile'  to="profile">
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <AccountBoxIcon id="profileIcon" style={location?.pathname === '/settings/profile' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Perfil</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)}  to="edit">
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <EditIcon id="editIcon" style={location?.pathname === '/settings/edit' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Editar Perfil</Typography>
                </Box>
              </NavLink>
              
              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='notifications'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <NotificationsIcon id="notificationsIcon" style={location?.pathname === '/settings/notifications' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Notificaciones</Typography>
                  <label style={{width:'20%', textAlign:'right', padding:'0 4%', fontWeight:'bold', cursor:'pointer'}} htmlFor="">{totalNotifications >= 99 ? `+${99}` : totalNotifications}</label>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='services'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <WorkIcon id="servicesIcon" style={location?.pathname === '/settings/services' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Servicios publicados</Typography>
                  <label style={{width:'20%', textAlign:'right', padding:'0 4%', fontWeight:'bold'}} htmlFor="">{totalServices}</label>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='reviews'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <RateReviewIcon id="servicesIcon" style={location?.pathname === '/settings/reviews' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Reseñas</Typography>
                  <label style={{width:'20%', textAlign:'right', padding:'0 4%', fontWeight:'bold'}} htmlFor="">{totalReviews}</label>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='request'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <EmailIcon id="requestIcon" style={location?.pathname === '/settings/request' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Solicitudes recibidas</Typography>
                  <label style={{width:'20%', textAlign:'right', padding:'0 4%', fontWeight:'bold'}} htmlFor="">{totalRequestsReceived}</label>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='requester'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <SendIcon id="requesterIcon" style={location?.pathname === '/settings/requester' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Solicitudes enviadas</Typography>
                  <label style={{width:'20%', textAlign:'right', padding:'0 4%', fontWeight:'bold'}} htmlFor="">{totalRequestsMade}</label>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              {/* <NavLink style={styles.links} to='/login' > */}
                <Box sx={{display:'flex', alignItems:'center'}} onClick={handleClick}>
                  <LogoutIcon style={styles.icons}/>
                  <Typography style={styles.listText}>Cerrar Sesion</Typography>
                </Box>
              {/* </NavLink> */}
            </Box>
            

            <Outlet />
        </Box>
      <Footer/>
    </Box>
);
}
