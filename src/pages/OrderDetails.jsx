import CustomDeliveryServiceCard from '@/components/cards/CustomDeliveryServiceCard';
import CustomOrderPackageCard from '@/components/cards/CustomOrderPackageCard';
import CustomPaymentDetailsCard from '@/components/cards/CustomPaymentDetailsCard';
import CustomPaymentMethodCard from '@/components/cards/CustomPaymentMethodCard';
import CustomShippingAddressCard from '@/components/cards/CustomShippingAddressCard';
import CustomTimeLine from '@/components/partials/CustomTimeLine';
import CustomCurrencyDisplay from '@/components/shared/CustomCurrencyDisplay';
import { orderService } from '@/services';

import { Card, CardBody, CardHeader, Input, Typography } from '@material-tailwind/react';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function OrderDetails() {
    const [isLoading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const { order_uuid } = useParams();

    const handleGetOrderByUuid = async (order_uuid) => {
        try {
            setLoading(true);
            const response = await orderService.getOneOrderByUuidService(order_uuid);
            if (response) {
                const { code, message, result } = response;
                if (code === 'SUCCESS') {
                    setOrderData(result);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetOrderByUuid(order_uuid);
    }, [order_uuid]);

    const items = [
        {
            name: 'Nhẫn',
            feature_image_url:
                'https://www.junie.vn/cdn/shop/files/15_355d0050-104b-4407-9477-14af1eb46987.jpg?v=1693116060&width=700',
            color: 'red',
            price: 12000,
            quantity: 7,
        },
        {
            name: 'Bông tai',
            feature_image_url:
                'https://www.junie.vn/cdn/shop/files/15_355d0050-104b-4407-9477-14af1eb46987.jpg?v=1693116060&width=700',
            color: 'red',
            price: 13000,
            quantity: 78,
        },
        {
            name: 'Vòng cổ',
            feature_image_url:
                'https://www.junie.vn/cdn/shop/files/15_355d0050-104b-4407-9477-14af1eb46987.jpg?v=1693116060&width=700',
            color: 'red',
            price: 17000,
            quantity: 78,
        },
        {
            name: 'Vòng tay',
            feature_image_url:
                'https://www.junie.vn/cdn/shop/files/15_355d0050-104b-4407-9477-14af1eb46987.jpg?v=1693116060&width=700',
            color: 'red',
            price: 18000,
            quantity: 78,
        },
        {
            name: 'vong tay',
            feature_image_url:
                'https://www.junie.vn/cdn/shop/files/15_355d0050-104b-4407-9477-14af1eb46987.jpg?v=1693116060&width=700',
            color: 'red',
            price: 10000,
            quantity: 78,
        },
    ];

    return (
        <div className="py-4">
            <Card className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 bg-transparent p-4 pb-8">
                <CardHeader shadow={false} floated={false} variant="" className="m-0 py-6 px-0">
                    <Typography className="pl-2 text-xl font-semibold">Chi tiết đơn hàng #{order_uuid}</Typography>
                </CardHeader>

                <CardBody className="grid gap-4 p-0">
                    <Typography className="pl-2 text-xl font-semibold">Trạng thái đặt hàng</Typography>

                    <CustomTimeLine data={orderData?.history} />

                    <div className="grid w-full gap-4 md:grid-cols-2">
                        <div className="grid gap-4 p-0">
                            <Typography className="pl-2 text-xl font-semibold">Số điện thoại đặt hàng</Typography>

                            <Typography className="pl-2 text-sm font-medium">
                                {orderData?.customer_phone_number ?? ''}
                            </Typography>

                            <Typography className="pl-2 text-xl font-semibold">Địa chỉ nhận hàng</Typography>

                            <div className="rounded-lg border border-dashed border-blue-gray-100 p-4">
                                <CustomShippingAddressCard {...orderData?.shipping_address} />
                            </div>

                            <Typography className="pl-2 text-xl font-semibold">Vận chuyển</Typography>

                            <div className="rounded-lg border border-dashed border-blue-gray-100 p-4">
                                <CustomDeliveryServiceCard />
                            </div>
                        </div>

                        {orderData?.items && orderData?.items.length > 0 && (
                            <CustomOrderPackageCard data={orderData.items} />
                        )}
                    </div>

                    <hr className="my-10 w-full border-t border-blue-gray-200"></hr>

                    <Typography className="w-full text-xl font-semibold">Phương thức thanh toán</Typography>

                    <div className="grid w-full gap-4 md:grid-cols-2">
                        <CustomPaymentMethodCard {...orderData?.payment_method} />
                        <CustomPaymentDetailsCard data={{ ...orderData }} />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default OrderDetails;
