import React from 'react'
import '../css/Message.css'

const Message = ({message, error}) => {
  return (
    <div className={`${error ? 'message error-true' : 'message'}`}>
      <p>{message}</p>
    </div>
  )
}

export default Message
