import React, { useEffect, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { database } from './firebase'; // Import the database instance
import { ref, push, onValue, remove,child } from 'firebase/database'; // Import required database functions

const Home = () => {
  let navigate=useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, 'users'); // Reference to the "users" node
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        setUsers(Object.entries(snapshot.val())); // Convert to an array of [key, value] pairs
      } else {
        setUsers([]); // If no data exists, set an empty array
      }
    });
  }, []);

  const { firstname, lastname, email } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Create a reference to the "users" node in the database
    const usersRef = ref(database, 'users');

    // Push data to the "users" node
    push(usersRef, data)
      .then(() => {
        
        setData({ firstname: "", lastname: "", email: "" });
        alert("successfully registerd") // Reset form fields
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  //delete Handler
  

  return (
    <div>
      <center>
        <h3>Register Form</h3>
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
        onSubmit={submitHandler}>
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
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
        </form>
      </center>
      
      {users.length > 0 ? (
        users.map(([key, user]) => (
          <div
            key={key}
            style={{
              width:'800px',
              border: '2px solid black',
              margin: '10px',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'left'
            }}
          >
            
            <p><strong>First Name:</strong> {user.firstname}</p>
            <p><strong>Last Name:</strong> {user.lastname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <div>
              <button className='btn btn-success'
              style={{
                font:'20px bold black',
                width:'80px',
                height:'40px',
                background:'green',
                border:'1px solid balck',
                borderRadius:'3px',
                margin:'20px',
                marginLeft:'5px'
              }} onClick={()=>navigate(`/edit?firstname=${user.firstname}&lastname=${user.lastname}&email=${user.email}&key=${key}`)}>Update</button>
              <button className='btn btn-danger'
              style={{
                font:'20px bold black',
                width:'80px',
                height:'40px',
                background:'red',
                border:'1px solid balck',
                borderRadius:'3px',
                margin:'20px',
                marginLeft:'5px'
              }} onClick={() => {
                const userRef = ref(database, `users/${key}`); // Reference to the specific user
                remove(userRef)
                  .then(() => {
                    alert("Deleted successfully!");
                  })
                  .catch((error) => {
                    console.error("Error deleting user:", error);
                  });
              }}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Home;
