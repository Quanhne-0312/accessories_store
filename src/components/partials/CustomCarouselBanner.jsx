/* eslint-disable react/prop-types */
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

function CustomCarouselBanner() {
    const [activeSlide, setActiveSlide] = useState(0);

    const CustomPaging = () => (
        <a className="slick-pagination">
            <span></span>
        </a>
    );
    const CustomPrevArrow = ({ onClick }) => (
        <button className="custom-prev-arrow" onClick={onClick}>
            <span></span>
        </button>
    );
    const CustomNextArrow = ({ onClick }) => (
        <button className="custom-next-arrow" onClick={onClick}>
            <span></span>
        </button>
    );

    const Slide = ({ isActive }) => (
        <div className={`slide ${isActive ? 'active' : null}`}>
            <img
                src="https://nilsonline.lk/cdn/shop/files/ChatGPT_Image_Jun_18_2026_05_56_40_PM.png?v=1781787218&width=1920"
                alt="banner"
            />
            <div className="content">
                <span>Accessory</span> <span>Ahihi</span>
            </div>
        </div>
    );

    const settings = {
        CustomPaging,
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'ease-in-out',
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (currentSlide) => {
            setActiveSlide(currentSlide);
        },
    };

    return (
        <div className="banner">
            <Slider {...settings}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <Slide key={index} isActive={activeSlide === index} />
                ))}
            </Slider>
        </div>
    );
}

export default CustomCarouselBanner;
