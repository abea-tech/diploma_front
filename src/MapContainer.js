import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import { getAccessToken } from "./auth";

function Map({ deliveryGroup, delivery, markers }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  // const [deliveryGroups, setDeliveryGroups] = useState([]);
  // if (deliveryGroup) {
  //   setDeliveryGroups(deliveryGroup);
  // }
  const truckIcon = L.icon({
    iconUrl: process.env.PUBLIC_URL + "/truck.png",
    shadowUrl: iconShadow,
    iconSize: [41, 41],
    iconAnchor: [12, 10],
  });
  const defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 10],
  });

  const selectedDriver = (driverId) => {
    console.log(driverId);
    const token = getAccessToken();
    setSelectedMarker(driverId);
    axios
      .get(
        `http://127.0.0.1:8000/api/delivery/delivery_group?state=IN PROCESS&deliveryman=${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.results[0]);
        setDeliveries(response.data.results[0]);
        console.log(deliveries);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(selectedMarker);
  }, [selectedMarker]);

  const resetSelectedMarker = () => {
    setSelectedMarker(null);
    setDeliveries([]);
  };

  const resetMarkers = () => {
    markers.forEach((marker) => {
      marker.remove();
    });
  };

  return (
    <MapContainer
      key={markers.length}
      center={[51.139392, 71.449074]}
      zoom={13}
      style={{ height: "100vh" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {deliveryGroup &&
        deliveryGroup.deliveries &&
        deliveryGroup.deliveries.map((delivery, index) => (
          <Marker
            key={index}
            position={[
              parseFloat(delivery.client_address.address.coordinates.latitude),
              parseFloat(delivery.client_address.address.coordinates.longitude),
            ]}
            icon={defaultIcon}
            eventHandlers={{
              popupclose: () => {
                // resetSelectedMarker();
                // setDeliveryGroups([]);
                deliveryGroup = null;
                console.log(deliveryGroup);
                window.location.reload();
              },
            }}
          >
            <Popup>
              {delivery.client_address.address.street}{" "}
              {delivery.client_address.address.building_number}
            </Popup>
          </Marker>
        ))}
      {deliveries &&
        deliveries.deliveries &&
        deliveries.deliveries.map((delivery, index) => (
          <Marker
            key={index}
            position={[
              parseFloat(delivery.client_address.address.coordinates.latitude),
              parseFloat(delivery.client_address.address.coordinates.longitude),
            ]}
            icon={defaultIcon}
          >
            <Popup>
              {delivery.client_address.address.street}{" "}
              {delivery.client_address.address.building_number}
            </Popup>
          </Marker>
        ))}

      {markers.map((marker, index) => (
        <React.Fragment key={index}>
          <Marker
            position={marker.location}
            icon={truckIcon}
            zIndexOffset={1000}
            eventHandlers={{
              click: () => {
                console.log("marker clicked");
                selectedDriver(marker.driverId);
              },
              popupclose: () => {
                console.log("Popup closed");
                resetSelectedMarker();
              },
            }}
          >
            <Popup>Driver ID: {marker.driverId}</Popup>
          </Marker>
          {selectedMarker === marker.driverId && (
            <Polyline positions={marker.path} />
          )}
        </React.Fragment>
      ))}
    </MapContainer>
  );
}

export default Map;
