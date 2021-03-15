import React from 'react';
import ReactMapboxGl, { Layer, Image, Source, Marker, Feature } from 'react-mapbox-gl';
import './map.css'

export const getMapBoxSources = (location: { lat: number, lng: number }) => {
  return {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {
        message: 'delivery',
        iconSize: [60, 60],
      },
      geometry: {
        type: 'Point',
        coordinates: [location.lng, location.lat],
      },
    },
  };
}

const handleClick = (map: any, event: any) => {
  console.log(event.lngLat)
}

const MapBox = ({ position, zoom }: { position: { lat: number, lng: number }, zoom: number }) => {
  const Map = ReactMapboxGl({ accessToken: 'pk.eyJ1IjoiZG1pdHJ5c2hlc2h1bm92IiwiYSI6ImNrbHV6YXVrMzBybGQydm13OGdxdGxubjUifQ.AnNA11QkmD2Y5uU9gB_HPg', attributionControl: false, doubleClickZoom: false });
  return (
    <div className="map">
      <Map
        center={[position.lat, position.lng]}
        zoom={[zoom]}
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
        onDblClick={handleClick}
      >
        {/*<Image id='delivery' url='/assets/marker.png'/>*/}
        {/*<Source id="point" geoJsonSource={getMapBoxSources({lat: position.lat, lng: position.lng})}/>*/}
        {/*<Layer*/}
        {/*  type='symbol'*/}
        {/*  id='marker'*/}
        {/*  sourceId='point'*/}
        {/*  layout={{ 'icon-image': 'delivery', 'icon-size': 1 }}*/}
        {/*/>*/}
      </Map>
    </div>
  );
};

export default MapBox

