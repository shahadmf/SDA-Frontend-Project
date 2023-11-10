import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

import '../styles/Footer.scss'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="section">
        <div className="aboutUs">
          <h4>About Us</h4>
          <p>
            We started our online store in 2020 with a passion for technology and a desire to share
            the latest innovations with others. Our founder, has over 15 years of experience working
            with electronic devices and has always been fascinated by the constant evolution of
            consumer tech.
          </p>
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">Join Us</a>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div className="section">
        <div className="contact">
          <h4>Contact Us</h4>
          <p>Phone: 123-456-7890</p>
          <p>Email: electro@shop.sa </p>
        </div>
        <div className="footer-social">
          <ul>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
