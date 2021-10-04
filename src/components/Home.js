import React, {useEffect, useState} from 'react'
import Card from './Card'
import style from '../styles/Home.module.css'

import {
  getTrendingToday,
  getNowPlaying
} from '../services/movie'

import { useTitle } from 'react-use'
import {useDispatch} from 'react-redux'

import {setPage} from '../reducers/pageReducer'

function Home() {
  const [trending, setTrending] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const dispatch = useDispatch()
  useTitle('Home')

  useEffect(() => {
    getData()
    dispatch(setPage('Home'))
    return () => {
      setTrending([])
      setNowPlaying([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = () => {
    getTrendingToday().then(res => setTrending(res.results))
    getNowPlaying().then(res => setNowPlaying(res.results))
  }

  return (
    <div className={`container ${style.container}`}>
      
      <h5 className="fw-bolder text-decoration-underline">Trending Movies</h5>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {trending?.slice(0, 6).map(movie => 
            <Card key={movie.id} id={movie.id} title={movie.title} name={movie.name} poster={movie.poster_path}/>
          )}
      </div>

      <h5 className="fw-bolder text-decoration-underline my-4">Now Playing</h5>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {nowPlaying?.slice(0, 6).map(movie => 
            <Card key={movie.id} id={movie.id} title={movie.title} name={movie.name} poster={movie.poster_path}/>
          )}
      </div>

    </div>
  )
}

export default Home
