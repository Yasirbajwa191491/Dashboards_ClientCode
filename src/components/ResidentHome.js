import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ResidentHome.css';
import FooterComponent from './FooterComponent';
import ResidentNavbar from './ResidentNavbar';



const ResidentHome = () => {
const navigate=useNavigate()

  const goToPreviousSlide = () => {
    window.$('.carousel').carousel('prev');
  };

  const goToNextSlide = () => {
    window.$('.carousel').carousel('next');
  };
  let checkkey=localStorage.getItem("key")
  let role=localStorage.getItem("role")

  useEffect(()=>{
if(checkkey){
}else{
navigate('/Login')
}
  })
  useEffect(() => {
    // Initialize the carousel when the component mounts
    window.$('.carousel').carousel();
  }, []);
  return (
    <div>
             <div className="ResidentNavbar" >
        <ResidentNavbar />
      </div>
      <div className='carousel-container'>
  
        <div id="carouselExample" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">  <div className="carousel-item active">
            <img
              className="d-block w-100 carousel-image"
              src="/images/garden.jpg"
              alt="First slide"
            />
            <div className="carousel-caption caption-middle">
              <h3 className="carousel-text font-bold">Garden View</h3>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100 carousel-image"
              src="/images/pool.webp"
              alt="Second slide"
            />
            <div className="carousel-caption caption-middle">
              <h3 className="carousel-text font-bold carousel-text-black">Pool View</h3>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100 carousel-image"
              src="/images/hall1.png"
              alt="Third slide"
            />
            <div className="carousel-caption caption-middle">
              <h3 className="carousel-text font-bold carousel-text-black">Party Hall</h3>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExample"
          role="button"
          data-slide="prev"
          onClick={goToPreviousSlide}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExample"
          role="button"
          data-slide="next"
          onClick={goToNextSlide}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
      <div className="text-center mt-4">
        <div className="row">
          <div className="col-md-4">
            <a href="/PatientHome" className="card card-link">
              <img src="/images/neighbour.jpg" className="card-img-top" alt="Meet Neighbours" style={{ height: '200px' }} />
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Meet Your Neighbours</h5>
            
              </div>
            </a>
          </div>
          <div className="col-md-4">
            <a href="/ViewCommitteeMember" className="card card-link">
              <img src="/images/committee.jpg" className="card-img-top" alt="View committee Members" style={{ height: '200px' }} />
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">View Committee Members </h5>
              </div>
            </a>
          </div>
          <div className="col-md-4">
            <a href="/Rules" className="card card-link">
              <img src="/images/rules.jpg" className="card-img-top" alt="Rules & Regulations" style={{ height: '200px' }} />
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Rules & Regulations</h5>
              </div>
            </a>
          </div>
        </div>
  </div>
  <FooterComponent/>
    </div>

      </div>
  );
};

export default ResidentHome;
