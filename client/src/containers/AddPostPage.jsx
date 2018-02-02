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
      node: '',
      successMsg: '',
      errors: {}
    };

    this.changeUser = this.changeUser.bind(this);
    this.addPosts = this.addPosts.bind(this);

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
    const uid = encodeURIComponent(this.state.user._id);
    const formData = `email=${email}&city=${city}&guests=${guests}&type=${type}&uid=${uid}`;
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

    // console.log(user[field]);

    this.setState({
      user
    });


  }


  /**
   * Render the component.
   */
  render() {
    return (<AddPost onSubmit={this.addPosts} onChange={this.changeUser} secretData={this.state.secretData} user={this.state.user} />);
  }
}

AddPostPage.contextTypes = {
  router: PropTypes.object.isRequired
};


export default AddPostPage;
