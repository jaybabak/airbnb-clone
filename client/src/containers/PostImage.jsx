import React from 'react';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card';
// import Unsplash from 'unsplash-js';

class PostImage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // const unsplash = new Unsplash({
    //   applicationId: "2248ae5ea69bc1e72c5bdc6372c148ef33ae355aa285ec2818b4d43cfd549da9",
    //   secret: "877d669e82dec89f81a04c69fd595f9e47a165227bcb3e0e977edb513e2adb86",
    // });

      // callbackUrl: "http://localhost:3000"

    this.state = {
      imageSrc: ''
    };

    // this.changeUser = this.changeUser.bind(this);
    // this.addPosts = this.addPosts.bind(this);

  }


  //------NEED TO ADDRESS THIS HERE
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

    // var randomPhoto = unsplash.getRandomPhoto({
    //   width: '1920',
    //   height: '1080',
    // }).then(toJson).then(json => {
    //
    //   console.log(json);
    //
    // });

    // console.log(randomPhoto);

    // const xhr = new XMLHttpRequest();
    // xhr.open('get', '/api/dashboard');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // // set the authorization HTTP header
    // xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     this.setState({
    //       user: xhr.response.user,
    //       secretData: xhr.response.message,
    //     });
    //   }
    // });
    // xhr.send();

  }


  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <CardText style={{ fontSize: '16px', color: 'brown' }}>
          Test Image
        </CardText>
      </div>
    );
  }
}

PostImage.contextTypes = {
  router: PropTypes.object.isRequired
};


export default PostImage;
