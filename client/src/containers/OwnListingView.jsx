import React from 'react';
import Auth from '../modules/Auth';
import ListingView from '../components/ListingView.jsx';


class OwnListingView extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      city: null,
      guests: null,
      type: null
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {


  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <Card className="container row">
          <CardText style={{ fontSize: '16px', color: 'cornflowerblue' }}>
            UID: <strong>{user.name}</strong>!<br />
          </CardText>
          <CardText style={{ fontSize: '16px', color: 'cornflowerblue' }}>
            City: <strong>{user.name}</strong>!<br />
          </CardText>
          <CardText style={{ fontSize: '16px', color: 'grey' }}>
            Guests: <strong>{user.name}</strong>!<br />
          </CardText>
          <CardText style={{ fontSize: '16px', color: 'brown' }}>
            Type: <strong>{user.name}</strong>!<br />
          </CardText>
        </Card>
      </div>
    );
  }

}

export default OwnListingView;
