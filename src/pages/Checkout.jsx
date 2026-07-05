import CustomDeliveryServiceCard from '@/components/cards/CustomDeliveryServiceCard';
import CustomOrderPackageCard from '@/components/cards/CustomOrderPackageCard';
import CustomPaymentDetailsCard from '@/components/cards/CustomPaymentDetailsCard';
import CustomSelectPaymentMethodCard from '@/components/cards/CustomSelectPaymentMethodCard';
import CustomSelectShippingAddressCard from '@/components/cards/CustomSelectShippingAddressCard';
import CustomVoucherSubmitForm from '@/components/layouts/CustomVoucherSubmitForm';
import { cartItemRemoveAll } from '@/redux/actions/cartActions';
import { userPlaceNewOrder } from '@/redux/actions/userAction';
import { persistor } from '@/redux/store';
import { routes } from '@/routes';
import { orderService } from '@/services';
import { Button, Input, Spinner, Textarea, Typography } from '@material-tailwind/react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const voucherRules = {
    NEW10: {
        code: 'NEW10',
        percent: 10,
        minSubtotal: 0,
        description: 'Giảm 10% đơn hàng',
    },
    YAY15: {
        code: 'YAY15',
        percent: 15,
        minSubtotal: 500000,
        description: 'Giảm 15% cho đơn hàng từ 500.000 đ',
    },
    WOW20: {
        code: 'WOW20',
        percent: 20,
        minSubtotal: 1000000,
        description: 'Giảm 20% cho đơn hàng từ 1.000.000 đ',
    },
};

function Checkout() {
    const [isLoading, setLoading] = useState(false);
    const [allowCheckout, setAllowCheckout] = useState(false);
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [shippingAddress, setShippingAddress] = useState({});
    const [orderNote, setOrderNote] = useState('');
    const [paymentMethod, setPaymentMethod] = useState({});
    const [paymentDetails, setPaymentDetails] = useState({});
    const [appliedVoucher, setAppliedVoucher] = useState(null);

    const { isLogged, data: currentUser } = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const discountAmount = useMemo(() => {
        if (!appliedVoucher || cart.subtotal < appliedVoucher.minSubtotal) {
            return 0;
        }

        return Math.floor((cart.subtotal * appliedVoucher.percent) / 100);
    }, [appliedVoucher, cart.subtotal]);

    useEffect(() => {
        setPaymentDetails({
            subtotal: cart.subtotal,
            shipping_fee: 0,
            discount: discountAmount,
            total: Math.max(cart.subtotal - discountAmount, 0),
            voucher_code: discountAmount > 0 ? appliedVoucher?.code : null,
        });

        return () =>
            setPaymentDetails({
                subtotal: 0,
                shipping_fee: 0,
                discount: 0,
                total: 0,
                voucher_code: null,
            });
    }, [appliedVoucher, cart.subtotal, discountAmount]);

    useEffect(() => {
        if (isLogged && currentUser?.phone_number) {
            setCustomerPhoneNumber(currentUser.phone_number);
        }

        return () => setCustomerPhoneNumber('');
    }, [currentUser?.phone_number, isLogged]);

    useEffect(() => {
        setAllowCheckout(cart.quantity > 0);

        return () => setAllowCheckout(false);
    }, [cart.quantity]);

    const handleApplyVoucher = (voucherCode) => {
        const code = voucherCode.trim().toUpperCase();
        const rule = voucherRules[code];

        if (!rule) {
            setAppliedVoucher(null);
            return {
                success: false,
                message: 'Mã giảm giá không hợp lệ.',
            };
        }

        if (cart.subtotal < rule.minSubtotal) {
            setAppliedVoucher(null);
            return {
                success: false,
                message: `Đơn hàng cần tối thiểu ${rule.minSubtotal.toLocaleString('vi-VN')} đ để dùng mã ${code}.`,
            };
        }

        setAppliedVoucher(rule);
        return {
            success: true,
            message: `Đã áp dụng ${code}: ${rule.description}.`,
        };
    };

    const handleRemoveVoucher = () => {
        setAppliedVoucher(null);
    };

    const handleCheckout = async () => {
        try {
            setLoading(true);
            const response = await orderService.checkoutService({
                customerPhoneNumber,
                shippingAddress,
                paymentMethod,
                paymentDetails,
                note: orderNote,
                items: cart.items,
            });
            if (response) {
                const { code, result } = response;
                if (code === 'SUCCESS') {
                    const orderUuid = result?.order_uuid || result;

                    if (orderUuid) {
                        sessionStorage.setItem('checkoutSuccessOrderUuid', orderUuid);
                    }

                    dispatch(cartItemRemoveAll());
                    dispatch(userPlaceNewOrder(orderUuid));
                    await persistor.flush();
                    navigate(routes.checkoutSuccess, {
                        replace: true,
                        state: {
                            orderUuid,
                        },
                    });
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-brown-50">
            <div className="mx-auto grid min-h-screen max-w-[1440px] gap-4 md:grid-cols-2">
                <div className="grid w-full gap-4 bg-white p-4">
                    <div className="grid gap-4 p-0">
                        <Typography className="text-xl font-semibold">Liên hệ</Typography>

                        {!isLogged && (
                            <div className="flex items-end justify-end gap-1 p-0 leading-3">
                                <span className="text-xs">Bạn đã có tài khoản?</span>
                                <Link to={routes.login} className="block p-0">
                                    <span className="text-xs font-medium text-blue-500 underline">Đăng nhập</span>
                                </Link>
                            </div>
                        )}

                        <Input
                            size="lg"
                            color="blue"
                            label="Số điện thoại"
                            pattern="0+[0-9]{9}"
                            value={customerPhoneNumber}
                            readOnly={isLogged}
                            onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                        />
                    </div>

                    <CustomSelectShippingAddressCard
                        data={shippingAddress}
                        onChangeAddress={(value) => setShippingAddress(value)}
                    />

                    <Textarea
                        color="blue"
                        resize={false}
                        label="Lưu ý cho người bán hàng"
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                    />

                    <Typography className="text-xl font-semibold">Vận chuyển</Typography>

                    <div className="rounded-lg border border-dashed border-blue-gray-100 p-4">
                        <CustomDeliveryServiceCard />
                    </div>

                    <CustomSelectPaymentMethodCard onChangePaymentMethod={(value) => setPaymentMethod(value)} />
                </div>

                <div className="flex flex-col gap-4 p-4">
                    <div className="grid gap-4">
                        <Typography as="h3" className="text-xl font-semibold">
                            Tổng quan đơn hàng
                        </Typography>

                        <CustomOrderPackageCard data={cart.items} />

                        <CustomVoucherSubmitForm
                            subtotal={cart.subtotal}
                            appliedVoucher={appliedVoucher}
                            onApply={handleApplyVoucher}
                            onRemove={handleRemoveVoucher}
                        />

                        <CustomPaymentDetailsCard data={paymentDetails} />
                    </div>

                    <Button
                        size="lg"
                        variant="gradient"
                        className="flex items-center justify-center gap-2"
                        color="red"
                        disabled={isLoading || !allowCheckout}
                        onClick={handleCheckout}
                        fullWidth
                    >
                        {isLoading && <Spinner className="h-5 w-5" />}
                        Hoàn tất đơn hàng
                    </Button>

                    <Button
                        size="lg"
                        variant="outlined"
                        onClick={() => navigate(routes.collections.replace(':slug', 'all'))}
                        fullWidth
                    >
                        Tiếp tục mua sắm
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
