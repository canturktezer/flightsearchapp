import React from "react";
import Service1 from "../../assets/service1.jpg";
import Service2 from "../../assets/service2.jpg";
import Service3 from "../../assets/service3.jpg";
import "./services.scss";

const Services = () => {
  return (
    <div className="services">
      <div className="container">
        <div className="service">
          <img src={Service1} alt="" />
          <h3>A Unique Experience in the Heart of the City</h3>
          <span>
            Deserunt ipsum ad esse nulla reprehenderit velit qui ad aliquip
            esse. Qui sunt ad irure est fugiat consectetur fugiat. In duis eu
            eiusmod ad pariatur proident deserunt.
          </span>
          <div className="button">
            <button>Book a hotel</button>
          </div>
        </div>
        <div className="service">
          <img src={Service3} alt="" />
          <h3>Discover Ancient Wonders</h3>
          <span>
            Deserunt ipsum ad esse nulla reprehenderit velit qui ad aliquip
            esse. Qui sunt ad irure est fugiat consectetur fugiat. In duis eu
            eiusmod ad pariatur proident deserunt.
          </span>
          <div className="button">
            <button>Explore the City</button>
          </div>
        </div>
        <div className="service">
          <img src={Service2} alt="" />
          <h3>Rent Your Ride to Adventure</h3>
          <span>
            Deserunt ipsum ad esse nulla reprehenderit velit qui ad aliquip
            esse. Qui sunt ad irure est fugiat consectetur fugiat. In duis eu
            eiusmod ad pariatur proident deserunt.
          </span>
          <div className="button">
            <button>Rent a Car</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
