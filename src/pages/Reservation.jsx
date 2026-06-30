import { Button, Card, CardBody, CardFooter, Input, Textarea, Typography } from '@material-tailwind/react';

function Reservation() {
    return (
        <div className="mx-auto grid min-h-screen max-w-[1440px] overflow-hidden md:grid-cols-2 my-4">
            <div>
                <img
                    src="https://www.junie.vn/cdn/shop/articles/1_3321cea0-3ad0-4611-9438-ad52b982f62a.jpg?v=1690940008&width=1000"
                    className="h-full object-cover object-left"
                />
            </div>
            <div className="grid h-full w-full place-items-center bg-white">
                <Card className="shadow-none">
                    <form>
                        <CardBody className="flex min-w-[320px] flex-col gap-4">
                            <Typography variant="h5" className="text-center">
                                Make your reservation
                            </Typography>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Input type="text" label="Email hoặc SĐT" size="lg" className="md:col-span-1" />
                                <Input label="Kiểu dáng" size="lg" className="md:col-span-1" />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Input type="text" label="Size" size="lg" className="md:col-span-1" />
                                <Input label="Màu sắc" size="lg" className="md:col-span-1" />
                            </div>
                            <div className="">
                                <Textarea label="Ghi chú" />
                            </div>
                        </CardBody>
                        <CardFooter className="grid gap-4 pt-0">
                            <Button variant="gradient" className="flex items-center justify-center gap-2" fullWidth>
                                Đặt trước
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Reservation;
