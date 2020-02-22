import { Map, Marker, Popup, Polyline, TileLayer } from 'react-leaflet-universal'
import React from 'react'
import googlePolyline from 'google-polyline'
import L from 'leaflet'
import { SizeMe } from 'react-sizeme'

function WorkoutMap({polyline}) {
  if(typeof(window) === 'undefined') {
    return <div />
  }
  return null
  return <SizeMe>{({ size }) => 
    <WorkoutMapCalculations polyline={polyline} size={size} />
  }</SizeMe>
}

function WorkoutMapCalculations({polyline, size}) {
  const decoded = googlePolyline.decode(polyline)

  const positions = decoded.map(i => new L.LatLng(i[0], i[1]))

  const bounds = new L.LatLngBounds(positions)
  const latSize = Math.abs(bounds._northEast.lat - bounds._southWest.lat)
  const lngSize = Math.abs(bounds._northEast.lng - bounds._southWest.lng)
  const boundsSize = Math.max(latSize, lngSize)

  let zoom = 16
  if(boundsSize > 0.1) {
    zoom = 12
  }
  else if(boundsSize > 0.05) {
    zoom = 13
  }
  else if(boundsSize > 0.025) {
    zoom = 14
  }
  else if(boundsSize > 0.0125) {
    zoom = 15
  }

  return <div>
    <WorkoutPolyLine positions={positions} decoded={decoded} center={bounds.getCenter()} bounds={bounds} zoom={zoom} />
  </div>
}

function WorkoutPolyLine({positions, center, zoom}) {
  if (typeof window === 'undefined') {
    return <div style={{height: '640px'}} />
  }
  return <Map style={{height: '640px'}} zoom={zoom} center={center}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Polyline positions={positions}/>
  </Map>
}

export default WorkoutMap