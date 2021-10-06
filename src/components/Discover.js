import React, {useEffect, useState} from 'react'

import Card from './Card'

import style from '../styles/Discover.module.css'

import {
  getGenreList, 
  getDiscover,
  getDiscoverByVoteCount,
  searchMovie,
  getDiscoverByRating,
  getDiscoverByGenre,
  getDiscoverByDate
} from '../services/movie'
import { useTitle } from 'react-use'
import {useDispatch} from 'react-redux'

import {setPage} from '../reducers/pageReducer'

function Discover() {
  const dispatch = useDispatch()
  const [genreList, setGenreList] = useState([])
  const [genre, setGenre] = useState('all')
  const [discover, setDiscover] = useState([])
  const [query, setQuery] = useState('')
  const [pages, setPages] = useState({
    total_pages: 1,
    page: 1,
    set: 'discover'
  })
  
  useTitle('Discover')
  
  useEffect(() => {
    getGenreList().then(res => setGenreList(res.genres))
    getDiscover().then(res => {
      setDiscover(res.results)
      setPages({...pages, total_pages: res.total_pages})
    })
    dispatch(setPage('Discover'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSort = e => {
    e.preventDefault()
    const sort = e.target.value
    if(!query){
      if(sort === 'vote_count'){
        getDiscoverByVoteCount().then(res => {
          setDiscover(res.results)
          setPages({page:1, total_pages: res.total_pages, set: 'vote'})
        })
      } else if(sort === 'latest'){
        getDiscoverByDate().then(res => {
          setDiscover(res.results)
          setPages({page: 1, total_pages: res.total_pages, set: 'latest'})
        })
      } else if(sort === 'popularity'){
        getDiscover().then(res => {
          setDiscover(res.results)
          setPages({page:1, set:'discover', total_pages: res.total_pages})
        })
      }
    } else{
      console.log("Test")
    }

  }

  const handleSearch = e => {
    e.preventDefault()
    const query = e.target[0].value
    searchMovie(query).then(res => {
      setDiscover(res.results)
      setPages({page:1, total_pages: res.total_pages, set: 'search'})
    })
    setQuery(query)
  }

  const handleRating = e => {
    getDiscoverByRating(e.target.value).then(res => {
      setDiscover(res.results)
      setPages({page: 1, set: 'rating', total_pages: res.total_pages})
    })
  }

  const handleGenre = e => {
    const genre = e.target.value
    if(genre !== 'all'){
      getDiscoverByGenre(genre).then(res => {
        setDiscover(res.results)
        setGenre(genre)
        setPages({page: 1,set: 'genre', total_pages: res.total_pages})
      })
    }
  }

  const handlePagination = e => {
    if(pages.set === 'discover'){
      getDiscover(e.target.value).then(res => {
        setDiscover(res.results)
        setPages({...pages, page: parseInt(e.target.value)})
      })
    } else if(pages.set === 'search'){
      searchMovie(query, e.target.value).then(res => {
        setDiscover(res.results)
        setPages({...pages, page:parseInt(e.target.value)})
      })
    } else if(pages.set === 'genre'){
      getDiscoverByGenre(genre, e.target.value).then(res => {
        setDiscover(res.results)
        setPages({...pages, page: parseInt(e.target.value)})
      })
    } else if(pages.set === 'latest'){
      getDiscoverByDate(e.target.value).then(res => {
        setDiscover(res.results)
        setPages({...pages, page: parseInt(e.target.value)})
      })
    } else if(pages.set === 'vote'){
      getDiscoverByVoteCount(e.target.value).then(res => {
        setDiscover(res.results)
        setPages({...pages, page: parseInt(e.target.value)})
      })
    } else if(pages.set === 'rating'){
      getDiscoverByRating(e.target.value).then(res => {
        setDiscover(res.results)
        setPages({...pages, page: parseInt(e.target.value)})
      })
    }
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

        <div>
          <label htmlFor="genre">
            Genre<br/>
            <select name="genre" className="form-select" onChange={handleGenre}>
              <option value="all">All</option>
              {genreList?.map(genre => 
                <option key={genre.id} value={genre.id}>{genre.name}</option>  
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
      <ul className="pagination justify-content-center">
        {pages?.total_pages > 1 && pages?.total_pages > 10 && [...Array(10)].map((x, i) => <li key={i} className={`page-item ${pages.page === i+1 && 'active'}`}><input type="button" className="page-link" onClick={handlePagination} value={i+1}/></li>)}

        {pages?.total_pages > 1 && pages?.total_pages <= 10 && [...Array(pages?.total_pages)].map((x, i) => <li key={i} className={`page-item ${pages.page === i+1 && 'active'}`}><input type="button" className="page-link" onClick={handlePagination} value={i+1}/></li>)}

        {pages.total_pages === 1 && <li className="page-item active"><input type="button" className="page-link" value="1"/></li>}
      </ul>

      
    </div>
  )
}

export default Discover
