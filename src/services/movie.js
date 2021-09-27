import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

export const getTrendingToday = () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
  const request = axios.get(url).then(res => res.data)
  return request
}