import { productService } from '@/services';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import CustomProductCard from '../cards/CustomProductCard';

function CustomNewProductsSection() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const handleGetNewProducts = async () => {
            const response = await productService.getProductsService('all', 1);
            if (response?.code === 'SUCCESS') {
                setProducts((response.result || []).slice(0, 5));
            }
        };

        handleGetNewProducts();
    }, []);

    return (
        <div className="py-8">
            <Typography className="text-center text-base font-medium uppercase">Sản phẩm mới</Typography>

            <div className="mx-auto mt-8 grid max-w-[1440px] gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((item) => (
                    <CustomProductCard data={item} key={item.id || item.slug} />
                ))}
            </div>
        </div>
    );
}

export default CustomNewProductsSection;
