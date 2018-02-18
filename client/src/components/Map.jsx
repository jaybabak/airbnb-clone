import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

// ...

export class MapContainer extends React.Component {

  // constructor(props) {
  //    super(props);
  //    console.log(this);
  //
  //    this.state = {
  //      locCity: props.cityName
  //    }
  //
  //    this.
  //
  //  }
  //
  //
  // componentDidMount() {
  //
  //   //
  //   // console.log(this);
  //
  //   this.setState({
  //     locCity: this.props.cityName
  //   });
  //
  //
  //   console.log(this.state.locCity);
  //
  //
  // }

  render() {

      return (
          <Map
            initialCenter={{ lat: 40.854885, lng: -88.081807 }}
            zoom={14}
            style={{width: '100%', height: '325px', display:'block', position:'static'}}
            className="mappy"
            google={this.props.google} >

            <Marker name={'Current location'} />
          </Map>
      );
    }


}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBwROdjNZ4EaqLY8hCuYh002kVEWoGVrSM'
})(MapContainer)
