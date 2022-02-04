import React, { useState } from "react";
import "./stylesheet.css";
import Map from "./components/Map";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Search from "./components/Search";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [tweetsResult, setTweetsResult] = useState(null);
  const [searchTopic, setSearchTopic] = useState(null);
  const [favorisMode, setFavorisMode] = useState(false);
  const [markerCoordinates, setMarkerCoordinates] = useState(null);

  return (
    <div>
      <Header />
      <div id="container">
        <div id="mapContainer">
          <Search
            setFavorisMode={setFavorisMode}
            setSearchTopic={setSearchTopic}
            setSearchResult={setSearchResult}
            setSelectedCity={setSelectedCity}
          />
          <div id="mapClipPath">
            <Map
              searchResult={searchResult}
              selectedProperty={selectedCity}
              favorisMode={favorisMode}
              markerCoordinates={markerCoordinates}
              setTweetsResult={setTweetsResult}
              setSelectedProperty={setSelectedCity}
              setMarkerCoordinates={setMarkerCoordinates}
            />
          </div>
        </div>
        <Slider
          favorisMode={favorisMode}
          setFavorisMode={setFavorisMode}
          setMarkerCoordinates={setMarkerCoordinates}
          searchTopic={searchTopic}
          selectedCity={selectedCity}
          tweetsResult={tweetsResult}
          setTweetsResult={setTweetsResult}
        />
      </div>
    </div>
  );
}

export default App;
