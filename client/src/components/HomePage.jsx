import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
import ListingView from '../components/ListingView.jsx';

class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    // this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <div>
        <Card className="container">
          <CardTitle title="Rent Out or Rent Exotics!" subtitle="Sign up or Sign in!" />
            {Auth.isUserAuthenticated() ? (
              <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</CardText>
            ) : (
              <CardText style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</CardText>
            )}

            <ListingView/>

        </Card>
    </div>
    )
  }
};

export default HomePage;
