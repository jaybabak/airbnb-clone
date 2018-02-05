import React from 'react';
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import Auth from '../modules/Auth';
import Listing from '../components/Listing.jsx';
import PostImage from '../containers/PostImage.jsx';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';



class ListingPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      user: {},
      data: {}
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

    var arr = [];
    //
    let grabPost = new Promise((resolve, reject) => {

      // console.log(window.location.href);
      var pid = window.location.href.split('/');
      // console.log(pid[4]);

      const xhr = new XMLHttpRequest();
      xhr.open('get', '/api/listing/' + pid[4]);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // set the authorization HTTP header
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          // console.log(xhr.response);

          this.setState({
            data: xhr.response.postData[0],
          });
          // resolve(this.state.user._id);
          console.log(this.state.data);
        }
      });
      xhr.send();

    });
  }


  /**
   * Render the component.
   */
  render() {
    return (

      <div>
        <Card className="container">
          <CardTitle
            title={this.state.data.city}
            subtitle={this.state.data.type}
          />
          <PostImage/>


          <CardTitle
            title='DETAILS'
          />
          <CardText style={{ fontSize: '16px', color: '#F27F3D' }}>
            # of guests allowed: <strong>{this.state.data.guests}</strong><br />
          </CardText>

        </Card>

        {/* <ListingView user={this.state.user} content={this.state.user} /> */}

      </div>
    );
  }

}

export default ListingPage;
