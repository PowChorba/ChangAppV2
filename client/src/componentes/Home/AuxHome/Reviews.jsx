import { Box, Rating, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews } from '../../../redux/actions'
import s from './Reviews.module.css'

export default function Reviews() {
    const dispatch = useDispatch()
    let allReviews = useSelector(state => state.reviews)
    allReviews = allReviews.sort(() => Math.random() - 0.5)
    allReviews = allReviews.slice(0,5)

    useEffect(() => {
      dispatch(getAllReviews())
    }, [dispatch])

  return (
    <Box className={s.contenedor}>
      <div className={s.divEnunciado}>
        <h2 className={s.enunciado}>Algunos comentarios de nuestros Usuarios</h2>
      </div>
      <div className={s.contenedorCards}>

      {
        allReviews && allReviews.map(rev => {
          return (
            <Box className={s.reviewCard} key={rev.id}>
            {rev.user?.img ? (
                <img src={rev.author?.img} alt="?" className={s.avatar}/>
              ) : (
                "?"
                )}
          <div className='rev-dataUser'>
            <h4>
              {rev.author?.firstName}
            </h4>
                <Rating defaultValue={rev.rate} readOnly/> 
          </div>
              <Typography>
            ¨{rev.message}¨
              </Typography>
            </Box>
          )
        })
      }
      </div>

    </Box>
  )
}
