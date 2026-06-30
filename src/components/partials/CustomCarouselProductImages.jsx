import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useMemo, useState } from 'react';

function CustomCarouselProductImages({ images = [], featureImageUrl, productName }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [brokenUrls, setBrokenUrls] = useState([]);

    const carouselImages = useMemo(() => {
        const normalizedImages = [
            featureImageUrl
                ? {
                      public_id: 'feature-image',
                      secure_url: featureImageUrl,
                      thumbnail_url: featureImageUrl,
                  }
                : null,
            ...images,
        ].filter((image) => image?.secure_url);

        return normalizedImages
            .filter(
                (image, index, list) =>
                    list.findIndex((item) => item.secure_url === image.secure_url) === index,
            )
            .filter((image) => !brokenUrls.includes(image.secure_url));
    }, [brokenUrls, featureImageUrl, images]);

    useEffect(() => {
        setActiveIndex(0);
        setBrokenUrls([]);
    }, [featureImageUrl, images]);

    useEffect(() => {
        if (activeIndex > carouselImages.length - 1) {
            setActiveIndex(0);
        }
    }, [activeIndex, carouselImages.length]);

    const handlePrevious = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1,
        );
    };

    const handleNext = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setActiveIndex((prevIndex) =>
            prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const handleImageError = (url) => {
        setBrokenUrls((prevUrls) => (prevUrls.includes(url) ? prevUrls : [...prevUrls, url]));
    };

    const activeImage = carouselImages[activeIndex];

    if (!activeImage) {
        return <div className="animate-pulse rounded-lg bg-blue-gray-200 pt-[100%]" />;
    }

    return (
        <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-lg bg-white pt-[100%]">
                <img
                    src={activeImage.secure_url}
                    alt={productName || activeImage.public_id || 'product'}
                    className="absolute inset-0 h-full w-full object-contain"
                    draggable={false}
                    onError={() => handleImageError(activeImage.secure_url)}
                />

                {carouselImages.length > 1 && (
                    <>
                        <button
                            type="button"
                            aria-label="Ảnh trước"
                            className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-blue-gray-800 shadow-md transition hover:bg-white hover:shadow-lg"
                            onClick={handlePrevious}
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Ảnh tiếp theo"
                            className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-blue-gray-800 shadow-md transition hover:bg-white hover:shadow-lg"
                            onClick={handleNext}
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>

            {carouselImages.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                    {carouselImages.slice(0, 10).map((image, index) => (
                        <button
                            key={`${image.public_id || image.secure_url}-${index}`}
                            type="button"
                            className={`relative aspect-square overflow-hidden rounded border bg-white transition-all ${
                                activeIndex === index
                                    ? 'border-blue-500 ring-2 ring-blue-100'
                                    : 'border-blue-gray-100 hover:border-blue-gray-300'
                            }`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <img
                                src={image.thumbnail_url || image.secure_url}
                                alt={productName || image.public_id || 'product'}
                                className="absolute inset-0 h-full w-full object-cover"
                                draggable={false}
                                onError={() => handleImageError(image.secure_url)}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomCarouselProductImages;
