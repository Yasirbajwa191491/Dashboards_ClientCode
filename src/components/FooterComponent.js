import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="mt-4 footer-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <h5>Contact Us</h5>
            <hr className="short-hr" />
            <p className="footer-text">
              Pearl City Appartments,<br />
              Hiranandani Gardens<br />
              Powai, Mumbai - 400075<br /><br />
              peralcityapparments@gmail.com
            </p>
          </div>
          <div className="col-md-4 col-sm-6">
            <h5>Amenities</h5>
            <hr className="short-hr" />
            <p className="footer-text">
              Swimming Pool<br />
              Club House<br />
              Garden<br />
              Fitness Center<br />
              Sports Facilities<br />
              Event Hall<br />
              Children's Play Area<br />
            </p>
          </div>
          <div className="col-md-4 col-sm-6">
            <h5>Environmental Initiatives</h5>
            <hr className="short-hr" />
            <p className="footer-text">
              Solar Power Generation<br />
              Rainwater Harvesting<br />
              Waste Segregation<br />
              Community Garden<br />
              Energy-Efficient Lighting<br />
              E-Waste Recycling<br />
              Plastic-Free Zone<br />
              Green Roof Projects<br />
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p className="footer-text">
              &copy; 2023 Pearl City Appartments. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
