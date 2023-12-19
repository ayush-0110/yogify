import React from 'react'

function Modal({setIsError, errorlist}) {
  return (
    <div
    className='modal'
          
        >
            <div className='errorBox'>

         <h1>Warning!</h1>
         <ul>

         {errorlist && errorlist.map((item, index) => {
             return <li key={index} style={{fontSize:'20px', marginTop:'5px'}}>{item}</li>;
            })}
            </ul>
         <button className='btn' 
         style={{marginTop:'15px'}}
         onClick={()=>{
             setIsError(false);
            }}> Close</button>
            </div>
        </div>


  )
}

export default Modal