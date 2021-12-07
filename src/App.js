import './App.css';
import axios from 'axios';
import React, {useState} from 'react';

const token = 'NjFhYTBhMzA4ZTE4NGU0OWM2MzVlYjEwOnQwJixWVztPK1lEVnFOclRrZDJidWFLcXBHb3ZxeDR5O1MsTUNub3ApZjZ1XWZ5KXdHUDhXeG9BQyRWTTRHaiw='
const postAvatar = (userid)=> axios.post(`https://backend.staffbase.com/api/users/${userid}`, 
                    {                      
                      "avatar":`https://www.linkpicture.com/q/${userid}.png`
                    }, {
                        headers: {            
                            'Authorization': `Basic ${token}`,
                            'Content-Type' : 'application/json',
                            'Accept' : 'application/json',
                        }
                    })
                    .then(response => {
                      console.log('Updated:') 
                      console.log(response)
                    })
                    .catch(error => {
                        console.log(error.response)
                    });

const postAllAvatars = (allUsers) => {
  allUsers.forEach(user => {
    postAvatar (user)
  });
}



const App = () => {



const [user, setUser] = useState([]);
const [loader, setLoader] = useState(false)

const loadUser = async() => {axios.get('https://backend.staffbase.com/api/users', {
                  headers: {
                    'Authorization': `Basic ${token}`
                  }
                  })
                  .then((response) => {
                    const loadedUser = response.data.data;
                    setUser(loadedUser)
                    setLoader (true)                    
                  }) 
                  .catch((error) => {
                    console.error(error)
                  })}



const allUsers = []

const getUserIdArray = user.map((user, i) => (
  allUsers.push(user.id)  
))






  return (
    <div className='App'>
      <div className='MainWrapper'>
        <h1>Avatar upload Script</h1>
        <h4>Step1: Upload the profile pictures on your server named as (userid).png <br />
            Step2: Click the load users button below <br />
            Setp3: Click the "upload avatar" button next to the user you want to update or click the "upload all avatars" button below to update all  <br />
            Check the console for responses     
        </h4>
        <button onClick={loadUser}>Load users</button>
        {user.map((user, i) =>(
          <div className='UserWrapper' key={user.id}>
            <div><b>Name:</b> {user.firstName} {user.lastName} <b>ID:</b> {user.id} 
            <button className='btn_upload_avatar' onClick={()=>{postAvatar(user.id)}}>Upload avatar</button>
            </div>            
          </div>        
        ))} 
        {loader == true ? <button onClick={()=>postAllAvatars(allUsers)}>Upload all avatars</button>: '' } 
      </div>
    </div>
  )
}

export default App;





