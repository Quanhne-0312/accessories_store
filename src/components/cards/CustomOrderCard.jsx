import { Button, Card, Typography } from '@material-tailwind/react';
import React from 'react';
import CustomCurrencyDisplay from '../shared/CustomCurrencyDisplay';
import CustomOrderProductCard from './CustomOrderProductCard';
import CustomTextLoading from '../shared/CustomTextLoading';
import { Link } from 'react-router-dom';
import { routes } from '@/routes';

function CustomOrderCard({ data }) {
    return (
        <Card className="p-4">
            {data ? (
                <>
                    <div className="flex items-center justify-between">
                        <Typography className="text-sm font-semibold">{data.order_uuid}</Typography>
                        <Typography className="text-sm font-semibold">{data.updatedAt.slice(0, 10)}</Typography>
                    </div>
                    <ul className="my-4 grid gap-1 border-y md:grid-cols-3 md:gap-3">
                        {data.items.slice(0, 3).map((item, index) => (
                            <li key={index} className="">
                                <CustomOrderProductCard data={item} />
                            </li>
                        ))}
                        {data.items.length > 3 && (
                            <li className="border-t py-4 md:col-span-3">
                                <Typography className="text-sm font-medium">
                                    Và {data.items.length - 3} sản phẩm khác
                                </Typography>
                            </li>
                        )}
                    </ul>
                    <div className="flex items-end justify-between gap-4">
                        <Typography className="text-sm font-semibold">Thành tiền:</Typography>
                        <CustomCurrencyDisplay
                            className="text-base font-semibold text-red-600"
                            value={Number(data.total)}
                        />
                    </div>
                    <div className="mt-8 flex items-center justify-end">
                        {data.status.id > 1 ? (
                            <Button variant="text" size="sm" color="green">
                                <span className="relative top-px">Đã nhận hàng</span>
                            </Button>
                        ) : (
                            <Button variant="text" size="sm" color="red">
                                <span className="relative top-px">Hủy đơn</span>
                            </Button>
                        )}
                        <Link to={routes.orderDetails.replace(':order_uuid', data.order_uuid)}>
                            <Button variant="text" size="sm" color="blue">
                                <span className="relative top-px">Chi tiết</span>
                            </Button>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <CustomTextLoading width="100px" size="sm" />
                        <CustomTextLoading width="100px" size="sm" />
                    </div>
                    <ul className="my-4 grid gap-1 border-y md:grid-cols-3 md:gap-3">
                        {[1, 2, 3].map((item, index) => (
                            <li key={index} className="h-16"></li>
                        ))}
                    </ul>
                    <div className="flex items-end justify-between gap-4">
                        <CustomTextLoading width="100px" size="sm" />
                        <CustomTextLoading width="100px" size="lg" />
                    </div>
                    <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        <CustomTextLoading width="64px" size="3xl" />
                        <CustomTextLoading width="64px" size="3xl" />
                        <CustomTextLoading width="64px" size="3xl" />
                    </div>
                </>
            )}
        </Card>
    );
}

export default CustomOrderCard;
