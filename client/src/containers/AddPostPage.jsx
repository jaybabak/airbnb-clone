import React from 'react';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types';
import AddPost from '../components/AddPost.jsx';



class AddPostPage extends React.Component {

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
      todaysDate: ''
    };

    this.changeUser = this.changeUser.bind(this);
    this.addPosts = this.addPosts.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectTo = this.onSelectTo.bind(this);

  }


  //------NEED TO ADDRESS THIS HERE
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          user: xhr.response.user,
          secretData: xhr.response.message,
        });
      }
    });
    xhr.send();

  }


  formatDate(ev){

    // console.log(ev.getDate());


    var dd = ev.getDate();
    var mm = ev.getMonth()+1; //January is 0!

    var yyyy = ev.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    return ev = mm+'-'+dd+'-'+yyyy;
    // console.log(today);

  }

//LEFT HEREE
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  addPosts(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // this.setState({
    //   user: {
    //     city: 'O',
    //     guests: '2',
    //     type: '3'
    //   },
    // });

    // create a string for an HTTP body message
    // const user = encodeURIComponent(this.state.user);
    const city = encodeURIComponent(this.state.user.city);
    const guests = encodeURIComponent(this.state.user.guests);
    const type = encodeURIComponent(this.state.user.type);
    const email = encodeURIComponent(this.state.user.email);
    const avaFrom = encodeURIComponent(this.state.user.from);
    const avaTo = encodeURIComponent(this.state.user.to);
    const uid = encodeURIComponent(this.state.user._id);
    const formData = `email=${email}&city=${city}&guests=${guests}&type=${type}&uid=${uid}&from=${avaFrom}&to=${avaTo}`;
    // const formData = `data=false`;

    // console.log(this.state.user._id);

    const xhr3 = new XMLHttpRequest();
    xhr3.open('post', 'api/add');
    xhr3.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr3.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr3.responseType = 'json';
    xhr3.addEventListener('load', () => {
      if (xhr3.status === 200) {
        // success
        console.log(xhr3);
        this.setState({
          successMsg: xhr3.response
        });

      } else if (xhr3.status === 400) {
        // failure
        const errors = xhr3.response.errors ? xhr3.response.errors : {};
        errors.summary = xhr3.response.message;

        console.log(errors);

        this.setState({
          errors
        });
      }
    });
    xhr3.send(formData);
  }


//issue can be here with the storing of data since this function is not

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {

    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });


  }

  onSelect(event, date) {
    // console.log(event + date);
    const xd = this.formatDate(date);
    const user2 = this.state.user;
    // console.log(user2);

    user2['from'] = xd;
    // console.log(user2);

    this.setState({
      user2
    });
  }

  onSelectTo(event, date) {
    // console.log(event + date);
    const xd2 = this.formatDate(date);
    const user3 = this.state.user;
    // console.log(user2);

    user3['to'] = xd2;
    console.log(user3);

    this.setState({
      user3
    });
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <AddPost onSubmit={this.addPosts} onChange={this.changeUser} onSelect={this.onSelect} onSelectTo={this.onSelectTo} secretData={this.state.secretData} user={this.state.user} errors={this.state.errors} success={this.state.successMsg} dateHelper={this.formatDate} today={this.state.todaysDate}/>
      </div>
    );
  }
}

AddPostPage.contextTypes = {
  router: PropTypes.object.isRequired
};


export default AddPostPage;
