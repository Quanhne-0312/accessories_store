import { routes } from '@/routes';
import { Button, Card, Chip, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import CustomCurrencyDisplay from '../shared/CustomCurrencyDisplay';
import CustomTextLoading from '../shared/CustomTextLoading';
import CustomOrderProductCard from './CustomOrderProductCard';

const statusMeta = {
    PROCESSED: { text: 'Đã tiếp nhận', color: 'blue' },
    CONFIRMED: { text: 'Đã xác nhận', color: 'cyan' },
    ON_SHIPPED: { text: 'Đang giao hàng', color: 'amber' },
    FINISHED: { text: 'Hoàn thành', color: 'green' },
    CANCELED: { text: 'Đã hủy', color: 'red' },
};

function CustomOrderCard({ data, onCancel }) {
    const status = data?.status || {};
    const items = Array.isArray(data?.items) ? data.items.filter(Boolean) : [];
    const updatedAt = typeof data?.updatedAt === 'string' ? data.updatedAt.slice(0, 10) : '';
    const meta = statusMeta[status.code] || {
        text: status.description || status.code || 'Trạng thái',
        color: 'blue-gray',
    };
    const canCancel = typeof onCancel === 'function' && [1, 2].includes(Number(status.id));

    return (
        <Card className="p-4">
            {data ? (
                <>
                    <div className="flex items-center justify-between">
                        <Typography className="text-sm font-semibold">{data.order_uuid}</Typography>
                        <Typography className="text-sm font-semibold">{updatedAt}</Typography>
                    </div>
                    <ul className="my-4 grid gap-1 border-y md:grid-cols-3 md:gap-3">
                        {items.slice(0, 3).map((item, index) => (
                            <li key={item.id || item.product_id || item.slug || index}>
                                <CustomOrderProductCard data={item} />
                            </li>
                        ))}
                        {items.length > 3 && (
                            <li className="border-t py-4 md:col-span-3">
                                <Typography className="text-sm font-medium">
                                    Và {items.length - 3} sản phẩm khác
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
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                        <Chip value={meta.text} color={meta.color} className="w-max py-px text-xs" />
                        <div className="flex items-center justify-end">
                            {canCancel && (
                                <Button variant="text" size="sm" color="red" onClick={() => onCancel?.(data)}>
                                    <span className="relative top-px">Hủy đơn</span>
                                </Button>
                            )}
                            <Link to={routes.orderDetails.replace(':order_uuid', data.order_uuid)}>
                                <Button variant="text" size="sm" color="blue">
                                    <span className="relative top-px">Chi tiết</span>
                                </Button>
                            </Link>
                        </div>
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
