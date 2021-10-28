import React from "react";
import "./Footer.css";
import facebook from './facebook.png'
import instagram from './instagram.png'
import twitter from './twitter.png'
import github from './github.png'
import codepen from './codepen.png'
import linkedin from './linkedin.png'
import heart from './heart.png'

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="subfooter">
          <ul>
            <li>
              <a href="https://www.facebook.com/MohammedAkramChaudhary" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="facebook" width="50px" />
                Like My Facebook Page
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/cybertechguruji/" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="instagram" width="50px" />
                Check out My Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com/cybertechguruji" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="twitter" width="50px" />
                See What I Tweet About
              </a>
            </li>
            <li>
              <a href="https://github.com/cybertechguruji" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="gtihub" width="50px" />
                See My Repo on Github
              </a>
            </li>
            <li>
              <a href="https://codepen.io/cybertechguruji" target="_blank" rel="noopener noreferrer">
                <img src={codepen} alt="codepen" width="50px" />
                Copy my Code from Codepen
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/mohammad-akram-c-974b58129/" target="_blank" rel="noopener noreferrer">
                <img src={linkedin} alt="linkedin" width="50px" />
                Message Me on LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div className="subfooter2">
          <div className="menu">
            <a href="/">Blog</a>
            <a href="/">Project</a>
            <a href="/">CheatSheets</a>
            <a href="/">About Me</a>
          </div>
          <div className="end">
            Made with{" "}
            <img src={heart} alt="heart" title="Love" width="20px" /> by{" "}
            <a href="/">CyberTech Guruji</a> | &copy; 2021
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
