import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Dashboard = ({ secretData, user, content }) => (
  <Card className="container">
  {secretData && <CardText style={{ fontSize: '16px', color: 'cornflowerblue' }}>Welcome <strong>{user.name}</strong>!<br />{secretData}</CardText>}

  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
