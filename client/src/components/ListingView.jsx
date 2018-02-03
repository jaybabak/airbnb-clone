import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card';

const ListingView = ({ user, content }) => (
<li>


{/*
  {this.state.dataRow.map((arrs) => <li key={arrs._id}>{arrs.city}</li> )} */}



    {/* <Card className="container row">
      <CardText style={{ fontSize: '16px', color: 'cornflowerblue' }}>
        City: <strong>{content.city}</strong>!<br />
      </CardText>
      <CardText style={{ fontSize: '16px', color: 'grey' }}>
        Guests: <strong>{content.guets}</strong>!<br />
      </CardText>
      <CardText style={{ fontSize: '16px', color: 'brown' }}>
        Type: <strong>{content.type}</strong>!<br />
      </CardText>
    </Card> */}


</li>
);

export default ListingView;
