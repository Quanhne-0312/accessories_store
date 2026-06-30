import { Button, Input, Progress } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import HorizontalProductCard from "../components/partials/HorizontalProductCard";

function Cart() {
    return (
        <div className="px-4 grid gap-4">
            <div className="grid place-items-center">
                <h1 className="pt-6 pb-2">Giỏ hàng</h1>
                <div className="w-full lg:w-[50%]">
                    <Progress size="sm" value={100} />
                </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-3 mt-6">
                <div className="grid gap-4 lg:col-span-2">
                    <div className="hidden lg:grid grid-cols-4 border-b border-indigo-500">
                        <p className="col-span-2 text-center text-base font-bold uppercase">Sản phẩm</p>
                        <p className="col-span-1 text-center text-base font-bold uppercase">Số lượng</p>
                        <p className="col-span-1 text-center text-base font-bold uppercase">Tổng</p>
                    </div>
                    <div className="grid gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <HorizontalProductCard
                                data={{
                                    feature_image_url: 'https://www.junie.vn/cdn/shop/files/bong-tai-allie-02.jpg?v=1684570889&width=92',
                                    name: "day chuyen abc",
                                    material: "bac",
                                    price: 100000,
                                    quantity: 1,
                                }}
                                key={item}
                            />
                        ))}
                    </div>
                    <div className="grid gap-4">
                        <Select className="grid place-items-center" label="Quốc gia">
                            <Option>Việt nam</Option>
                            <Option>chine</Option>
                            <Option>Usa</Option>
                        </Select>
                        <Input label="Zip" />
                    </div>
                </div>
                <div className="lg:col-span-1 p-4 grid gap-4 bg-brown-50 rounded-md">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">Tổng</span>
                        <span className="text-sm">60000</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">giảm</span>
                        <span className="text-sm">-60000</span>
                    </div>
                    <Input label="Ghi chú đơn hàng" />
                    <Button className="text-xs">thanh toán</Button>
                </div>
            </div>
            <div>
                <h2>Có thể bạn cũng thích</h2>
            </div>
        </div>
    );
}

export default Cart;
