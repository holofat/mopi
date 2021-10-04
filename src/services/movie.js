import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

export const getTrendingToday = () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const getNowPlaying = () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const getGenreList = () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const getDiscover = () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const getDiscoverByVoteCount = () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=1bc3f22930b9e6ac9ec9188b3b0ee950&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const searchMovie = query => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const getDiscoverByRating = rating => {
  if(rating){
    rating = parseInt(rating)
    if (rating === 4){
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=1bc3f22930b9e6ac9ec9188b3b0ee950&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.lte=${rating+1}&with_watch_monetization_types=flatrate`
      const request = axios.get(url).then(res => res.data)
      return request
    } else {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=1bc3f22930b9e6ac9ec9188b3b0ee950&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=${rating}&vote_average.lte=${rating+1}&with_watch_monetization_types=flatrate`
      const request = axios.get(url).then(res => res.data)
      return request
    }
  } else {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=1bc3f22930b9e6ac9ec9188b3b0ee950&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    const request = axios.get(url).then(res => res.data)
    return request
  }
}

export const getTopRated = () => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const getDetail = id => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const getCredit = id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const getReview = id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const getSimilarById = id => {
  const url =`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const getRecommendations = id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
  const request = axios.get(url).then(res => res.data)
  return request
}

export const getDiscoverByGenre = id => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=1bc3f22930b9e6ac9ec9188b3b0ee950&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`
  const request = axios.get(url).then(res => res.data)
  return request
}
