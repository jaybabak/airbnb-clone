import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

// ...

export class MapContainer extends React.Component {

  render() {
      return (
          <Map initialCenter={{ lat: 49.854885, lng: -88.081807 }} zoom={14} style={{width: '100%', height: '325px', display:'block', bottom: '0'}}  google={this.props.google} >

            <Marker name={'Current location'} />

          </Map>
      );
    }


}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBwROdjNZ4EaqLY8hCuYh002kVEWoGVrSM'
})(MapContainer)
