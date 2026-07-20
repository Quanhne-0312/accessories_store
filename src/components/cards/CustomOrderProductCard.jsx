import React from 'react';
import CustomCurrencyDisplay from '../shared/CustomCurrencyDisplay';
import { routes } from '@/routes';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

function CustomOrderProductCard({ data }) {
    const item = data && typeof data === 'object' ? data : {};

    return (
        <div className="relative flex gap-2 rounded-lg">
            <div className="w-1/5">
                <div className="relative pt-[100%]">
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={item.feature_image_url || '/img/default-avatar.jpg'}
                            alt={item.name || 'Sản phẩm'}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute top-0 right-0 grid h-5 w-5 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red-300">
                        <span className="text-xs font-medium text-white">{Number(item.quantity) || 0}</span>
                    </div>
                </div>
            </div>

            <div className="flex w-full grid-cols-4 items-center">
                <Link className="block flex-1" to={routes.productDetail.replace(':slug', item.slug || '')}>
                    <Typography className="text-sm font-medium line-clamp-1">{item.name || 'Sản phẩm'}</Typography>
                </Link>

                <CustomCurrencyDisplay
                    className="shrink-0 text-sm font-medium"
                    value={(Number(item.price) || 0) * (Number(item.quantity) || 0)}
                />
            </div>
        </div>
    );
}

export default CustomOrderProductCard;
