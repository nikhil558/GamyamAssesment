import React from "react";
import { LOGO } from "../utills/constants";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content rounded p-10 flex flex-col sm:flex-row sm:justify-between items-center">
      <nav className="grid grid-flow-col gap-4 mb-4 sm:mb-0">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Address</a>
      </nav>

      <img
        src={LOGO}
        alt="logo"
        className="w-15 h-15 -mb-2 -mt-4 sm:mb-0 sm:mt-0 sm:w-20 sm:h-20"
      />

      <aside className="text-center sm:text-left">
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by Gamyam
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
