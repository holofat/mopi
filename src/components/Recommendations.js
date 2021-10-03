/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import _ from 'lodash'
import Card from './Card'
import style from '../styles/Home.module.css'

import {
  getRecommendations
} from '../services/movie'

import { getFavoriteListQUery } from '../services/graphqlQuery'

import { useTitle } from 'react-use'
import {useDispatch, useSelector} from 'react-redux'
import { useQuery } from '@apollo/client'

import {setPage} from '../reducers/pageReducer'

const Recommendations = () => {
  const user = useSelector(state => state.user)
  const {data, loading} = useQuery(getFavoriteListQUery, {variables: {id_user: user}})
  const [recommendList, setRecommendList] = useState()
  const [favList, setFavList] = useState()
  const dispatch = useDispatch()
  useTitle('Recommendations')

  useEffect(() => {
    setFavList(data?.fav_movie.map(movie => movie.id_movie))
  }, [data])

  useEffect(() => {
    dispatch(setPage('Recommendations'))
  }, [dispatch])

  if(!loading){
    getRecommendations(_.sample(favList)).then(res => setRecommendList(res.results))
  }

  return (
    <div className={`container ${style.container}`}>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 my-4">
        {recommendList?.map(movie => 
            <Card key={movie.id} id={movie.id} title={movie.title} name={movie.name} poster={movie.poster_path}/>  
          )}
      </div>
    </div>
  )
}

export default Recommendations
