import React, {useEffect, useState} from 'react'

import Card from './Card'

import style from '../styles/Home.module.css'

import {getTrendingToday} from '../services/movie'

function Home() {
  const [trending, setTrending] = useState([])

  useEffect(() => {
    getTrendingToday().then(res => setTrending(res.results))
  }, [])
  console.log(trending)

  return (
    <div className={`container ${style.container}`} style={{"border":"1px solid red"}}>
      <h5 className="fw-bolder text-decoration-underline">Trending Movies</h5>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {trending?.slice(0, 6).map(movie => 
            <Card id={movie.id} name={movie.name} poster={movie.poster_path}/>
          )}
      </div>
    </div>
  )
}

export default Home
