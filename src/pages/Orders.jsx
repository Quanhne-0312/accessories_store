import CustomOrderCard from '@/components/cards/CustomOrderCard';
import CustomConfirmDialog from '@/components/layouts/CustomConfirmDialog';
import { orderService } from '@/services';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function Orders() {
    const [isLoading, setLoading] = useState(false);
    const [dialog, setDialog] = useState({});
    const [orders, setOrders] = useState([]);
    const { isLogged, data: currentUser } = useSelector((state) => state.auth);
    const persistedOrderUuids = useSelector((state) => state.user.orders);
    const orderUuids = useMemo(
        () => (Array.isArray(persistedOrderUuids) ? persistedOrderUuids : []),
        [persistedOrderUuids],
    );
    const orderUuidsKey = orderUuids.join(',');
    let [searchParams, setSearchParams] = useSearchParams();

    const handleGetOrdersBy = async (order_uuids, phone_number) => {
        setLoading(true);
        const response = await orderService.getOrdersByConditionService(order_uuids, phone_number);
        if (response && response.code === 'SUCCESS') {
            setOrders(response.result);
        }
        setLoading(false);
    };

    const refreshOrders = () => {
        if (isLogged) {
            const phoneNumber = currentUser?.phone_number;
            if (phoneNumber) {
                handleGetOrdersBy(null, phoneNumber);
            }
            return;
        }

        const encodedOrderUuids = encodeURIComponent(orderUuidsKey);
        handleGetOrdersBy(encodedOrderUuids, null);
    };

    const handleCloseDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: false,
        }));
    };

    const handleOpenCancelDialog = (order) => {
        setDialog({
            open: true,
            status: 'WARNING',
            title: 'Hủy đơn hàng',
            text: `Xác nhận hủy đơn hàng #${order.order_uuid}?`,
            btnCancel: 'Không',
            btnDelete: 'Hủy đơn',
            handler: handleCloseDialog,
            onCancel: handleCloseDialog,
            onDelete: () => handleCancelOrder(order.order_uuid),
        });
    };

    const handleCancelOrder = async (orderUuid) => {
        setDialog((prevState) => ({
            ...prevState,
            status: 'PENDING',
            text: 'Đang hủy đơn hàng...',
            btnCancel: null,
            btnDelete: null,
        }));

        const response = await orderService.cancelOrderService(orderUuid);

        if (response?.code === 'SUCCESS') {
            setDialog((prevState) => ({
                ...prevState,
                status: 'SUCCESS',
                text: 'Hủy đơn hàng thành công!',
                btnConfirm: 'Đã hiểu',
                onConfirm: () => {
                    handleCloseDialog();
                    refreshOrders();
                },
            }));
        } else {
            setDialog((prevState) => ({
                ...prevState,
                status: 'ERROR',
                text: response?.message || 'Hủy đơn hàng không thành công!',
                btnConfirm: 'Đóng',
                onConfirm: handleCloseDialog,
            }));
        }
    };

    useEffect(() => {
        if (isLogged) {
            const phoneNumber = currentUser?.phone_number;
            if (!phoneNumber) return;

            setSearchParams(`users=${phoneNumber}`);
            handleGetOrdersBy(null, phoneNumber);
        } else {
            const encodedOrderUuids = encodeURIComponent(orderUuidsKey);
            setSearchParams(`orders=${orderUuids.join('+')}`);
            handleGetOrdersBy(encodedOrderUuids, null);
        }
    }, [orderUuidsKey, isLogged, currentUser?.phone_number]);

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
                                <CustomOrderCard data={order} onCancel={isLogged ? handleOpenCancelDialog : undefined} />
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
            <CustomConfirmDialog {...dialog} />
        </div>
    );
}

export default Orders;
