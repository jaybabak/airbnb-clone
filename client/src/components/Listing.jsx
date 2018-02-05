import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Listing = ({ user, content }) => (
  <Card className="container">
    <CardTitle
      title="Listing"
      subtitle="You should get access to this page only after authentication."
    />
  </Card>
);


export default Listing;
