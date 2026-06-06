import React from 'react';
import './aboutSection.css';
import { Avatar } from '@material-ui/core';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import photo from '../../../Photo.png';

const About = () => {
  const visitInstagram = () => {
    window.location = 'https://www.instagram.com/shivangrawat__/';
  };

  return (
    <div className="aboutSection">
      <div className="aboutCard">
        <div className="aboutCover">
          <h1>About Us</h1>
        </div>

        <div className="aboutBody">
          <div className="aboutFounder">
            <Avatar
              className="aboutAvatar"
              style={{ width: '120px', height: '120px' }}
              src={photo}
              alt="Founder"
            />
            <h2 className="aboutName">Shivang Rawat</h2>
            <span className="aboutRole">Founder &amp; Developer</span>
            <button className="aboutInstaBtn" onClick={visitInstagram}>
              Visit Instagram
            </button>
            <p className="aboutBio">
              I have a passion for creating high-quality code, and I'm dedicated
              to writing clean, efficient, and maintainable code that can easily
              be adapted and expanded upon in the future. My knowledge of various
              npm libraries and tools enables me to integrate features and
              functionalities into applications with ease.
            </p>
          </div>

          <div className="aboutBrands">
            <h3>Our Brands</h3>
            <p className="aboutBrandsHint">Find more of our work here.</p>
            <div className="aboutBrandLinks">
              <a
                href="https://portfolio-weld-three-33.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="aboutBrandLink portfolio"
                aria-label="Portfolio"
              >
                <LinkIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/shivangrawat30/"
                target="_blank"
                rel="noreferrer"
                className="aboutBrandLink linkedin"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
