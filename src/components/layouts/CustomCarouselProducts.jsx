import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CustomProductCard from '@/components/cards/CustomProductCard';
import { IconButton, Typography } from '@material-tailwind/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

function CustomCarouselProducts({ title, data }) {
    const defaultlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const CustomPrevButton = ({ onClick }) => (
        <div className="absolute left-0.5 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <IconButton
                size="lg"
                color="white"
                variant="outlined"
                className="rounded-none bg-gray-800/80"
                onClick={onClick}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-8 w-8" />
            </IconButton>
        </div>
    );

    const CustomNextButton = ({ onClick }) => (
        <div className="absolute right-0.5 top-1/2 z-10 translate-x-1/2 -translate-y-1/2">
            <IconButton
                size="lg"
                color="white"
                variant="outlined"
                className="rounded-none bg-gray-800/80"
                onClick={onClick}
            >
                <ArrowRightIcon strokeWidth={2} className="h-8 w-8" />
            </IconButton>
        </div>
    );

    const settings = {
        prevArrow: <CustomPrevButton />,
        nextArrow: <CustomNextButton />,
        lazyload: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <>
            <div className="flex flex-col gap-6 py-6">
                <Typography as="h5" className='font-semibold text-2xl text-center'>{title}</Typography>
                <Slider {...settings} className="mx-6">
                    {data
                        ? data.map((item, index) => (
                              <div key={index} className="px-0.5">
                                  <CustomProductCard data={item} />
                              </div>
                          ))
                        : defaultlist.map((item, index) => <CustomProductCard key={index} />)}
                </Slider>
            </div>
        </>
    );
}

export default CustomCarouselProducts;
