import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import MapContainer from '../components/Map.jsx';

const Booking = ({ pidData, user, onChange, onSubmit, payload, errors, success, onSelect, onSelectTo, dateHelper, postData }) => (

  <Card className="container">
    <CardTitle
      title="Fill out this super short form!"
    />


<CardText style={{ fontSize: '16px', color: 'black' }}><strong>{user.name}</strong>, you are very close to completing your reservation.</CardText>


    {/* IMPLEMENTED GOOGLE MAPS LIBRARY INTEGRATION */}
    {/* <MapContainer
      google={window.google}
    /> */}

    <form action="/" onSubmit={onSubmit}>
      <h2 style={{ color: 'cornflowerblue' }} className="card-heading">STEP 1/1: Book Your Stay for <strong style={{ color: 'black', textDecoration: 'underline'}}>{pidData.city}</strong></h2>

      <CardText style={{ fontSize: '16px', color: 'green' }}><strong>{success.message}</strong></CardText>

      <div className="field-line">

        <div className="field-line">
          How long will you be booking your stay
        </div>
        <DatePicker hintText="Reserve From" name="from" container="inline" formatDate={dateHelper} onChange={onSelect} errorText={errors.to} mode="landscape" autoOk={true}/>
        <DatePicker hintText="Reserve To" name="to" container="inline" formatDate={dateHelper} onChange={onSelectTo} errorText={errors.from} mode="landscape" autoOk={true}/>

      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Add New Listing" primary />
      </div>

    </form>

  </Card>

);

Booking.propTypes = {
  pidData: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default Booking;
