import React from 'react'

const Button = (props) => {
    const {text, color, toggleShow} = props 
    return (
        <div>
            <button onClick={toggleShow} style={{backgroundColor: color}} className='btn'>{text}</button>
        </div>
    )
}

export default Button
