import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Places from "../components/homeComponents/Places";
import Search from "../components/homeComponents/Search";
import Filter from "../components/homeComponents/Filter";
import Map from "../components/mapComponents/Map";


import './Home.css'

const apiEndpoint = "http://localhost:8000/api/places";

export default function Home() {
  const [searchLast, setSearchLast] = useState('');
  const [places, setPlaces] = useState([]);
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [activePlaces, setActivePlaces] = useState([]);
  const [activeType, setActiveType] = useState([]);
  const [showMap, setShowMap] = useState(false)
  useEffect(() => {
    const apiCall = async () => {
      const res = await axios.get(apiEndpoint);
      setPlaces(res.data);
      setActivePlaces(res.data);
      setFilterPlaces(res.data);
    };
    apiCall();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (activeType === "") {
      const searchThis = places.filter((one) =>
        one.name.toLowerCase().includes(searchLast.toLowerCase())
      );
      setFilterPlaces(searchThis);
    }
    const filtered = places.filter((place) => place.type.includes(activeType));
    setActivePlaces(filtered);
    const searchThis = filtered.filter((one) =>
      one.name.toLowerCase().includes(searchLast.toLowerCase())
    );
    setFilterPlaces(searchThis);
  }, [activeType]); 

  const searchHandler = (search) => {
    setSearchLast(search);
    const searchThis = activePlaces.filter((one) =>
      one.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterPlaces(searchThis);
  };

  return (
    <div>
      {showMap && <Map places={filterPlaces} />}
      {!showMap && <div><h1>list</h1>
      <Search onSearch={searchHandler} />
      <Filter setActiveType={setActiveType} />
      <div className= "space">
        {filterPlaces.map((place) => {
          return <Places key={place._id} place={place} />;
        })}
      </div></div>}
      {!showMap && <button className="buttonMap" onClick={()=>setShowMap(true)}><img src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669896702/Pawsome/veterinary_elubfi.png' alt="icon" className="imgMap"/></button>}
      {showMap && <button  onClick={()=>setShowMap(false)}>List</button>}
    </div>
  );
}
