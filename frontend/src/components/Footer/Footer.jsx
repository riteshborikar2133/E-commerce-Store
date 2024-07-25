// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h2 className="footer-title">About Us</h2>
                    <p>
                        We are an e-commerce company dedicated to providing the best online shopping experience. Our mission is to offer high-quality products at affordable prices.
                    </p>
                </div>
                <div className="footer-section links">
                    <h2 className="footer-title">Quick Links</h2>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        {/* <li><a href="/shop">Shop</a></li> */}
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/about">About Us</a></li>
                    </ul>
                </div>
                <div className="footer-section social">
                    <h2 className="footer-title">Follow Us</h2>
                    <div className="social-icons">
                        {/* <a href="https://facebook.com" className="social-icon"><i className="fab fa-facebook-f"></i></a> */}
                        <a href="https://github.com/riteshborikar2133" className="social-icon"><i className="fab fa-github"></i></a>
                        <a href="https://instagram.com" className="social-icon"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/ritesh-borikar-aa980525a/" className="social-icon"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Ritesh Borikar's E-commerce Site | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
