import React from 'react'

function Card({id, title, name, poster}) {
  const img = `https://image.tmdb.org/t/p/w500${poster}`

  return (
    <div className="col">
      <div className="card shadow-sm">
      <img className="bd-placeholder-img card-img-top" alt={title} width="100%" height="400" src={img}/>
      </div>
    </div>
  )
}

export default Card
