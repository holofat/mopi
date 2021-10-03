/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import style from '../styles/Card.module.css'

import noImage from './img/no_image.png'

import {BsHeart, BsHeartFill} from "react-icons/bs"

import _ from 'lodash'

import {useSelector} from 'react-redux'
import { Instagram } from 'react-content-loader'
import {useSubscription, useMutation} from '@apollo/client'

import {addFavoriteQuery, addWatchlistQuery, getFavoriteQuery, getWatchlistQuery, removeFavoriteQuery, removeWatchlistQuery} from '../services/graphqlQuery'
import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'


function Card({id, title, poster}) {
  const img = poster ? `https://image.tmdb.org/t/p/w500${poster}` : noImage
  const user = useSelector(state => state.user)
  const {data, loading} = useSubscription(getFavoriteQuery, {variables: {id: user}})
  const {data:watchList, loading:watchlistLoading} = useSubscription(getWatchlistQuery, {variables: {id: user}})

  const [addFavorite] = useMutation(addFavoriteQuery)
  const [removeFavorite] = useMutation(removeFavoriteQuery)
  const [addWatchlist] = useMutation(addWatchlistQuery)
  const [removeWatchlist] = useMutation(removeWatchlistQuery)

  const userInfo = {
    id_movie: id,
    id_user: user,
    title: title,
    poster: poster
  }


  const [checkFav, setCheckFav] = useState()
  const [checkWatchlist, setCheckWatchlist] = useState()

  useEffect(() => {
    const list = data?.fav_movie
    setCheckFav(_.find(list, ["id_movie", id]))
  }, [data])

  useEffect(() => {
    const list = watchList?.watchlist
    setCheckWatchlist(_.find(list, ["id_movie", id]))
  }, [watchList])


  if(loading && watchlistLoading) return <Instagram/>

  const loginFirst = text => {
    Swal.fire({
      text: `You must be login first before add this to your ${text}`,
      icon: "info",
      showCloseButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Login'
    }).then((result) => {
      if (result.isConfirmed) {
        return <Redirect to="/login"/>
      }
    })
  }

  const handleFavorite = () => {
    if(user){
      if(!checkFav){
        addFavorite({variables: userInfo})
      }else{
        removeFavorite({variables: userInfo})
      }
    } else{
        loginFirst('favorite')
    }
  }

  const handleWatchlist = () => {
    if(user){
      if(!checkWatchlist){
        addWatchlist({variables: userInfo})
      } else{
        removeWatchlist({variables: userInfo})
      }
    } else{
      loginFirst('watchlist')
    }
  }

  return (
    <div className={`${style.col} col`}>
      <div className={`card shadow-sm ${style.card}`}>
        <img className="bd-placeholder-img card-img-top" alt={title} width="100%" height="300" src={img}/>
        <button className={style.favorite} onClick={handleFavorite}>
          {!checkFav && <BsHeart style={{color:'red', width: '32px', height: '32px'}}/>}
          {checkFav && <BsHeartFill style={{color:'red', width: '32px', height: '32px'}}/>}
        </button>
        <h6 className="m-1" style={{'textOverflow':'ellipsis', whiteSpace:'nowrap', overflow: 'hidden'}}><a href={`/detail/${id}`} style={{color:'black'}}>{title}</a></h6>
        <button className={`btn w-auto ${!checkWatchlist && 'btn-primary'} ${checkWatchlist && 'btn-dark'} position-absolute`} onClick={handleWatchlist} style={{bottom: '10px'}}>
          {!checkWatchlist && 'Add to Watchlist'}
          {checkWatchlist && 'Added to Watchlist'}
        </button>
      </div>
    </div>
  )
}

export default Card
