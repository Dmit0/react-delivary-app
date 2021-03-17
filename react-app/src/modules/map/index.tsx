import React from 'react';
import ReactMapboxGl, { Layer, Image, Source } from 'react-mapbox-gl';
import './map.css'
import { useDispatch } from 'react-redux';
import { getCoordinates } from '../../core/redux/order/actions';
import env from '../../react-app-env.d'

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

const getCoordinatesString = (position: { lng: number, lat: number }) => {
  return Object.values(position).map(item => {
    const stringCoordinate = item.toString()
    return stringCoordinate.split('').slice(0, 10).join('');
  }).join(',')
}

const MapBox = ({ position, zoom }: { position: { lat: number, lng: number }, zoom: number }) => {

  const dispatch = useDispatch();

  const Map = ReactMapboxGl({ accessToken: env.MAP_BOX_KEY, attributionControl: false, doubleClickZoom: false });

  const handleClick = (map: any, event: any) => {
    const coordinates = getCoordinatesString(event.lngLat)
    dispatch(getCoordinates(coordinates, false));
  }

  return (
    <div className="map">
      <Map
        center={[position.lng, position.lat]}
        zoom={[zoom]}
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
        onDblClick={handleClick}
      >
        <Image id='delivery' url='https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png'/>
        <Source id="point" geoJsonSource={getMapBoxSources({lat: position.lat, lng: position.lng})}/>
        <Layer
          type='symbol'
          id='marker'
          sourceId='point'
          layout={{ 'icon-image': 'delivery', 'icon-size': 0.8 }}
        />
      </Map>
    </div>
  );
};

export default MapBox

