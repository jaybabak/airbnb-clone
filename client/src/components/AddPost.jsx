import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

const AddPost = ({ secretData, user, onChange, onSubmit, payload, errors, success, onSelect, onSelectTo, dateHelper }) => (

  <Card className="container">
    <CardTitle
      title="Add Post"
    />
  {secretData && <CardText style={{ fontSize: '16px', color: 'black' }}><strong>{user.name}</strong>, add a new listing to this clone of AirBnb!</CardText>}


    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Create Your New Listing</h2>

      <CardText style={{ fontSize: '16px', color: 'green' }}><strong>{success.message}</strong></CardText>


      <div className="field-line">
        <TextField
          floatingLabelText="City"
          name="city"
          onChange={onChange}
          errorText={errors.city}
          // value={user.city}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Guests"
          name="guests"
          onChange={onChange}
          errorText={errors.guests}
          // value={user.guests}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Space Type"
          name="type"
          onChange={onChange}
          errorText={errors.type}
          // value={user.type}
        />

        <div className="field-line">
          Dates you would like to rent your place out for:
        </div>
        <DatePicker hintText="Available From" name="from" container="inline" formatDate={dateHelper} onChange={onSelect} errorText={errors.to}/>
        <DatePicker hintText="Available To" name="to" container="inline" formatDate={dateHelper} onChange={onSelectTo} errorText={errors.from}/>

        {/* <SelectField
          floatingLabelText="Space Type"
          value={user.type}
          onChange={this.handleChange}
        >
          <MenuItem value={null} primaryText="" />
          <MenuItem value={false} primaryText="No" />
          <MenuItem value={true} primaryText="Yes" />
        </SelectField> */}


      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Add New Listing" primary />
      </div>

    </form>
  </Card>

);

AddPost.propTypes = {
  secretData: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default AddPost;
