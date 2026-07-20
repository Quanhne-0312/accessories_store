import CustomCartProductCard from '@/components/cards/CustomCartProductCard';
import CustomCurrencyDisplay from '@/components/shared/CustomCurrencyDisplay';
import { routes } from '@/routes';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const items = Array.isArray(cart.items) ? cart.items : [];

    return (
        <div className="mx-auto grid min-h-screen w-full max-w-[1440px] gap-6 p-4 py-10 lg:grid-cols-[1fr_360px]">
            <section>
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-blue-gray-100 pb-4">
                    <Typography as="h1" className="text-2xl font-semibold">
                        Giỏ hàng
                    </Typography>
                    <Typography className="text-sm text-blue-gray-500">{Number(cart.quantity) || 0} sản phẩm</Typography>
                </div>

                {items.length > 0 ? (
                    <div className="grid gap-4">
                        {items.map((item) => (
                            <CustomCartProductCard key={item.id || item.slug} data={item} />
                        ))}
                    </div>
                ) : (
                    <Card shadow={false} className="border border-blue-gray-100">
                        <CardBody className="grid min-h-[280px] place-items-center text-center">
                            <div>
                                <Typography className="text-lg font-semibold">Giỏ hàng đang trống</Typography>
                                <Typography className="mt-2 text-sm text-blue-gray-500">
                                    Chọn sản phẩm phù hợp và thêm vào giỏ để tiếp tục.
                                </Typography>
                            </div>
                        </CardBody>
                    </Card>
                )}
            </section>

            <aside className="h-max rounded-lg border border-blue-gray-100 bg-brown-50 p-5">
                <Typography className="text-lg font-semibold">Tóm tắt đơn hàng</Typography>
                <div className="my-5 flex items-center justify-between border-y border-blue-gray-100 py-4">
                    <Typography className="text-sm font-medium">Tạm tính</Typography>
                    <CustomCurrencyDisplay className="font-semibold text-red-600" value={Number(cart.subtotal) || 0} />
                </div>
                <div className="grid gap-3">
                    <Button
                        color="red"
                        variant="gradient"
                        disabled={items.length === 0}
                        onClick={() => navigate(routes.checkout)}
                        fullWidth
                    >
                        Thanh toán
                    </Button>
                    <Button
                        color="blue-gray"
                        variant="outlined"
                        onClick={() => navigate(routes.collections.replace(':slug', 'all'))}
                        fullWidth
                    >
                        Tiếp tục mua sắm
                    </Button>
                </div>
            </aside>
        </div>
    );
}

export default Cart;
