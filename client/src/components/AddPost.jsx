import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const AddPost = ({ secretData, user, onChange, onSubmit, payload }) => (
  <Card className="container">
    <CardTitle
      title="Add Post"
    />
  {secretData && <CardText style={{ fontSize: '16px', color: 'black' }}><strong>{user.name}</strong>, add a new listing to this clone of AirBnb!</CardText>}

    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Create Your New Listing</h2>

      <div className="field-line">
        <TextField
          floatingLabelText="City"
          name="city"
          onChange={onChange}
          value={user.city}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Guests"
          name="guests"
          onChange={onChange}
          value={user.guests}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Space Type"
          name="type"
          onChange={onChange}
          value={user.type}
        />
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
};

export default AddPost;
