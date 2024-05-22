"use server";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-pink-200 text-rose-600">
      <aside>
        <img src="/logo.png" alt="" className="w-40" />
        <p>
          Cosu Store Ltd.
          <br />
          Providing reliable cosplay costume since 1992
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Costume Set</a>
        <a className="link link-hover">Costume Maker</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
