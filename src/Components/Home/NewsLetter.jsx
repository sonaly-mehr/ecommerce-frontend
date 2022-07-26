import React from 'react';
import { AiOutlineTwitter, AiOutlineInstagram} from 'react-icons/ai';
import { FaFacebookF, FaPinterest } from 'react-icons/fa';
import { GrMail } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import './NewsLetter.css'

const NewsLetter = () => {
    return (
        <div className='news_letter_section'>
                <HiOutlineMail className='mail'/>
            <h4>Sign Up for the <span>NEWSLETTER</span></h4>
            <form action="" className='letter-form'>
                <input type="email" placeholder='Enter Your Email'/>
                <button type='submit'><GrMail style={{marginRight:'5px', position:'relative', top:'2px'}}/>Submit</button>
            </form>

            <div className="social-links">
                <ul>
                    <li><a href=""><FaFacebookF/></a></li>
                    <li><a href=""><AiOutlineTwitter /></a></li>
                    <li><a href=""><AiOutlineInstagram/></a></li>
                    <li><a href=""><FaPinterest/></a></li>
                </ul>
            </div>
            
        </div>
    );
};

export default NewsLetter;