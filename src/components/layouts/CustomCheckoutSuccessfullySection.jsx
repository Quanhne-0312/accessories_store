import { routes } from '@/routes';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

function CustomCheckoutSuccessfullySection({ order_uuid }) {
    return (
        <Card className="my-16 w-full max-w-[1440px] md:col-span-2">
            <CardBody className="grid place-items-center gap-4 py-32">
                <div>
                    <CheckCircleIcon className="h-32 w-32 text-green-800 md:h-40 md:w-40" />
                </div>
                <Typography as="h3" className="text-2xl font-semibold uppercase md:text-5xl">
                    Đặt hàng thành công!
                </Typography>
                <Typography as="h3" className="text-xl font-medium text-gray-500">
                    Mã đơn hàng:
                    {order_uuid ? (
                        <Link to={routes.orderDetails.replace(':order_uuid', order_uuid)}>
                            <strong className="ml-1 text-blue-600 hover:underline">{order_uuid}</strong>
                        </Link>
                    ) : (
                        <strong className="ml-1 text-blue-600 hover:underline">Đơn hàng không tồn tại</strong>
                    )}
                </Typography>
                <Typography as="h3" className="text-center text-sm font-medium md:text-base">
                    {order_uuid
                        ? 'Nhân viên cửa hàng sẽ liên lạc với bạn trong thời gian sớm nhất!'
                        : 'Vui lòng kiểm tra lại email xác nhận đơn hàng!'}
                </Typography>
                <div className="flex flex-wrap items-center justify-center gap-4 md:flex-nowrap">
                    <Link to={routes.orders}>
                        <Button variant="gradient" color="blue">
                            Kiểm tra
                        </Button>
                    </Link>
                    <Link to={routes.home}>
                        <Button variant="gradient" color="blue">
                            Trang chủ
                        </Button>
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
}

export default CustomCheckoutSuccessfullySection;
