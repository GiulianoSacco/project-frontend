import {Link} from "react-router-dom";
import userProfileImg from "../../assets/user-profile.png"
import favoriteImg from "../../assets/favorite.png"
import logoutImg from "../../assets/logout.png"
import myPlacesImg from "../../assets/map.png"
import myPetImg from "../../assets/mypet.png"
import './UserProfile.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'

const storedToken = localStorage.getItem("authToken");
const apiEndpoint = "http://localhost:8000/api/profile";

const UserProfile =() => {

    const [ profile, setProfile] = useState({}) 
    const [pet, setPet] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            const result = await axios.get(apiEndpoint, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setProfile(result.data)
            setPet(result.data.pet)
          
        };
        apiCall();
    }, []);

    return (

        <div className="userprofile" key={profile._id}>
            <h1>Hello {profile.name}!</h1>
    
            <img src={profile.image} alt="" />
            <div>
                {pet.map((element) => {
                    return (
                        <div key={element._id}>
                                                   
                            <h2>Pet name {element.namePet}</h2>
                            <img className="petProfile" src={element.image} alt=""/>
                        
                        </div>
                    )
                })}
              
            </div>


        <ul>

        <Link to ="/Favorites"><img src ={favoriteImg}/>Favorites</Link> <br></br>
        <Link to ="/profile/MyPlaces"><img src ={myPlacesImg}/>Created Places</Link> <br></br>
        <Link to ="/pet-profile"><img src ={myPetImg}/>My Pets</Link><br></br>
        <Link to ="/Logout"><img src ={logoutImg}/> Logout</Link><br></br>
        </ul>
        </div>
    )
}


export default UserProfile;
