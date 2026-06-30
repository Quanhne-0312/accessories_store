import CustomCurrencyDisplay from '@/components/shared/CustomCurrencyDisplay';
import { cartItemAdd } from '@/redux/actions/cartActions';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Button, Rating, Typography } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';

function CustomDetailsSection({ details }) {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        const { id, name, slug, feature_image_url, price } = product;
        dispatch(cartItemAdd({ id, name, slug, feature_image_url, price }));
    };

    return details ? (
        <div className="my-6 grid gap-4">
            <Typography as="h3" className="text-3xl font-semibold">
                {details.name}
            </Typography>
            <CustomCurrencyDisplay className="text-xl font-semibold text-red-600" value={details.price} />
            <Rating value={details.rating ?? 5} readonly />
            <div className="flex items-center justify-between gap-4 md:justify-start">
                <Typography className="text-sm font-normal">Phân loại:</Typography>
                <Typography className="text-sm font-medium uppercase">
                    {details.category_name || details.category || 'Không rõ'}
                </Typography>
            </div>
            <div className="flex items-center justify-between gap-4 md:justify-start">
                <Typography className="text-sm font-normal">Chất liệu:</Typography>
                <Typography className="text-sm font-medium uppercase">
                    {details.material_name || details.material || 'Không rõ'}
                </Typography>
            </div>
            <div className="flex items-center justify-between gap-4 md:justify-start">
                <Typography className="text-sm font-normal">Màu sắc:</Typography>
                <Typography className="text-sm font-medium uppercase">
                    {details.color_name || details.color || 'Không rõ'}
                </Typography>
            </div>

            <Button
                size="lg"
                color="red"
                variant="gradient"
                disabled={details.sold >= details.quantity}
                className="flex items-center justify-center gap-2"
                onClick={() => handleAddToCart(details)}
                fullWidth
            >
                <PlusIcon className="h-5 w-5" />
                Thêm vào giỏ
            </Button>

            <div>
                {details.quantity > details.sold ? (
                    <Typography className="font-medium text-green-600">
                        Còn hàng, dự kiến giao tới trong 2-7 ngày.
                    </Typography>
                ) : (
                    <Typography className="font-medium text-red-600">
                        Hết hàng rồi, bạn quay lại sau nhé!
                    </Typography>
                )}
            </div>

            {details.discount && (
                <div className="rounded-lg border-2 border-dashed bg-brown-50 p-4">
                    <Typography className="font-medium">{details.discount}</Typography>
                </div>
            )}
        </div>
    ) : (
        <CustomDetailsSkeleton />
    );
}

export const CustomDetailsSkeleton = () => (
    <div className="my-6 grid gap-4">
        <div className="w-full animate-pulse rounded bg-blue-gray-200 text-sm text-transparent">1</div>
        <div className="w-1/2 animate-pulse rounded bg-blue-gray-200 text-sm text-transparent">2</div>
        <div className="w-20 animate-pulse rounded bg-blue-gray-200 text-sm text-transparent">3</div>
        <div className="w-20 animate-pulse rounded bg-blue-gray-200 text-sm text-transparent">4</div>
        <div className="w-20 animate-pulse rounded bg-blue-gray-200 text-sm text-transparent">5</div>
        <div className="w-full animate-pulse rounded bg-blue-gray-200 text-sm text-transparent">6</div>

        <div className="h-11 w-full animate-pulse rounded bg-red-600 text-sm text-transparent">7</div>

        <div className="w-full animate-pulse rounded bg-blue-gray-200 text-sm text-transparent">8</div>

        <div className="animate-pulse rounded-lg border-2 border-dashed bg-brown-50 p-4 text-transparent">9</div>
    </div>
);

export default CustomDetailsSection;
