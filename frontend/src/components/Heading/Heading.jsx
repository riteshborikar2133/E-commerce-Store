import React from 'react'
import './Heading.css'

export default function Heading(props) {
    return (
        <div className='heading'>
            {props.heading}
            {/* <hr /> */}
        </div>
    )
}
