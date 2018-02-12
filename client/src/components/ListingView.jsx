import React from 'react';
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import Auth from '../modules/Auth';
import PostImage from '../containers/PostImage.jsx';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

class ListingView extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: [],
      other: ''
    }

  }

  componentDidMount() {

    // var arr = [];
    //
    let grabPost = new Promise((resolve, reject) => {

      // console.log(window.location.href);
      // var pid = window.location.href.split('/');
      // console.log(pid[4]);

      const lvr = new XMLHttpRequest();
      lvr.open('get', '/api/views/random');
      lvr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // set the authorization HTTP header
      lvr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      lvr.responseType = 'json';
      lvr.addEventListener('load', () => {
        if (lvr.status === 200) {
          // console.log(lvr.response);

          this.setState({
            data: lvr.response.data,
          });
          // resolve(this.state.user._id);
          console.log(this.state.data);
        }
      });
      lvr.send();

      resolve()

    });




  }

  render() {
    return (
      <div>
        <Card className="container">
          <CardTitle title="The Latest Listings From Around The Globe" subtitle="Find a place from anywhere." />
        </Card>

      {this.state.data.map((arrs) => <div key={arrs._id}>
          <Card className="container row" style={{ backgroundColor: '#f3f3f3', color: 'white', marginTop: '0px', border: '3px solid #e2e2e2', borderBottom: '6px solid #e2e2e2' }}>
            <CardText style={{ textAlign: 'left', fontSize: '16px', color: 'black' }}>
              Hosted by: <strong>{arrs.author[0].name}</strong><br />
            </CardText>
            <PostImage/>
            <CardText style={{ fontSize: '16px', color: 'black' }}>
              City: <strong>{arrs.city}</strong><br />
            </CardText>
            <CardText style={{ fontSize: '16px', color: 'black' }}>
              Guests: <strong>{arrs.guests}</strong><br />
            </CardText>
            <CardText style={{ fontSize: '16px', color: '#F27F3D' }}>
              Type: <strong>{arrs.type}</strong><br />
            </CardText>
            <CardText style={{ fontSize: '16px', color: '#F27F3D' }}>
              Available From: <strong>{arrs.available.from}</strong><br />
              Available To: <strong>{arrs.available.to}</strong><br />
            </CardText>
          <Link to={'/listing/' + arrs._id}><FlatButton style={{ backgroundColor: '#1B4159', color: 'white' }} label="View Listing" /></Link>
          </Card>
        </div> )}

    </div>
    )
  }
};

export default ListingView;
