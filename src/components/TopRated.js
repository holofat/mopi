import React, {useEffect, useState} from 'react'
import Card from './Card'
import style from '../styles/Home.module.css'

import {
  getTopRated
} from '../services/movie'

import { useTitle } from 'react-use'
import {useDispatch} from 'react-redux'

import {setPage} from '../reducers/pageReducer'

function TopRated() {
  useTitle('Top Rated')
  const [list, setList] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    getTopRated().then(res => setList(res.results))
    dispatch(setPage('Top Rated'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={`container ${style.container}`}>
      <h5 className="fw-bolder text-decoration-underline mb-3">Top Rated Movies</h5>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {list?.map(movie => 
            <Card key={movie.id} id={movie.id} title={movie.title} name={movie.name} poster={movie.poster_path}/>
          )}
      </div>
    </div>
  )
}

export default TopRated
