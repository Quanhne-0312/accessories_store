import { IconButton, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import Currency from "../partials/Currency";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";


export function HorizontalProductCard({ data }) {
    const QuantityEditor = ({min, max, value, onUpdate}) => (
        <div className="flex">
            <IconButton variant="text" size="md">
                <MinusIcon className='w-5 h-5'/>
            </IconButton>
            <div className="p-4">{value}</div>
            <IconButton variant="text" size="md">
                <PlusIcon className='w-5 h-5'/>
            </IconButton>
        </div>
    )

    return data ? (
        <div className="relative flex flex-wrap items-center gap-3 rounded-lg border border-blue-gray-100 p-3 shadow-lg md:flex-nowrap">
            <div className="relative grid w-full grid-cols-4 gap-2 text-blue-gray-500 md:grid-cols-12 md:gap-3">
                <div className="relative row-span-2 pt-[100%] md:col-span-1 md:row-span-1">
                    <div className="absolute inset-0 overflow-hidden rounded">
                        <img src={data.feature_image_url} alt={data.name} className="h-full w-full object-cover" />
                    </div>
                </div>

                <div className="col-span-3 flex flex-col justify-center md:row-span-1">
                    <Typography className="text-base font-medium line-clamp-1">{data.name}</Typography>
                    <Typography className="text-sm font-medium line-clamp-1">{data.material}</Typography>
                    <Currency className="text-sm font-medium text-red-500" value={data.price} />
                </div>

                <div className="flex flex-col justify-center text-center">
                    <Typography className="mb-1 text-xs line-clamp-1">Tổng số</Typography>
                    <Typography className="text-sm font-medium">{data.quantity}</Typography>
                </div>

                <div className="flex flex-col justify-center text-center">
                    <Typography className="mb-1 text-xs line-clamp-1">Đã bán</Typography>
                    <Typography className="text-sm font-medium">{data.sold}</Typography>
                </div>
            </div>

            <div className="absolute top-1 right-1"></div>
        </div>
    ) : (
        <HorizontalProductCardSkeleton />
    );
}

HorizontalProductCard.defaultProps = {
    //
};

HorizontalProductCard.propTypes = {
    data: PropTypes.object,
    onUpdate: PropTypes.func,
};

const HorizontalProductCardSkeleton = () => {
    const className1 = "mb-1 w-[calc(100%-20px)] animate-pulse rounded bg-blue-gray-200 text-[14px] text-transparent";
    const className2 = "animate-pulse rounded bg-blue-gray-400 text-[10px] text-transparent";
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

export default HorizontalProductCard;
