import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Navbar from './components/homepage/navbar';
import Slider from './components/homepage/slider';
import Carousel from './components/homepage/carousel';


function App() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data') 
      .then(response => {
        const data = response.data;
        console.log(data);
        const formattedSlides = data.map(item => ({
          cityname: item.cityname,   // Store city name
          cityavatar: item.cityavatar  // Store city avatar (image URL)
        })); 
        setSlides(formattedSlides); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      {/* You can add other components here, like your main content */}
      <Slider slides={slides}/>
      <Carousel slides={slides}/>
    </div>
  );
}

export default App;