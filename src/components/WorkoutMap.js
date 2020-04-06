import { Map, Marker, Popup, Polyline, TileLayer, withLeaflet } from 'react-leaflet'
import React from 'react'
import googlePolyline from 'google-polyline'
import L from 'leaflet'
import { SizeMe } from 'react-sizeme'

function WorkoutMap({polyline}) {
  if(typeof(window) === 'undefined') {
    return <div />
  }
  //return null

  return <WorkoutMapCalculations polyline={polyline} />

  // return <SizeMe>{({ size }) => 
  //   <div>
      
  //     <WorkoutMapCalculations polyline={polyline} size={size} />

  //   </div>
  // }</SizeMe>
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

  // var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
  //   attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   subdomains: 'abcd',
  //   minZoom: 0,
  //   maxZoom: 20,
  //   ext: 'png'
  // });
  return <div>
    <Map scrollWheelZoom={false} style={{height: '640px'}} zoom={zoom} center={center}>
      <TileLayer
        ext="png"
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}"
        attribution={`Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
      />
      <Polyline positions={positions}/>
    </Map>
    <style jsx>{`
                .map-root {
              height: 100%;
            }
            .leaflet-container {
             height: 640px !important;
             width: 100%;
             margin: 0 auto;
           }
       `}
    </style>
  </div>
}

export default WorkoutMap