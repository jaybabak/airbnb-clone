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
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const Booking = ({ pidData, user, onChange, onSubmit, payload, errors, success, onSelect, onSelectTo, dateHelper, postData, bookings }) => (

  <Card className="container">
    <CardTitle
      title="Fill out this super short form!"
    />


<CardText style={{ fontSize: '16px', color: 'black' }}><strong>{user.name}</strong>, you are very close to completing your reservation.</CardText>


    {/* IMPLEMENTED GOOGLE MAPS LIBRARY INTEGRATION */}
    <MapContainer
      google={window.google} styles={{width:'100%', position: 'inherit'}}
    />

    <form action="/" onSubmit={onSubmit}>
      <h2 style={{ color: 'cornflowerblue' }} className="card-heading">1/1: Book Your Stay for <strong style={{ color: 'black', textDecoration: 'underline'}}>{pidData.city}</strong></h2>

      <CardText style={{ fontSize: '16px', color: 'green' }}><strong>{success.message}</strong></CardText>

      <div className="field-line">

        <div className="field-line">
          How long will you be booking your stay
        </div>
        <DatePicker hintText="Reserve From" name="from" container="inline" formatDate={dateHelper} onChange={onSelect} errorText={errors.to} mode="landscape" autoOk={true}/>
        <DatePicker hintText="Reserve To" name="to" container="inline" formatDate={dateHelper} onChange={onSelectTo} errorText={errors.from} mode="landscape" autoOk={true}/>

      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Book It!" primary />
      </div>

    </form>

    <h1>Reservations For This Listing</h1>

    <CardText style={{ fontSize: '16px', color: 'lightgrey' }}>See below for dates that have been reserved.</CardText>

    <Table selectable={false}>
      <TableHeader adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Date Reserved From</TableHeaderColumn>
          <TableHeaderColumn>Date Reserved Until</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody stripedRows={true} displayRowCheckbox={false}>

      {bookings ? bookings.map((arrs2) =>

        // console.log(arrs2);
        // <div>{arrs2._id}</div>
        // <div style={{color:'grey'}} key={arrs2._id}><span>From: {arrs2.from}</span><span> To: {arrs2.to}</span></div>

        <TableRow key={arrs2._id}>
          <TableRowColumn>{arrs2.from}</TableRowColumn>
          <TableRowColumn>{arrs2.to}</TableRowColumn>
          <TableRowColumn>Confirmed</TableRowColumn>
        </TableRow>

      ) : <TableRow><TableRowColumn>No reservations found!</TableRowColumn></TableRow>}
      </TableBody>
    </Table>

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
