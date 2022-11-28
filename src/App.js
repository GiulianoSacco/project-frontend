import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ErrorPage from './pages/ErrorPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import PrivateView from './pages/PrivateView';
import IsPrivate from './components/IsPrivate';

import UserProfile from './pages/UserProfile';
// import Favorites from './pages/Favorites';
import CreatePet from './pages/pet/CreatePet'
import MyPlaces from './pages/user/MyPlaces'
import PhotoUser from './pages/user/PhotoUser'
import PlacesForm from './pages/places/PlacesForm'
import PlaceDetails from './pages/places/PlaceDetails'
import Favorites from './pages/Favorites'





function App() {
   return (
      <div className="App">
         <Toaster />
         <Navbar />
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
            <Route path="/pet-profile/create" element={<CreatePet/>}/>
            <Route path="/profile" element={<MyPlaces/>}/>
            <Route path="/user-profile/edit-photo" element={<PhotoUser/>}/>
            <Route path="/addPlace" element={<PlacesForm />} />
            <Route path="/places/:placeId" element={<PlaceDetails />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/UserProfile" element={<UserProfile/>}/>
            <Route path="/Favorites" element={<Favorites/>}/>
         </Routes>
      </div>
   );
}

export default App;
