import React, { useEffect, useRef, useState } from 'react';

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
    acc: null,
    alt: null,
    speed: null,
    head: null,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the map after loading the script
    const initMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              acc: position.coords.accuracy,
              alt: position.coords.altitude,
              speed: position.coords.speed,
              head: position.coords.heading,
            };

            setCoordinates(pos);

            // Initialize the map using ref
            const map = new window.google.maps.Map(mapRef.current, {
              center: pos,
              zoom: 10,
            });

            // Add a marker at the current location
            new window.google.maps.Marker({
              position: pos,
              map: map,
              title: 'You are here!',
            });
          },
          () => {
            alert('Failed to get location. Please enable location services.');
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    };

    // Load the Google Maps script dynamically
    const script = document.createElement('script');
    script.src =
      'https://maps.gomaps.pro/maps/api/js?key=AlzaSyQ6LUeppiA3BKQ5wxQTEFLLlRt9AepEjNI&callback=initMap';
    script.async = true;
    script.defer = true;
    window.initMap = initMap; // Define the callback function
    document.head.appendChild(script);

    return () => {
      delete window.initMap;
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3>My Location</h3>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '400px',
          margin: '20px auto',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      ></div>
      <p>
        {/* Latitude: {coordinates.lat}, 
        Longitude: {coordinates.lng},  */}
        {/* Accuracy: {coordinates.acc}, 
        Altitude: {coordinates.alt}, 
        Speed: {coordinates.speed}, 
        Heading: {coordinates.head} */}
      </p>
    </div>
  );
};

export default MapComponent;
