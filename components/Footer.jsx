import Link from "next/link";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 OvoSK Store All rights reserved</p>
      <p className="icons" style={{ cursor: "pointer" }}>
        <a href="https://www.instagram.com/oliver_19263/" target="_blank">
          <AiFillInstagram />
        </a>
        <a href="https://discord.gg/rVPnY987vw" target="_blank">
          <FaDiscord />
        </a>
      </p>
      <a href="https://www.freepik.com/vectors/star-shape">
        Star shape vector created by rawpixel.com - www.freepik.com
      </a>
      <a href="https://www.freepik.com/vectors/bullhorn">
        Bullhorn vector created by gstudioimagen - www.freepik.com
      </a>
      <a href="https://www.flaticon.com/free-icons/ticket" title="ticket icons">
        Ticket icons created by Freepik - Flaticon
      </a>
      <a
        href="https://www.flaticon.com/free-icons/confetti"
        title="confetti icons"
      >
        Confetti icons created by Freepik - Flaticon
      </a>
      <a href="https://www.flaticon.com/free-icons/robot" title="robot icons">
        Robot icons created by Pixel perfect - Flaticon
      </a>
      <a href="https://www.flaticon.com/free-icons/talk" title="talk icons">
        Talk icons created by Freepik - Flaticon
      </a>
      <a href="https://www.flaticon.com/free-icons/hand" title="hand icons">
        Hand icons created by smalllikeart - Flaticon
      </a>
      <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">
        Gift icons created by srip - Flaticon
      </a>
    </div>
  );
};

export default Footer;
