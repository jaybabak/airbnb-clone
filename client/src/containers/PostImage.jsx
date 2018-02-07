import React from 'react';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card';

class PostImage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
      // callbackUrl: "http://localhost:3000"

    this.state = {
      img: {},
      src: '',
      alt: '',
      user: {},
      link: ''
    };

    // this.changeUser = this.changeUser.bind(this);
    // this.addPosts = this.addPosts.bind(this);

  }


  //------NEED TO ADDRESS THIS HERE
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

    // console.log('tests');

    const xhrImg = new XMLHttpRequest();
    xhrImg.open('get', 'https://api.unsplash.com/photos/random/');
    xhrImg.setRequestHeader('Authorization', 'Client-ID 2248ae5ea69bc1e72c5bdc6372c148ef33ae355aa285ec2818b4d43cfd549da9');
    xhrImg.responseType = 'json';
    xhrImg.addEventListener('load', () => {
      if (xhrImg.status === 200) {
        // success
        // console.log(xhrImg);

        this.setState({
          img: xhrImg.response,
          src: xhrImg.response.urls.regular,
          author: xhrImg.response.user.name,
          user: xhrImg.response.user,
          link: xhrImg.response.user.links.html
        });

        // console.log(this.state.user);

      } else if (xhrImg.status === 400) {
        // failure
        // const errors = xhrImg.response.errors ? xhrImg.response.errors : {};
        // errors.summary = xhrImg.response.message;
        //
        // console.log(errors);

      }
    });
    xhrImg.send();
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
        <CardText style={{ fontSize: '16px', color: 'brown' }}>
          <img style={{ width: '100%' }} className='row-image' src={this.state.src}/>
        </CardText>
          <div style={{ position: 'absolute', bottom: '0', left: '15px', backgroundColor: 'white', color: 'black', padding: '20px' }} className='row-author'>Photo by
          <a style={{ textDecoration: 'underline', color: 'cornflowerblue' }} href={this.state.link + '?utm_source=airbnb_clone&utm_medium=referral'}> {this.state.author}</a></div>
      </div>
    );
  }
}

PostImage.contextTypes = {
  router: PropTypes.object.isRequired
};


export default PostImage;
