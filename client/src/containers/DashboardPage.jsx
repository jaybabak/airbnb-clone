import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import ListingView from '../components/ListingView.jsx';


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

      console.log(success);
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

          console.log(this.state.dataRow);

          var allRows = this.state.dataRow;

          var arr = [];

          allRows.map(function(listing){


            arr.push(listing);

          });

          for (var j=0; j< arr.length; j++){
            console.log(arr[j]);
          }
          console.log(arr);

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
        <ListingView user={this.state.user} content='sddf' />
      </div>
    );
  }

}

export default DashboardPage;
