import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import OwnListingView from '../containers/OwnListingView.jsx';

const ListingView = ({ user, content }) => (
<div>
  <Card className="container">
    <CardTitle
      title="All Your Listings"
      subtitle="Here's a list of all the listings you for AiroCheap"
    />
  </Card>




    <Card className="container row">
      <CardText style={{ fontSize: '16px', color: 'cornflowerblue' }}>
        UID: <strong>{content}</strong>!<br />
      </CardText>
      {/* <CardText style={{ fontSize: '16px', color: 'cornflowerblue' }}>
        City: <strong>{user.name}</strong>!<br />
      </CardText>
      <CardText style={{ fontSize: '16px', color: 'grey' }}>
        Guests: <strong>{user.name}</strong>!<br />
      </CardText>
      <CardText style={{ fontSize: '16px', color: 'brown' }}>
        Type: <strong>{user.name}</strong>!<br />
      </CardText> */}
    </Card>


</div>
);

export default ListingView;
