import React from 'react';
import './Banner.css'
import hotDeal from '../../images/hot_deal.png';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='hot_deal'>
            <img src={hotDeal} alt="" />
            <div className="hot_deal_content">
                <div className="time-circle">
                    <div className="single-time-circle">
                        <h4>02</h4>
                        <span>DAYS</span>
                    </div>
                    <div className="single-time-circle">
                        <h4>10</h4>
                        <span>HOURS</span>
                    </div>
                    <div className="single-time-circle">
                        <h4>34</h4>
                        <span>MINS</span>
                    </div>
                    <div className="single-time-circle">
                        <h4>60</h4>
                        <span>SECS</span>
                    </div>
                </div>
                <h2>hot deal this week</h2>
                <span>New Collection Up to 50% OFF</span> <br />
                <button><Link to="/products">SHOP NOW</Link></button>
            </div>
        </div>
    );
};

export default Banner;