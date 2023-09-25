import React from 'react'

const DemoOutput = (props) => {
    console.log('DemoOutput file running');
    return (
        <p>{props.show ? 'This is new' : ''}</p>
    )
}

export default DemoOutput