import { useEffect, useRef, useState } from "react";
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Footer';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import api from '../../services/api';
import './DispNearUtility.css';

const MapComponent = () => {
  const mapRef = useRef(null);
  const routeRef = useRef(null);
  const userLocation = useRef(null);
  const [, setPlaces] = useState([]);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([20.7141, 70.9876], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    const iconUrl = "https://img.favpng.com/18/5/15/public-toilet-icon-png-favpng-JBDLZqNXHRjuC2gDzkVZhAMU0.jpg";
    const customIcon = L.icon({
      iconUrl,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const getDistance = (lat1, lng1, lat2, lng2) => {
      const R = 6371e3;
      const toRad = deg => deg * Math.PI / 180;
      const φ1 = toRad(lat1), φ2 = toRad(lat2);
      const Δφ = toRad(lat2 - lat1);
      const Δλ = toRad(lng2 - lng1);
      const a = Math.sin(Δφ/2)**2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2)**2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    const findNearestPlace = (userLat, userLng, allPlaces) => {
      let nearest = null, minDist = Infinity;
      for (const place of allPlaces) {
        const dist = getDistance(userLat, userLng, place.latitude, place.longitude);
        if (dist < minDist) {
          minDist = dist;
          nearest = place;
        }
      }
      return nearest;
    };

    const drawRoute = (start, end) => {
      if (routeRef.current) {
        routeRef.current.setWaypoints([ 
          L.latLng(start.lat, start.lng),
          L.latLng(end.lat, end.lng)
        ]);
      } else {
        routeRef.current = L.Routing.control({
          waypoints: [
            L.latLng(start.lat, start.lng),
            L.latLng(end.lat, end.lng)
          ],
          routeWhileDragging: false
        }).addTo(map);
      }
    };

    // Fetch dynamic places from backend
    api.get("/admin_activity/publicToilets")
      .then(res => {
        const data = res.data;
        setPlaces(data);

        data.forEach(place => {
          const marker = L.marker([place.latitude, place.longitude], { icon: customIcon }).addTo(map);
          marker.bindTooltip(place.name, { permanent: false, direction: "top" });

          marker.on("click", () => {
            if (!userLocation.current) {
              alert("User location not available yet.");
              return;
            }
            drawRoute(userLocation.current, { lat: place.latitude, lng: place.longitude });
            marker.openPopup();
          });
        });

        // Get user location after data is loaded
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            userLocation.current = { lat, lng };

            map.setView([lat, lng], 15);
            L.marker([lat, lng]).addTo(map).bindPopup("You are here").openPopup();

            const nearest = findNearestPlace(lat, lng, data);
            if (nearest) {
              drawRoute(userLocation.current, { lat: nearest.latitude, lng: nearest.longitude });
              alert(`Routing to nearest place: ${nearest.name}`);
            }
          }, err => {
            alert("Location error: " + err.message);
          });
        } else {
          alert("Geolocation not supported.");
        }
      })
      .catch(err => {
        console.error("Error fetching places:", err);
      });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="map-container">
      <div id="map" ref={mapRef} style={{ height: "80vh" }} />
    </div>
  );
};

export default MapComponent;
