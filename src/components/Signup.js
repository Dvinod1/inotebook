import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"",  email: "", password: "" , cpassword:""})
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    //  api call
     const {name,email, password}=credentials
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email,password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authToken) 
      navigate("/home")
      props.showAlert("Account created successfully ", "success")

    }
    else {
      props.showAlert("invalid credentials", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }



  return (
    <div className='container' >
      <h2>Signup to Inotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter Name</label>
          <input type="name" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">ConfirmPassword</label>
          <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
