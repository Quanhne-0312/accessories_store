/* eslint-disable react/prop-types */
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const banners = [
    {
        id: 'accessories-ahihi',
        src: 'https://nilsonline.lk/cdn/shop/files/Untitled_design_3.png?v=1782882022&width=1920',
        alt: 'Bộ sưu tập phụ kiện Accessories Ahihi',
        title: 'Accessory',
        subtitle: 'Ahihi',
    },
    {
        id: 'bracelets',
        src: 'https://nilsonline.lk/cdn/shop/files/ChatGPT_Image_Jun_10_2026_05_23_36_PM.png?v=1781092970&width=1920',
        alt: 'Bộ sưu tập vòng tay nữ',
        title: 'Vòng Tay',
        subtitle: 'Tinh Tế',
    },
    {
        id: 'necklaces',
        src: 'https://nilsonline.lk/cdn/shop/files/She_Runs_Cover_01.png?v=1773997662&width=1920',
        alt: 'Bộ sưu tập dây chuyền nữ',
        title: 'Dây Chuyền',
        subtitle: 'Thanh Lịch',
    },
    {
        id: 'earrings',
        src: 'https://nilsonline.lk/cdn/shop/files/ChatGPT_Image_Jun_18_2026_05_56_40_PM.png?v=1781787218&width=1920',
        alt: 'Bộ sưu tập bông tai nữ',
        title: 'Bông Tai',
        subtitle: 'Nổi Bật',
    },
    {
        id: 'rings',
        src: 'https://nilsonline.lk/cdn/shop/files/VERDANT_ESCAPE_WEB_COVER.png?v=1784194356&width=1920',
        alt: 'Bộ sưu tập nhẫn nữ',
        title: 'Nhẫn',
        subtitle: 'Dấu Ấn',
    },
];

const CustomPrevArrow = ({ onClick }) => (
    <button type="button" className="custom-prev-arrow" aria-label="Banner trước" onClick={onClick}>
        <span></span>
    </button>
);

const CustomNextArrow = ({ onClick }) => (
    <button type="button" className="custom-next-arrow" aria-label="Banner tiếp theo" onClick={onClick}>
        <span></span>
    </button>
);

const Slide = ({ banner, isActive, isFirst }) => (
    <div className={`slide ${isActive ? 'active' : ''}`}>
        <img src={banner.src} alt={banner.alt} loading={isFirst ? 'eager' : 'lazy'} decoding="async" />
        <div className="content">
            <span>{banner.title}</span>
            <span>{banner.subtitle}</span>
        </div>
    </div>
);

function CustomCarouselBanner() {
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        pauseOnFocus: true,
        accessibility: true,
        lazyLoad: 'ondemand',
        cssEase: 'ease-in-out',
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: setActiveSlide,
    };

    return (
        <div className="banner" aria-label="Các bộ sưu tập nổi bật">
            <Slider {...settings}>
                {banners.map((banner, index) => (
                    <Slide key={banner.id} banner={banner} isActive={activeSlide === index} isFirst={index === 0} />
                ))}
            </Slider>
        </div>
    );
}

export default CustomCarouselBanner;
