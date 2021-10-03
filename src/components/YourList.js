/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import { getFavoriteQuery, getWatchlistQuery } from '../services/graphqlQuery'
import { useSelector, useDispatch } from 'react-redux'
import { useSubscription } from '@apollo/client'
import Card from './Card'
import style from '../styles/Home.module.css'
import { useTitle } from 'react-use'
import {setPage} from '../reducers/pageReducer'

const YourList = () => {
  useTitle('Your List')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const {data, loading} = useSubscription(getFavoriteQuery, {variables: {id: user}})
  const {data:watchListData, loading:watchListLoading} = useSubscription(getWatchlistQuery, {variables: {id: user}})
  const [favList, setFavList] = useState([])
  const [watchList, setWatchlist] = useState([])

  useEffect(() => {
    dispatch(setPage('Your List'))
  }, [])

  useEffect(() => {
    setFavList(data?.fav_movie)
  }, [loading])

  useEffect(() => {
    setWatchlist(watchListData?.watchlist)
  }, [watchListLoading])

  return (
    <div className={`container ${style.container}`}>
      <h4><u>Your Favorite List</u></h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 my-4">
        {favList?.length === 0 && <><h5>You don't add a movie tou your favorite</h5></>}
        {favList?.length > 0 && favList?.map(movie => 
          <Card key={movie.id_movie} id={movie.id_movie} title={movie.title} poster={movie.poster}/>  
        )}
      </div>

      <h4><u>Your Watchlist</u></h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 my-4">
        {watchList?.length === 0 && <><h5>You don't add a movie tou your watchlist</h5></>}
        {watchList?.length > 0 && watchList?.map(movie => 
          <Card key={movie.id_movie} id={movie.id_movie} title={movie.title} poster={movie.poster}/>  
        )}
      </div>
    </div>
  )
}

export default YourList
