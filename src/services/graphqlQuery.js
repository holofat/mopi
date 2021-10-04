import {gql} from '@apollo/client'

export const addFavoriteQuery = gql`
mutation MyMutation($title: String = "", $poster: String = "", $id_user: uuid = "", $id_movie: Int = 10) {
  insert_fav_movie_one(object: {title: $title, poster: $poster, id_user: $id_user, id_movie: $id_movie}) {
    id
  }
}`

export const getFavoriteQuery = gql`
subscription MySubscription($id: uuid = "") {
  fav_movie(where: {id_user: {_eq: $id}}) {
    id_movie
    poster
    title
  }
}`

export const removeFavoriteQuery = gql`
mutation MyMutation($id_movie: Int = 10, $id_user: uuid = "") {
  delete_fav_movie(where: {id_movie: {_eq: $id_movie}, id_user: {_eq: $id_user}}) {
    affected_rows
  }
}`

export const getWatchlistQuery = gql`
subscription MySubscription($id: uuid = "") {
  watchlist(where: {id_user: {_eq: $id}}) {
    id_movie
    poster
    title
  }
}`


export const addWatchlistQuery = gql`
mutation MyMutation($id_movie: Int = 10, $id_user: uuid = "", $poster: String = "", $title: String = "") {
  insert_watchlist_one(object: {id_movie: $id_movie, id_user: $id_user, poster: $poster, title: $title}) {
    id
  }
}`

export const removeWatchlistQuery = gql`
mutation MyMutation($id_movie: Int = 10, $id_user: uuid = "") {
  delete_watchlist(where: {id_movie: {_eq: $id_movie}, id_user: {_eq: $id_user}}) {
    affected_rows
  }
}`

export const getFavoriteByIdQuery = gql`
subscription MySubscription($id_movie: Int = 10, $id: uuid = "") {
  fav_movie(where: {id_movie: {_eq: $id_movie}, id_user: {_eq: $id}}) {
    id
  }
}`

export const getWatchlistByIdQuery = gql`
subscription MySubscription($id_movie: Int = 10, $id: uuid = "") {
  watchlist(where: {id_movie: {_eq: $id_movie}, id_user: {_eq: $id}}) {
    id
  }
}`

export const getRatingQuery = gql`
subscription MySubscription($id_movie: Int = 10, $id_user: uuid = "") {
  ratings(where: {id_movie: {_eq: $id_movie}, id_user: {_eq: $id_user}}) {
    rating
  }
}`

export const addRatingQuery = gql`
mutation MyMutation($id_movie: Int = 10, $id_user: uuid = "", $poster: String = "", $rating: Int = 10, $title: String = "") {
  insert_ratings_one(object: {id_movie: $id_movie, id_user: $id_user, poster: $poster, rating: $rating, title: $title}) {
    id
  }
}`

export const updateRatingQuery = gql`
mutation MyMutation($id_movie: Int = 10, $id_user: uuid = "", $rating: Int = 10) {
  update_ratings(where: {id_movie: {_eq: $id_movie}, id_user: {_eq: $id_user}}, _set: {rating: $rating}) {
    affected_rows
  }
}`


export const addReviewQuery = gql`
mutation MyMutation($id_movie: Int = 10, $id_user: uuid = "", $review: String = "") {
  insert_reviews_one(object: {id_movie: $id_movie, id_user: $id_user, review: $review}) {
    id
  }
}`

export const updateReviewQuery = gql`
mutation MyMutation($id_movie: Int = 10, $id_user: uuid = "", $review: String = "") {
  update_reviews(where: {id_movie: {_eq: $id_movie}, id_user: {_eq: $id_user}}, _set: {review: $review}) {
    affected_rows
  }
}`

export const getReviewByIdQuery = gql`
subscription MySubscription($id_movie: Int = 10, $id_user: uuid = "") {
  reviews(where: {id_movie: {_eq: $id_movie}, id_user: {_eq: $id_user}}) {
    review
  }
}`

export const deleteReviewQuery = gql`
mutation MyMutation($id_movie: Int = 10, $id_user: uuid = "") {
  delete_reviews(where: {id_movie: {_eq: $id_movie}, id_user: {_eq: $id_user}}) {
    affected_rows
  }
}`

export const getUsersById = gql`
query MyQuery($id: uuid = "") {
  users(where: {id: {_eq: $id}}) {
    email
    username
  }
}`

export const getRatingLatestQuery = gql`
query MyQuery($id_user: uuid = "") {
  ratings(order_by: {created_at: desc}, where: {id_user: {_eq: $id_user}}, limit: 1) {
    id_movie
    poster
    title
    rating
  }
}`

export const getLatestFavoriteQuery = gql`
query MyQuery($id_user: uuid = "") {
  fav_movie(order_by: {created_at: desc}, where: {id_user: {_eq: $id_user}}, limit: 1) {
    id_movie
    poster
    title
  }
}`

export const getLatestWatchlistQuery = gql`
query MyQuery($id_user: uuid = "") {
  watchlist(order_by: {created_at: desc}, where: {id_user: {_eq: $id_user}}, limit: 1) {
    id_movie
    poster
    title
  }
}`