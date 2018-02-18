import React from 'react';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types';
import Booking from '../components/Booking.jsx';

class BookingPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      user: {},
      successMsg: '',
      errors: {},
      data: {},
      bookingData: {}
    };

    this.changeUser = this.changeUser.bind(this);
    this.bookPosts = this.bookPosts.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectTo = this.onSelectTo.bind(this);

  }

  //------NEED TO ADDRESS THIS HERE
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

    let bookThis = new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      xhr.open('get', '/api/dashboard');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // set the authorization HTTP header
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          this.setState({user: xhr.response.user, secretData: xhr.response.message});
        }
      });
      xhr.send();

      const thepid = window.location.href.split('/');
      const pid = encodeURIComponent(thepid[4]);

      const xhrGetPost = new XMLHttpRequest();
      xhrGetPost.open('get', '/api/book/' + thepid[4]);
      xhrGetPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // set the authorization HTTP header
      xhrGetPost.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhrGetPost.responseType = 'json';
      xhrGetPost.addEventListener('load', () => {
        if (xhrGetPost.status === 200) {
          const ab = xhrGetPost.response.postData[0];
          this.setState({data: ab});
          console.log(this.state.data);
        }
      });
      xhrGetPost.send();

      const xhrGetBookings = new XMLHttpRequest();
      xhrGetBookings.open('get', '/api/bookings/' + thepid[4]);
      xhrGetBookings.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // set the authorization HTTP header
      xhrGetBookings.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhrGetBookings.responseType = 'json';
      xhrGetBookings.addEventListener('load', () => {
        if (xhrGetBookings.status === 200) {
          const bc = xhrGetBookings.response.bookingData;
          this.setState({bookingData: bc});
          console.log(this.state.bookingData);
        }
      });
      xhrGetBookings.send();

      resolve('Hello')
    });

    bookThis.then((success) => {});

  }

  formatDate(ev) {

    var dd = ev.getDate();
    var mm = ev.getMonth() + 1; //January is 0!
    var yyyy = ev.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    return ev = yyyy + '-' + mm + '-' + dd;
  }

  //LEFT HEREE
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  bookPosts(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // console.log(this.state.user);

    const thepid = window.location.href.split('/');
    // console.log(thepid[4]);

    const resFrom = encodeURIComponent(this.state.user.from);
    const resTo = encodeURIComponent(this.state.user.to);
    const pid = encodeURIComponent(thepid[4]);

    const formData = `pid=${pid}&from=${resFrom}&to=${resTo}`;

    const xhr2 = new XMLHttpRequest();
    xhr2.open('post', '/api/book/' + pid);
    xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr2.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', () => {
      if (xhr2.status === 200) {
        // this.setState({
        //   data: xhr2.response.postData[0],
        //   from: xhr2.response.postData[0].available.from,
        //   to: xhr2.response.postData[0].available.to
        // });
        console.log(xhr2.response)
        // resolve(this.state.user._id);
      }
    });
    xhr2.send(formData);

  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {

    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({user});

  }

  onSelect(event, date) {
    console.log(event + date);
    const xd = this.formatDate(date);
    const user2 = this.state.user;
    // console.log(user2);

    user2['from'] = xd;
    console.log(user2);

    this.setState({user2});
  }

  onSelectTo(event, date) {
    // console.log(event + date);
    const xd2 = this.formatDate(date);
    const user3 = this.state.user;
    // console.log(user3);

    user3['to'] = xd2;
    console.log(user3);

    this.setState({user3});
  }

  /**
   * Render the component.
   */
  render() {
    return (<div>
      <Booking onSubmit={this.bookPosts} onChange={this.changeUser} onSelect={this.onSelect} onSelectTo={this.onSelectTo} pidData={this.state.data} user={this.state.user} errors={this.state.errors} success={this.state.successMsg} dateHelper={this.formatDate} today={this.state.todaysDate}/>
    </div>);
  }
}

BookingPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BookingPage;
