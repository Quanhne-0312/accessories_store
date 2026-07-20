import {
    ChevronDownIcon,
    HandThumbUpIcon,
    ShieldCheckIcon,
    SparklesIcon,
    StarIcon,
    TruckIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';

import CustomDetailsSection, { CustomDetailsSkeleton } from '@/components/layouts/CustomDetailsSection';
import CustomRatingCountSection from '@/components/layouts/CustomRatingCountSection';
import { productService } from '@/services';
import { Accordion, AccordionBody, AccordionHeader, Button, Typography } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import CustomCarouselProductImages from '@/components/partials/CustomCarouselProductImages';
import CustomProductTestimonialSection from '@/components/layouts/CustomProductTestimonialSection';
import DOMPurify from 'dompurify';

function ProductDetails() {
    const [isLoading, setLoading] = useState(false);
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = React.useState(1);
    const requestIdRef = useRef(0);
    const { slug } = useParams();

    const handleGetProductBySlug = async (currentSlug) => {
        const requestId = ++requestIdRef.current;

        try {
            setLoading(true);
            setError(null);
            setProductData(null);

            const response = await productService.getProductBySlugService(currentSlug);
            if (requestId !== requestIdRef.current) return;

            if (response?.code === 'SUCCESS' && response.result) {
                setProductData(response.result);
            } else {
                setError(response?.message || 'Không tìm thấy sản phẩm.');
            }
        } catch (requestError) {
            if (requestId !== requestIdRef.current) return;
            console.log(requestError);
            setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại.');
        } finally {
            if (requestId === requestIdRef.current) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setOpen(1);
        handleGetProductBySlug(slug);

        return () => {
            requestIdRef.current += 1;
        };
    }, [slug]);

    const reservation = [
        {
            icon: <TruckIcon className="h-7 w-7" />,
            text: 'Ship COD & FREESHIP đơn hàng từ 150K',
        },
        {
            icon: <StarIcon className="h-7 w-7" />,
            text: 'Bền màu & thân thiện với làn da',
        },
        {
            icon: <HandThumbUpIcon className="h-7 w-7" />,
            text: 'Đảm bảo chính hãng hoặc hoàn tiền tới 300%',
        },
        {
            icon: <ShieldCheckIcon className="h-7 w-7" />,
            text: 'Bảo hành, đổi mới sản phẩm trong 7 ngày',
        },
        {
            icon: <SparklesIcon className="h-7 w-7" />,
            text: '10.000+ khách hàng hài lòng',
        },
    ];

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <div>
            <div className="mx-auto grid max-w-[1440px] gap-4 p-4 md:grid-cols-2 md:gap-6 md:p-6 lg:gap-8 xl:gap-12">
                <div>
                    {isLoading ? (
                        <div className="animate-pulse rounded-lg bg-blue-gray-200 pt-[100%]" />
                    ) : productData ? (
                        <CustomCarouselProductImages
                            images={productData.images}
                            featureImageUrl={productData.feature_image_url}
                            productName={productData.name}
                        />
                    ) : (
                        <div className="rounded-lg bg-blue-gray-50 pt-[100%]" />
                    )}
                </div>
                <div>
                    {isLoading ? (
                        <CustomDetailsSkeleton />
                    ) : productData ? (
                        <CustomDetailsSection details={productData} />
                    ) : (
                        <div className="my-6 rounded-lg border border-red-100 bg-red-50 p-6">
                            <Typography className="text-center font-medium text-red-700">
                                {error || 'Không tìm thấy sản phẩm.'}
                            </Typography>
                        </div>
                    )}

                    <ul className="grid gap-3 rounded-lg border border-blue-gray-100 p-4">
                        {reservation.map((item, index) => (
                            <li key={index} className="flex list-none">
                                <Typography className="text-sm">{item.icon}</Typography>
                                <Typography className="ml-6 text-xs font-medium text-gray-700 lg:text-base">
                                    {item.text}
                                </Typography>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-between">
                        <Button color="blue" variant="text">
                            Chia sẻ
                        </Button>
                        <Button color="blue" variant="text">
                            Cần trợ giúp?
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mx-auto grid max-w-[1440px] gap-4 px-4 md:grid-cols-2">
                {productData && (
                    <Accordion
                        className="md:col-span-2"
                        open={open === 1}
                        icon={
                            <ChevronDownIcon
                                className={`h-4 w-4 text-blue-gray-400 transition-transform duration-300 ${
                                    open === 1 ? 'rotate-180' : ''
                                }`}
                            />
                        }
                    >
                        <AccordionHeader className="text-lg" onClick={() => handleOpen(1)}>
                            Chi tiết sản phẩm
                        </AccordionHeader>
                        <AccordionBody>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(productData.description || ''),
                                }}
                            />
                        </AccordionBody>
                    </Accordion>
                )}

                <CustomProductTestimonialSection />

                <CustomRatingCountSection />
            </div>
        </div>
    );
}

export default ProductDetails;
