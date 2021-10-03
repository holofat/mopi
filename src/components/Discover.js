import React, {useEffect, useState} from 'react'

import Card from './Card'

import style from '../styles/Discover.module.css'

import {
  getGenreList, 
  getDiscover,
  getDiscoverByVoteCount,
  searchMovie,
  getDiscoverByRating
} from '../services/movie'
import { useTitle } from 'react-use'
import {useDispatch} from 'react-redux'

import {setPage} from '../reducers/pageReducer'

function Discover() {
  const dispatch = useDispatch()
  const [genreList, setGenreList] = useState([])
  const [discover, setDiscover] = useState([])
  const [query, setQuery] = useState('')
  useTitle('Discover')
  
  useEffect(() => {
    getGenreList().then(res => setGenreList(res.genres))
    getDiscover().then(res => setDiscover(res.results))
    dispatch(setPage('Discover'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSort = e => {
    e.preventDefault()
    const sort = e.target.value
    if(!query){
      if(sort === 'vote_count'){
        getDiscoverByVoteCount().then(res => setDiscover(res.results))
      }
    } else{
      console.log("Test")
    }

  }

  const handleSearch = e => {
    e.preventDefault()
    const query = e.target[0].value
    searchMovie(query).then(res => setDiscover(res.results))
    setQuery(query)
  }

  const handleRating = e => {
    getDiscoverByRating(e.target.value).then(res => setDiscover(res.results))
  }

  return (
    <div className={`${style.container} container`}>
      <form className="row w-100" onSubmit={handleSearch}>
        <div className="col-sm-9" style={{paddingRight: '0'}}>
          <input type="text" name="search" className="form w-100 my-2 form-control" placeholder="Enter Your Query"/>
        </div>
        <div className="col-sm">
          <button type="submit" className="w-100 btn btn-primary mt-2">Search</button>
        </div>
        <div className="col-sm">
          <button type="reset" className="w-100 btn btn-dark mt-2">Reset</button>
        </div>
      </form>
      
      <div className="d-flex justify-content-between w-75">
        <div className="">
          <label htmlFor="sort">
            Sort By<br/>
            <select name="sort" className="form-select w-100" onChange={handleSort}>
              <option value="popularity" defaultValue={true}>Popularity</option>
              <option value="vote_count">Vote Count</option>
              <option value="latest">Latest</option>
            </select>
          </label>
        </div>

        <div className="">
          <label htmlFor="rating">
            Rating <br/>
            <select name="rating" onChange={handleRating} className={`${style.select} form-select w-100`}>
              <option value="" defaultValue={true}>All</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">Less than 4</option>
            </select>
          </label>
        </div>

        <div className="">
          <label htmlFor="year">
            Year<br/>
            <select name="year" className="form-select w-100">
              <option value="all" defaultValue={true}>All</option>
              <option value="2010">2011-Now</option>
              <option value="1990">1991-2010</option>
              <option value="1970">1971-1990</option>
              <option value="1900">1900-1970</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="genre">
            Genre<br/>
            <select name="genre" className="form-select">
              <option value="all">All</option>
              {genreList?.map(genre => 
                <option key={genre.id} value={genre.name}>{genre.name}</option>  
              )}
            </select>
          </label>
        </div>

      </div>
      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 my-4">
          {discover?.map(movie => 
            <Card key={movie.id} id={movie.id} title={movie.title} name={movie.name} poster={movie.poster_path}/>  
          )}
      </div>

      
    </div>
  )
}

export default Discover
