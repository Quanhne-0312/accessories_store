import { productService } from '@/services';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import CustomProductCard from '../cards/CustomProductCard';

function CustomBestSellingProductsSection() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const handleGetBestSellingProducts = async () => {
            const firstResponse = await productService.getProductsService('all', 1);
            if (firstResponse?.code !== 'SUCCESS') return;

            const totalPages = Number(firstResponse.total_pages) || 1;
            const otherPages = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => index + 2);
            const otherResponses = await Promise.all(
                otherPages.map((page) => productService.getProductsService('all', page)),
            );

            const allProducts = [firstResponse, ...otherResponses]
                .filter((response) => response?.code === 'SUCCESS')
                .flatMap((response) => response.result || []);

            setProducts(
                allProducts
                    .sort((a, b) => Number(b.sold || 0) - Number(a.sold || 0))
                    .slice(0, 10),
            );
        };

        handleGetBestSellingProducts();
    }, []);

    return (
        <div className="py-8">
            <Typography className="text-center text-base font-medium uppercase">Sản phẩm bán chạy</Typography>

            <div className="mx-auto mt-8 grid max-w-[1440px] gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((item) => (
                    <CustomProductCard data={item} key={item.id || item.slug} />
                ))}
            </div>
        </div>
    );
}

export default CustomBestSellingProductsSection;
