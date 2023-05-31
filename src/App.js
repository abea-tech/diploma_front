import Map from "./MapContainer";
import Sidebar from "./Sidebar";
import CircleButton from "./CircleButton";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";
// import HamburgerMenu from './HamburgerMenu';
import React, { useState } from "react";

function App() {
  const [deliveryGroup, setDeliveryGroup] = useState(null);
  const [activeDelivery, setActiveDelivery] = useState(null);
  const [markers, setMarkers] = useState([]); // New state for markers
  const [polyline, setPolyline] = useState([]);

  const getCoordinates = (group) => {
    setDeliveryGroup(group);
  };

  const getActiveDelivery = (delivery) => {
    console.log(delivery);
    setActiveDelivery(delivery);
  };

  const updateMarkers = (driverId, location, path) => {
    if (driverId === null) {
      setMarkers([]);
    } else {
      setMarkers((prevMarkers) => {
        // Remove the previous marker with the same driver ID
        const updatedMarkers = prevMarkers.filter(
          (marker) => marker.driverId !== driverId
        );

        const newMarker = {
          driverId,
          location,
          path,
        };

        return [...updatedMarkers, newMarker];
      });
    }
  };

  return (
    <div className="app-container">
      <Map
        deliveryGroup={deliveryGroup}
        delivery={activeDelivery}
        markers={markers}
      />

      <Sidebar
        onClick={getCoordinates}
        getDelivery={getActiveDelivery}
        updateMarkers={updateMarkers}
      />

      <CircleButton />
    </div>
  );
}

export default App;
