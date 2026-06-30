import { Button, Card, CardBody, CardHeader, Input, Textarea, Typography } from '@material-tailwind/react';

function Contact() {
    const data = [
        {
            title: 'Địa chỉ chúng tôi',
            content: 'Quyết Thằng Thái Nguyên TP Thái Nguyên',
        },
        {
            title: 'Email chúng tôi',
            content: 'accessories@gamil.com',
        },
        {
            title: 'Thời gian làm việc',
            content: 'Thứ 2 đến Thứ 6 từ 8h đến 18h Thứ 7 và Chủ nhật từ 8h00 đến 17h00',
        },
    ];

    return (
        <div className="py-6 lg:px-4">
            <div className="grid-cols-2 gap-4 md:grid">
                <div className="mt-[16px] px-[12px]">
                    <div className="h-full">
                        <iframe
                            className="md:h-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.022623765633!2d105.80380607602093!3d21.585039980207142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31352738b1bf08a3%3A0x515f4860ede9e108!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiAmIFRydXnhu4FuIHRow7RuZyBUaMOhaSBOZ3V5w6pu!5e0!3m2!1svi!2s!4v1694957298947!5m2!1svi!2s"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <div className="px-[15px] py-[40px]">
                    <div>
                        <h1 className="text-2xl font-bold">Liên hệ</h1>
                        <p className="my-[24px] h-[2px] w-[40px] bg-black"></p>
                        <ul className="mb-4">
                            {data.map((item, index) => (
                                <li key={index} className="mb-[24px]">
                                    <p className="text-sm text-[#666]">{item.title}</p>
                                    <p className="text-sm font-medium text-[#252A2B]">{item.content}</p>
                                </li>
                            ))}
                        </ul>
                        <div className='py-4 mt-6'>
                            <div className="mb-4">
                                <h2 className="text-lg font-bold">Gửi thắc mắc cho chúng tôi</h2>
                            </div>
                            <div className="">
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input size="lg" label="Tên của bạn" />
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Input size="lg" label="Email của bạn" />
                                        <Input size="lg" label="Số điện thoại" />
                                    </div>
                                    <Textarea label="Nội dung" />
                                </div>
                                <Typography variant="small" color="gray" className="text-xs">
                                    This site is protected by reCAPTCHA and the Google
                                </Typography>
                                <Button className="mt-6 py-[12px] text-xs" color="blue" fullWidth>
                                    Gửi cho chúng tôi
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
