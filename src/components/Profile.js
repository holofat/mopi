/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import style from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../reducers/pageReducer'
import { useTitle } from 'react-use'
import { Redirect } from 'react-router'
import { useQuery } from '@apollo/client'
import { getLatestFavoriteQuery, getLatestWatchlistQuery, getRatingLatestQuery, getUsersById } from '../services/graphqlQuery'
import Card from './Card'

const Profile = () => {
  const user = useSelector(state => state.user)
  useTitle('Profile')
  const dispatch = useDispatch()

  const {data} = useQuery(getUsersById, {variables: {id: user}})
  const {data:latestRatingData} = useQuery(getRatingLatestQuery, {variables: {id_user: user}})

  const {data:latestFavoriteData} = useQuery(getLatestFavoriteQuery, {variables: {id_user:user}})
  const {data:latestWatchlistData} = useQuery(getLatestWatchlistQuery, {variables: {id_user:user}})
  const [users, setUsers] = useState()
  const [latestRating, setLatestRating] = useState()
  const [latestWatchlist, setLatestWatchlist] = useState()
  const [latestFavorite, setLatestFavorite] = useState()

  const [profile, setProfile] = useState({
    email: '',
    username: ''
  })

  useEffect(() => {
    dispatch(setPage('Profile'))
  }, [])

  useEffect(() => {
    setLatestRating(latestRatingData?.ratings[0])
  }, [latestRatingData])
  
  useEffect(() => {
    setLatestFavorite(latestFavoriteData?.fav_movie[0])
  }, [latestFavoriteData])

  useEffect(() => {
    setLatestWatchlist(latestWatchlistData?.watchlist[0])
  }, [latestWatchlistData])

  useEffect(() => {
    setUsers(data?.users[0])
  }, [data])

  useEffect(() => {
    setProfile({email: users?.email, username: users?.username})
  }, [users])

  if(!user){
    return <Redirect to="/login"/>
  }


  return (
    <div className={`container my-4 ${style.container}`}>
      <div className="border-2 border-dark border-bottom">
        <h4>Your Profile</h4>
          <div className="form p-3">
            <label>Email</label>
            <div className="form form-control w-25">{profile.email}</div><br/>
            <label>Username</label>
            <div className="form form-control w-25">{profile.username}</div>
          </div>
      </div>
      <div className="border-2 border-dark border-bottom">
        <h4>Most Recent Rating</h4>
        You just give this {latestRating?.rating}/10
        <div className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 my-2">
          <Card title={latestRating?.title} poster={latestRating?.poster} id={latestRating?.id_movie} rating={latestRating?.rating}/>
        </div>
      </div>

      <div className="border-2 border-dark border-bottom">
        <h4>Most Recent Favorite</h4>
        <div className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 my-2">
          <Card title={latestFavorite?.title} poster={latestFavorite?.poster} id={latestFavorite?.id_movie}/>
        </div>
      </div>

      <div className="border-2 border-dark border-bottom">
        <h4>Most Recent Watchlist</h4>
        <div className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 my-2">
          <Card title={latestWatchlist?.title} poster={latestWatchlist?.poster} id={latestWatchlist?.id_movie}/>
        </div>
      </div>
    </div>
  )
}

export default Profile
