import { productService } from '@/services';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import CustomProductCard from '../cards/CustomProductCard';

function CustomDiscoverSection() {
    const [products, setProducts] = useState([]);

    const shuffleProducts = (items) => [...items].sort(() => Math.random() - 0.5);

    const handleGetProducts = async () => {
        const allProducts = await productService.getAllProductsService();
        setProducts(shuffleProducts(allProducts).slice(0, 20));
    };

    useEffect(() => {
        handleGetProducts();
    }, []);

    return (
        <div className="py-8">
            <Typography className="text-center text-base font-medium uppercase">Không thể bỏ qua</Typography>

            <div className="mx-auto mt-8 grid max-w-[1440px] gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((item) => (
                    <CustomProductCard data={item} key={item.id || item.slug} />
                ))}
            </div>
        </div>
    );
}

export default CustomDiscoverSection;
