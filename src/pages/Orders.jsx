import CustomOrderCard from '@/components/cards/CustomOrderCard';
import { orderService } from '@/services';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function Orders() {
    const [isLoading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const { isLogged, data: currentUser } = useSelector((state) => state.auth);
    const orderUuids = useSelector((state) => state.user.orders);
    let [searchParams, setSearchParams] = useSearchParams();

    const handleGetOrdersBy = async (order_uuids, phone_number) => {
        setLoading(true);
        const response = await orderService.getOrdersByConditionService(order_uuids, phone_number);
        if (response && response.code === 'SUCCESS') {
            setOrders(response.result);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isLogged) {
            setSearchParams(`users=${currentUser.phone_number}`);
            handleGetOrdersBy(null, currentUser.phone_number);
        } else {
            const encodedOrderUuids = encodeURIComponent(orderUuids.join(','));
            setSearchParams(`orders=${orderUuids.join('+')}`);
            handleGetOrdersBy(encodedOrderUuids, null);
        }
    }, [orderUuids, isLogged, currentUser]);

    return (
        <div>
            <div className="mx-auto my-0 flex w-full max-w-[1440px] flex-col gap-4 bg-transparent p-4">
                <ul className="grid gap-6">
                    {isLoading ? (
                        Array(5)
                            .fill(1)
                            .map((item, index) => (
                                <li key={index} className="mt-4">
                                    <CustomOrderCard />
                                </li>
                            ))
                    ) : orders.length > 0 ? (
                        orders.map((order, index) => (
                            <li key={index} className="mt-4">
                                <CustomOrderCard data={order} />
                            </li>
                        ))
                    ) : (
                        <Card>
                            <CardBody className="flex h-screen items-center justify-center">
                                <Typography className="text-center text-xl font-semibold">
                                    Không tìm thấy đơn hàng của bạn!
                                </Typography>
                            </CardBody>
                        </Card>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Orders;
