import React, { useState } from 'react'

const Edit = () => {
  const [data,setData]=useState({
    firstname:'',
    lastname:'',
    email:''
  });
  const {firstname,lastname,email}={...data}

  const changeHandler=e=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <center>
        <h3>Update Form</h3>
        <form 
        style={{
          backgroundColor:'goldenrod',
          border:'2px solid black',width:'500px',
          height:'300px',
          borderRadius:'5px',
          margin:'10px',
          padding:'10px',
          alignItems:'start'
        }}
        >
          <div style={{
            margin:'10px',
            padding:'10px',
            alignSelf:'start'

          }}>
            <label style={{
              margin:'5px',
              font:'20px bold black',
              marginRight:'20px'
            }}>First Name:</label>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={firstname}
              onChange={changeHandler}
            />
          </div>
          <div style={{
            margin:'10px',
            padding:'10px',
            alignSelf:'start'

          }}>
            <label
            style={{
              font:'20px bold black',
              margin:'5px',
              marginRight:'20px'
            }}>Last Name:</label>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={lastname}
              onChange={changeHandler}
            />
          </div>
          <div style={{
            margin:'10px',
            padding:'10px',
            alignSelf:'start'

          }}>
            <label
            style={{
              font:'20px bold black',
              margin:'5px',
              marginRight:'20px'
            }}>Email:</label>
            <input style={{
              marginLeft:'30px'
            }}
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={changeHandler}
            />
          </div>
          <div style={{
            margin:'10px',
            padding:'10px',
            alignSelf:'start'

          }}>
            <input type="submit" className="btn btn-primary" value="Update" />
          </div>
        </form>
      </center>
    </div>
  )
}

export default Edit
