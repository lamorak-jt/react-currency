import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return(
      <footer class='my-footer'>
        <Link className='footer-item' to='https://www.linkedin.com/in/jacob-townsend-51b4ba55/'>Connect with me</Link>
      </footer>
    );
  }
}
export default Footer;