import React from 'react';
import './Contact.css';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Contact = () => {
  return (
    <div className="contactContainer">
      <div className="contactCard">
        <h1 className="contactHeading">Get in Touch</h1>
        <p className="contactSubtitle">
          Have a question or just want to say hi? Reach out on any of these.
        </p>

        <a
          className="contactRow mailBtn"
          href="mailto:rawatshivang30@gmail.com"
        >
          <span className="contactIcon" style={{ color: '#F2A60C' }}>
            <EmailIcon fontSize="large" />
          </span>
          <span className="contactRowText">
            <span className="contactLabel">Email</span>
            <span className="contactValue">rawatshivang30@gmail.com</span>
          </span>
          <span className="contactArrow">→</span>
        </a>

        <a
          className="contactRow linkedInBtn"
          href="https://www.linkedin.com/in/shivangrawat30/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="contactIcon" style={{ color: '#0A66C2' }}>
            <LinkedInIcon fontSize="large" />
          </span>
          <span className="contactRowText">
            <span className="contactLabel">LinkedIn</span>
            <span className="contactValue">shivangrawat30</span>
          </span>
          <span className="contactArrow">→</span>
        </a>

        <a
          className="contactRow twitterBtn"
          href="https://twitter.com/shivangrawaat"
          target="_blank"
          rel="noreferrer"
        >
          <span className="contactIcon" style={{ color: '#1DA1F2' }}>
            <TwitterIcon fontSize="large" />
          </span>
          <span className="contactRowText">
            <span className="contactLabel">Twitter</span>
            <span className="contactValue">shivangrawaat</span>
          </span>
          <span className="contactArrow">→</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
