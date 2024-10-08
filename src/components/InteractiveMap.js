import * as React from 'react';
import {useRef, useEffect, useMemo} from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { divIcon } from 'leaflet';

export default function InteractiveMap({ tourTitle, gpxPositions, anreiseGpxPositions, abreiseGpxPositions, scrollWheelZoom=false }) {
  const polyRef = useRef();
  const mapRef  = useRef(null);

  const startIcon = L.icon({
    iconUrl: '/app_static/img/startpunkt.png',
    iconSize: [33, 45],
    iconAnchor: [16, 46],
  });
  const endIcon = L.icon({
    iconUrl: '/app_static/img/zielpunkt.png',
    iconSize: [33, 45],
    iconAnchor: [16, 46],
  });

  const StartMarker = ({ position }) => {
    return <Marker position={position} icon={startIcon}></Marker>;
  };

  const EndMarker = ({ position }) => {
    return <Marker position={position} icon={endIcon}></Marker>;
  };


useEffect(() => {
  let map = mapRef.current;
  const initializeMap = () => {
    if (!!mapRef && !!mapRef.current) {
      if (!!mapRef.current._leaflet_id && mapRef.current._leaflet_id !== (null || undefined)) {
        mapRef.current._leaflet_id = null;
      }
    }
  };
  initializeMap();
  
  return () => {
    // remove the map when the component is unmounted
    if(!!map) {
      map = map.remove();
    } 
  };
}, []);

useEffect(() => {
  if (!!mapRef && !!mapRef.current) {
    if (!!polyRef.current) {
      mapRef.current.fitBounds(polyRef.current.getBounds());
    }
  }
});

  const getStartMarker = () => {
    if (anreiseGpxPositions && anreiseGpxPositions.length > 0) {
      return <StartMarker position={anreiseGpxPositions[0]} />;
    } else if (gpxPositions && gpxPositions.length > 0) {
      return <StartMarker position={gpxPositions[0]} />;
    }
    
  }
  const getEndMarker = () => {
    if (!!abreiseGpxPositions && abreiseGpxPositions.length > 0) {
      return <EndMarker position={abreiseGpxPositions[abreiseGpxPositions.length - 1]} />;
    } else if (!!gpxPositions && gpxPositions.length > 0) {
      return <EndMarker position={gpxPositions[gpxPositions.length - 1]} />;
    }
  };


  return (
    <MapContainer
      // key={()=>generateKey()}
      ref={mapRef}
      scrollWheelZoom={scrollWheelZoom}
      maxZoom={15}
      center={[47.800499, 13.04441]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
      // whenCreated={(mapInstance)=> { mapRef.current = mapInstance }}
    >
      <TileLayer url="https://opentopo.bahnzumberg.at/{z}/{x}/{y}.png.webp" />
      {!!gpxPositions && gpxPositions.length > 0 && (
        <Polyline
          ref={polyRef}
          // pathOptions={{ color: 'red' }}
          pathOptions={{ weight: 5, color: "#FF7663" }}
          positions={gpxPositions}
        />
      )}
      {getStartMarker()}
      {getEndMarker()}
      {!!anreiseGpxPositions && anreiseGpxPositions.length > 0 && (
        <Polyline
          // pathOptions={{ color: 'blue' }}
          pathOptions={{ weight: 5, color: "#FF7663" }}
          positions={anreiseGpxPositions}
        />
      )}
      {!!abreiseGpxPositions && abreiseGpxPositions.length > 0 && (
        <Polyline
          // pathOptions={{ color: 'green' }}
          pathOptions={{ weight: 5, color: "#FF7663" }}
          positions={abreiseGpxPositions}
        />
      )}
      <ZoomControl position="bottomright" />
    </MapContainer>
  )
}