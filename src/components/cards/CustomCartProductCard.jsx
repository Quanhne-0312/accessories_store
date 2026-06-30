import { cartItemDescrease, cartItemIncrease, cartItemRemove } from '@/redux/actions/cartActions';
import { routes } from '@/routes';
import { TrashIcon } from '@heroicons/react/24/outline';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { IconButton, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomCurrencyDisplay from '../shared/CustomCurrencyDisplay';

export function CustomCartProductCard({ data }) {
    const dispatch = useDispatch();

    return data ? (
        <div className="relative grid w-full grid-cols-3 gap-2 overflow-hidden rounded-lg border border-blue-gray-100 pr-2">
            <div className="relative row-span-2 pt-[100%]">
                <div className="absolute inset-0 overflow-hidden">
                    <img src={data.feature_image_url} alt={data.name} className="h-full w-full object-cover" />
                </div>
            </div>

            <Link className="col-span-2 self-center" to={routes.productDetail.replace(':slug', data.slug)}>
                <Typography className="text-base font-medium line-clamp-1">{data.name}</Typography>
            </Link>

            <CustomCurrencyDisplay className="self-center text-sm font-medium text-red-500" value={data.price} />

            <CustomQuantityEditor
                quantity={data.quantity}
                onIncrease={() => dispatch(cartItemIncrease(data))}
                onDescrease={() => dispatch(cartItemDescrease(data))}
                onRemove={() => dispatch(cartItemRemove(data))}
                className="self-center"
            />
        </div>
    ) : (
        <CustomItemCardSkeleton />
    );
}

CustomCartProductCard.defaultProps = {
    //
};

CustomCartProductCard.propTypes = {
    data: PropTypes.object,
    onPreview: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
};

const CustomQuantityEditor = ({ quantity, className, onIncrease, onDescrease, onRemove }) => {
    return (
        <div className={'flex h-max w-max shrink-0 gap-2 ' + className}>
            <div className="grid  grid-cols-3 border border-blue-gray-100">
                <IconButton variant="text" size="sm" className="rounded-none" onClick={onDescrease}>
                    <MinusIcon className="h-4 w-4" />
                </IconButton>
                <div className="grid place-items-center border-x border-x-blue-gray-100">{quantity}</div>
                <IconButton variant="text" size="sm" className="rounded-none" onClick={onIncrease}>
                    <PlusIcon className="h-4 w-4" />
                </IconButton>
            </div>
            <div className="border border-blue-gray-100">
                <IconButton variant="text" size="sm" className="rounded-none" onClick={onRemove}>
                    <TrashIcon className="h-4 w-4" />
                </IconButton>
            </div>
        </div>
    );
};

const CustomItemCardSkeleton = () => {
    const className1 = 'mb-1 w-[calc(100%-20px)] animate-pulse rounded bg-blue-gray-200 text-[14px] text-transparent';
    const className2 = 'animate-pulse rounded bg-blue-gray-400 text-[10px] text-transparent';
    return (
        <div className="relative flex flex-wrap items-center gap-3 rounded-lg border border-blue-gray-100 p-3 shadow-lg md:flex-nowrap">
            <div className="relative grid w-full grid-cols-4 gap-2 text-blue-gray-500 md:grid-cols-12 md:gap-3">
                <div className="relative row-span-2 pt-[100%] md:col-span-1 md:row-span-1">
                    <div className="absolute inset-0 animate-pulse overflow-hidden rounded bg-blue-gray-200"></div>
                </div>

                <div className="col-span-3 flex flex-col justify-center md:row-span-1">
                    <Typography className={className1}>1</Typography>
                    <Typography className={className2}>2</Typography>
                </div>

                <div className="col-span-3 flex flex-col justify-center md:col-span-2">
                    <Typography className={className1}>1</Typography>
                    <Typography className={className2}>2</Typography>
                </div>

                <div className="col-span-3 flex flex-col justify-center md:col-span-2">
                    <Typography className={className1}>1</Typography>
                    <Typography className={className2}>2</Typography>
                </div>

                {[1, 2, 3].map((item) => (
                    <div key={item} className="flex flex-col justify-center text-center">
                        <Typography className={className1}>1</Typography>
                        <Typography className={className2}>2</Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomCartProductCard;
