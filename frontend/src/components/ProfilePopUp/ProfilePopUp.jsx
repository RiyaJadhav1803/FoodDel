import {React , useEffect}from 'react'
import "./ProfilePopUp.css"
import { useNavigate , Link } from 'react-router-dom'
const ProfilePopUp = ({setcallprofile , email,setloggedin}) => {
const navigate=useNavigate();

// const yourorder=async(e)=>{
//   e.preventDefault();
//   try {
//         const response = await fetch('http://localhost:5000/profileorder',
//         {       method: "post",
//                 body: JSON.stringify(),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 credentials:'include',
//         });
//     const data = await response.json();
//     console.log(data.message);
//     navigate(data.redirectto);
//     }
//   catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

        const logout = async (e) => {
            e.preventDefault();
          try {
                const response = await fetch('http://localhost:5000/logout',
                {       method: "post",
                        body: JSON.stringify(),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials:'include',
                });
            const data = await response.json();
            if (data.redirectto === '/') {
                setcallprofile(false);
                setloggedin(false);
                navigate(data.redirectto);
                alert("You are logged out!");
              }
            }
          catch (error) {
            console.error('Error fetching data:', error);
          }
        }

  return (
    <div className='profile'>
        <div className='profile-box'>
            <div className='profile-head'>
                <div>
                    <p className='profile-heading'> My Profile</p>
                </div>
                <div className='profile-cross' onClick={()=>setcallprofile(false)}>
                    x
                </div>
            </div>
            <div className='profile-email'>
                Email: {email}
            </div>
            <Link to='/yourorders'>
            <div>
                <button className='profile-order'> Your Orders !</button>
              </div>
            </Link>
            <div>
                <button onClick={logout} className='profile-logout'>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default ProfilePopUp