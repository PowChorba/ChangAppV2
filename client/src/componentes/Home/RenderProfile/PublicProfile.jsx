import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allUsers, getAllServices } from "../../../redux/actions";
import Footer from "../../Footer";
import Navbar from "../../PrivateRoute/Navbar";
import { Link } from "react-router-dom";
import {Rating, Dialog, Box, Button, Typography} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';



import CloseIcon from '@mui/icons-material/Close';


export default function PublicProfile() {
  let userServices = useSelector((state) => state.services);
  const allUser = useSelector((state) => state.users);
  const param = useParams();
  const dispatch = useDispatch();
  const filterUser = allUser.filter((n) => n.id === param.id);
  userServices = userServices.filter((e) => e.user?.id === param.id);
  const filtrarReviews = filterUser[0]?.reviews.slice(0, 2);
  //ESTADO PARA EL POP UP
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    dispatch(getAllServices());
    dispatch(allUsers());
  }, [dispatch]);

  const handleOnClic = (e) => {
    e.preventDefault();
    window.history.back();
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setBtn(!btn);
  };

  return (
    <Box sx={{backgroundColor:'#E5E7EB'}}>
      <Navbar />
      <Button sx={{margin:'2% 0 0 4%', backgroundColor:'#1F2937'}} variant='contained' onClick={handleOnClic}>Volver atras</Button>

      <Box sx={{display:'flex', padding:'0 2% 2% 2%', height: '75vh', alignContent: 'center'}}>
        <Box sx={{display:'flex', width:'50%', flexDirection:'column', padding:'2%'}}>
          <Box sx={{display:'flex', border:'solid grey 1px', borderRadius:'10px'}}>
            <Box sx={{display:'flex', flexDirection:'column'}}>
              <img style={{borderTopLeftRadius:'10px', borderBottomLeftRadius:'10px', height:'100%'}} src={filterUser[0]?.img} alt={filterUser[0]?.firstName} width='250px' hegiht='250px' />
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2%'}}>
              <Typography sx={{fontSize:'1.5rem'}}>{`${filterUser[0]?.firstName} ${filterUser[0]?.lastName}`}</Typography>
              <Typography sx={{fontSize:'1rem'}}>{filterUser[0]?.description}</Typography>
              <Typography sx={{fontSize:'1.2rem', display:'flex', alignItems:'center'}}><LocationOnIcon/>{filterUser[0]?.location}</Typography>
              
            </Box>
            
          </Box>

          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', padding:'10px',margin: '10px 0px',borderRadius: '10px', border:'solid grey 1px'}}>
          {
            filterUser[0]?.reviews?.length === 0 ? <Typography>Sin reseñas por el momento </Typography>
            : filtrarReviews?.map(e => {
              return(
                <Box sx={{display:'flex', flexDirection:'row', padding:'10px', margin:'5px 0', borderRadius:'10px', justifyContent:'space-between', width:'100%'}}>
                  <Typography>{e.message}</Typography>
                  <span><Rating defaultValue={e.rate} readOnly/></span>
                </Box>
              )
            })
          }
          <Button sx={{margin:'2%', backgroundColor:'#1F2937', display: filterUser[0]?.reviews?.length < 3 ? 'none' : 'block'}} variant='contained' onClick={handleOpen}>Ver mas</Button>
          <Dialog style={{padding:'0'}} open={btn}>
            <Box sx={{width:'300px', padding:'30px 80px', display:'flex', alignItems:'center', flexDirection:'column'}}>
              <Box sx={{width:'100%',display:'flex', justifyContent:'flex-end', float:'right'}}>
                <span style={{width:'30px'}} onClick={handleOpen}><CloseIcon/></span>
              </Box>
            {
              filterUser[0]?.reviews.map(r => {
                return(
                  <Box sx={{display:'flex', flexDirection:'row', border:'solid grey 1px', padding:'4%', margin:'2% 20%', borderRadius:'10px', justifyContent:'space-between', width:'100%'}}>
                    <Typography>{r.message}</Typography>
                    <span><Rating defaultValue={r.rate} readOnly/> </span>
                  </Box>
                )
              })
            }
            </Box>
          </Dialog>
          </Box>
        </Box>

        <Box sx={{display:'flex', flexDirection:'column', width:'50%', padding:'2%', gap:'20px'}}>
          
              {userServices &&
                userServices.map((s) => {
                  return (
                    <Box sx={{padding:'0 4% 0 0', display:'flex', justifyContent:'space-between', alignItems:'center',border:'solid grey 1px', borderRadius:'10px'}}>
                      <Box>
                        <img style={{height:'100%', width:'100px', borderTopLeftRadius:'10px', borderBottomLeftRadius:'10px'}} src={s.category?.img} alt="" />
                      </Box>
                      <Box sx={{height:'70%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                        <Typography sx={{fontSize:'1.2rem'}}>{s.name}</Typography>
                        <Typography sx={{fontSize:'1.2rem'}}>{`Precio: $${s.price}`}</Typography>
                      </Box>
                      <Link to={`/home/services/${s.id}`}>
                        <Button sx={{backgroundColor:'#1F2937'}} variant='contained'>Reservar</Button>
                      </Link>
                    </Box>
                  );
                })}

        </Box>
        
      </Box>

      <Footer />
    </Box>
  );
}
