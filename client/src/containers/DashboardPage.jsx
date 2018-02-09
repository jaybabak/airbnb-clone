import React from 'react';
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import ListingView from '../components/ListingView.jsx';
import PostImage from '../containers/PostImage.jsx';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';



class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      user: {},
      dataRow: [],
      temp: ''
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

    var arr = [];

    let grabUser = new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      xhr.open('get', '/api/dashboard');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // set the authorization HTTP header
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {

          this.setState({
            secretData: xhr.response.message,
            user: xhr.response.user,
          });
          resolve(this.state.user._id);
        }
      });
      xhr.send();

    });


    grabUser.then((success) => {

      // console.log(success);
      const uid = encodeURIComponent(success);

      const formData = `uid=${uid}`;
      // console.log(formData);
      // const formData = encodeURIComponent('/api/listings/+'this.state.user._id);

      const getAll = new XMLHttpRequest();
      getAll.open('get', '/api/listings/');
      getAll.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // set the authorization HTTP header
      getAll.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      getAll.responseType = 'json';
      getAll.addEventListener('load', () => {
        if (getAll.status === 200) {




          this.setState({
            dataRow: getAll.response.data
          });

          // console.log(this.state.dataRow);

          var allRows = this.state.dataRow;



          allRows.map(function(listing){


            arr.push(listing);

          });

          // for (var j=0; j< arr.length; j++){
          //   console.log(arr[j]);
          // }
          // console.log(arr);

        }
      });

      getAll.send(formData);



    });

  }

  /**
   * Render the component.
   */
  render() {
    return (

      <div>
        <Dashboard secretData={this.state.secretData} user={this.state.user} />

        <Card className="container">
          <CardTitle
            title="My Listings"
            subtitle="Here's a list of all the listings you have created on Airbnc"
          />
        </Card>

        {/* <ListingView user={this.state.user} content={this.state.user} /> */}

        <div className="listing-wrapper">
          {this.state.dataRow.map((arrs) =>
            <div key={arrs._id}>
              <Card className="container row" style={{ backgroundColor: '#f3f3f3', color: 'white', marginTop: '20px' }}>
                <div style={{ fontSize: '20px', color: 'green', textAlign: 'left', marginLeft: '25px', paddingTop: '20px'}}>Available from: {arrs.available.from}</div>
                <div style={{ fontSize: '20px', color: 'green', textAlign: 'left', marginLeft: '25px', paddingTop: '20px'}}>Available from: {arrs.available.to}</div>
                <PostImage/>
                <CardText style={{ fontSize: '16px', color: 'black' }}>
                  City: <strong>{arrs.city}</strong><br />
                </CardText>
                {/* <CardText style={{ fontSize: '16px', color: 'black' }}>
                  Guests: <strong>{arrs.guests}</strong><br />
                </CardText> */}
                <CardText style={{ fontSize: '16px', color: '#F27F3D' }}>
                  Type: <strong>{arrs.type}</strong><br />
                </CardText>
              <Link to={'/listing/' + arrs._id}><FlatButton style={{ backgroundColor: '#1B4159', color: 'white' }} label="View Listing" /></Link>
              </Card>
            </div> )}
        </div>

      </div>
    );
  }

}

export default DashboardPage;
