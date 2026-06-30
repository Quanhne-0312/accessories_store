import { ChartBarIcon, CheckBadgeIcon, GifIcon, TruckIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import Slider from 'react-slick';

function CustomCarouselService() {
    const settings = {
        prevArrow: <></>,
        nextArrow: <></>,
        lazyload: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const shopData = [
        {
            icon: <TruckIcon className="h-6 w-6" />,
            title: 'MIỄN PHÍ VẬN CHUYỂN',
            text: 'Ship COD & FREESHIP đơn hàng từ 150K',
        },
        {
            icon: <CheckBadgeIcon className="h-6 w-6" />,
            title: 'ĐẢM BẢO CHÍNH HÃNG',
            text: 'Ship COD & FREESHIP đơn hàng từ 150K',
        },
        {
            icon: <GifIcon className="h-6 w-6" />,
            title: 'TÙY CHỌN HỘP QUÀ',
            text: 'Ship COD & FREESHIP đơn hàng từ 150K',
        },
        {
            icon: <ChartBarIcon className="h-6 w-6" />,
            title: 'HỖ TRỢ NHIỆT TÌNH',
            text: 'Ship COD & FREESHIP đơn hàng từ 150K',
        },
    ];

    return (
        <div className="bg-brown-50 py-6 border-t border-white">
            <Slider {...settings} className="mx-6">
                {shopData.map((item, index) => (
                    <div key={index}>
                        <div className="grid place-items-center gap-4">
                            <Typography className="">{item.icon}</Typography>
                            <div>
                                <Typography className="text-center text-sm font-bold uppercase">
                                    {item.title}
                                </Typography>
                                <Typography className="text-center text-sm">{item.text}</Typography>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CustomCarouselService;
