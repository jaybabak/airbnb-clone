import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

const Booking = ({ secretData, user, onChange, onSubmit, payload, errors, success, onSelect, onSelectTo, dateHelper }) => (

  <Card className="container">
    <CardTitle
      title="Fill out this super short form!"
    />
  {secretData && <CardText style={{ fontSize: '16px', color: 'black' }}><strong>{user.name}</strong>, you are very close to completing your booking.</CardText>}


    <form action="/" onSubmit={onSubmit}>
      <h2 style={{ color: 'cornflowerblue' }} className="card-heading">Book Your Stay</h2>

      <CardText style={{ fontSize: '16px', color: 'green' }}><strong>{success.message}</strong></CardText>

      <div className="field-line">

        <div className="field-line">
          How long will you be booking your stay
        </div>
        <DatePicker hintText="Available From" name="from" container="inline" formatDate={dateHelper} onChange={onSelect} errorText={errors.to} mode="landscape" autoOk={true}/>
        <DatePicker hintText="Available To" name="to" container="inline" formatDate={dateHelper} onChange={onSelectTo} errorText={errors.from} mode="landscape" autoOk={true}/>

      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Add New Listing" primary />
      </div>

    </form>
  </Card>

);

Booking.propTypes = {
  secretData: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default Booking;
