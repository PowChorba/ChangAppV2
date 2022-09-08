/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions/index.js";
import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

const imgDef =
  "https://1.bp.blogspot.com/-OONwIqLJAE0/YCH249Alt2I/AAAAAAAAIzQ/7moXO_wK3pMxyug7CTWW6qZWb05sV3MAACNcBGAsYHQ/s16000/trabajos-mas-demandados-en-brasil-en-2021.jpg";

export default function ServiceDetail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  var service = useSelector((state) => state.serviceDetail);

  const styles = {
    container:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width:'100vw',
      backgroundColor: '#E5E7EB',
      color: '#1F2937'
    },
    containerDetail:{
      width: '40%'
    },
    box:{
      display:'flex'
    }
  }

  return (
    <Box style={styles.container}>
      <Box style={styles.containerDetail}>
          <Typography sx={{textAlign:'center'}} variant="h4">{service.name}</Typography>
          <img style={{width:'100%'}} src={service.img ? service.img : imgDef} alt="Not found"></img>
          <Box style={styles.box}>
            <Typography variant="h7">Description: </Typography>
            <Typography variant="h7">{service.description}</Typography>
          </Box>
          <Box style={styles.box}>
            <Typography variant="h7">{`Price: $${service.price}`} </Typography>
          </Box>
          <Box style={styles.box}>
            <Typography variant="h7">{`Rating: ${service.rating}`} </Typography>
          </Box>
          <Box style={styles.box}>
            <Typography variant="h7">Reviews: </Typography>
            <Typography variant="h7">{service.review}</Typography>
          </Box>
          <Box sx={{display:'flex', justifyContent:'center'}}>
            <Button>
              <Link style={{textDecoration:'none'}} to="/home">
                <label style={{color:'#1F2937'}}>Back to Home</label>
              </Link>
            </Button>
          </Box>
      </Box>
    </Box>
  );
}
