import React from 'react'
import "./styles.css"

const Button = ({text, onClick,blue,disabled}) => {
    function logoutFnc(){
        alert("Logout!");
    }
  return (
    <div className={blue ? 'btn btn-blue' :'btn'} onClick={onClick} disabled={disabled}>
      {text}
    </div>
  )
}

export default Button
