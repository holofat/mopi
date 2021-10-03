import React from 'react'

const Review = ({content, rating, username}) => {
  return (
    <div className="form form-control">
      <b>{username}</b> - {parseInt(rating)}/10<br/> 
      {content}
    </div>
  )
}

export default Review
