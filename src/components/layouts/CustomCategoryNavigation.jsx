import { routes } from '@/routes';
import { productService } from '@/services';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import CustomCategoryCard from '../cards/CustomCategoryCard';

const categoryImages = {
    'vong-tay': 'https://www.junie.vn/cdn/shop/files/vong-tay.jpg?v=1684540808&width=500',
    'day-chuyen': 'https://www.junie.vn/cdn/shop/files/day-chuyen.jpg?v=1684540701&width=500',
    'khuyen-tai':
        'https://www.junie.vn/cdn/shop/files/bong-tai_0c309e72-86e8-412d-af00-d1ddc9fc88d4.jpg?v=1684540671&width=500',
    nhan: 'https://www.junie.vn/cdn/shop/files/nhan_852d9375-b273-49f1-92b8-eb71d0342dff.jpg?v=1684540889&width=500',
    'kinh-mat': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
};

const fallbackCategoryImage =
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80';

function CustomCategoryNavigation() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const handleGetCategories = async () => {
            const response = await productService.getCategoriesService();
            if (response?.code === 'SUCCESS') {
                setCategories(response.result || []);
            }
        };

        handleGetCategories();
    }, []);

    return (
        <div className="py-8">
            <Typography className="text-center text-base font-medium uppercase">Mua sắm theo danh mục</Typography>

            <div className="mx-auto mt-8 grid max-w-[1440px] gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
                {categories.slice(0, 4).map((item) => (
                    <CustomCategoryCard
                        key={item.slug}
                        path={routes.category.replace(':slug', item.slug)}
                        title={item.name}
                        image_url={categoryImages[item.slug] || fallbackCategoryImage}
                    />
                ))}
            </div>
        </div>
    );
}

export default CustomCategoryNavigation;
