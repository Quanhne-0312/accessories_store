import {
    ArrowPathIcon,
    ShieldCheckIcon,
    SparklesIcon,
    TruckIcon,
} from '@heroicons/react/24/outline';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    Card,
    CardBody,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
    Typography,
} from '@material-tailwind/react';
import { useState } from 'react';

const values = [
    {
        icon: <SparklesIcon className="h-7 w-7" />,
        title: 'Thiết kế dễ dùng mỗi ngày',
        text: 'Các mẫu phụ kiện được chọn theo phong cách thanh lịch, dễ phối và không nhanh lỗi mốt.',
    },
    {
        icon: <ShieldCheckIcon className="h-7 w-7" />,
        title: 'Chất liệu rõ ràng',
        text: 'Mỗi sản phẩm đều có thông tin phân loại, chất liệu và màu sắc để bạn chọn đúng nhu cầu.',
    },
    {
        icon: <TruckIcon className="h-7 w-7" />,
        title: 'Giao hàng tiện lợi',
        text: 'Hỗ trợ COD, đóng gói cẩn thận và theo dõi đơn hàng sau khi đặt.',
    },
    {
        icon: <ArrowPathIcon className="h-7 w-7" />,
        title: 'Đổi mới trong 7 ngày',
        text: 'Sản phẩm lỗi do vận chuyển hoặc sản xuất sẽ được hỗ trợ đổi mới theo chính sách.',
    },
];

const faqTabs = [
    {
        label: 'Đặt hàng',
        value: 'order',
        questions: [
            {
                title: 'Tôi đặt hàng trên website như thế nào?',
                desc: 'Bạn chọn sản phẩm, thêm vào giỏ hàng, nhập thông tin nhận hàng và hoàn tất thanh toán. Sau đó hệ thống sẽ lưu đơn để bạn theo dõi.',
            },
            {
                title: 'Tôi có thể dùng mã giảm giá không?',
                desc: 'Có. Tại trang thanh toán, bạn nhập mã NEW10, YAY15 hoặc WOW20. Hệ thống sẽ tự kiểm tra điều kiện và trừ tiền vào tổng đơn.',
            },
            {
                title: 'Tôi có thể chỉnh sửa đơn sau khi đặt không?',
                desc: 'Nếu đơn chưa được xử lý, bạn có thể liên hệ shop để điều chỉnh thông tin nhận hàng hoặc sản phẩm.',
            },
        ],
    },
    {
        label: 'Giao hàng',
        value: 'shipping',
        questions: [
            {
                title: 'Thời gian giao hàng khoảng bao lâu?',
                desc: 'Thông thường đơn hàng được giao trong 2-7 ngày tùy khu vực. Nội thành có thể nhận sớm hơn khi sản phẩm sẵn kho.',
            },
            {
                title: 'Shop có hỗ trợ COD không?',
                desc: 'Có. Bạn có thể chọn phương thức thanh toán phù hợp ở bước thanh toán.',
            },
            {
                title: 'Phí vận chuyển được tính thế nào?',
                desc: 'Phí vận chuyển sẽ được hiển thị trong phần tổng quan đơn hàng. Một số chương trình có thể hỗ trợ freeship theo giá trị đơn.',
            },
        ],
    },
    {
        label: 'Sản phẩm',
        value: 'product',
        questions: [
            {
                title: 'Làm sao biết sản phẩm thuộc chất liệu nào?',
                desc: 'Ở trang chi tiết sản phẩm, bạn sẽ thấy rõ phân loại, chất liệu và màu sắc. Bộ lọc cũng hỗ trợ lọc theo các thuộc tính này.',
            },
            {
                title: 'Ảnh sản phẩm có đúng thực tế không?',
                desc: 'Ảnh được dùng để mô tả sản phẩm và phong cách phối. Màu sắc thực tế có thể chênh nhẹ do ánh sáng hoặc màn hình.',
            },
            {
                title: 'Tôi bảo quản phụ kiện như thế nào?',
                desc: 'Nên tránh nước hoa, hóa chất, môi trường ẩm lâu. Sau khi dùng, lau nhẹ và cất riêng trong hộp hoặc túi mềm.',
            },
        ],
    },
    {
        label: 'Bảo hành',
        value: 'warranty',
        questions: [
            {
                title: 'Sản phẩm được bảo hành những lỗi nào?',
                desc: 'Shop hỗ trợ các lỗi do sản xuất hoặc vận chuyển, với điều kiện sản phẩm còn đầy đủ thông tin đơn hàng.',
            },
            {
                title: 'Trường hợp nào không được hỗ trợ đổi trả?',
                desc: 'Sản phẩm hư hỏng do sử dụng sai cách, va đập mạnh, tiếp xúc hóa chất hoặc quá thời hạn hỗ trợ sẽ không nằm trong chính sách đổi trả.',
            },
            {
                title: 'Tôi cần làm gì khi nhận sản phẩm lỗi?',
                desc: 'Bạn chụp lại tình trạng sản phẩm và liên hệ shop càng sớm càng tốt để được kiểm tra và xử lý.',
            },
        ],
    },
];

function About() {
    const [activeTab, setActiveTab] = useState('order');
    const [openQuestion, setOpenQuestion] = useState(0);

    return (
        <div className="bg-white">
            <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:px-8 lg:py-16">
                <div className="flex flex-col justify-center">
                    <Typography className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                        Accessories Ahihi
                    </Typography>
                    <Typography as="h1" className="mt-4 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
                        Phụ kiện nhỏ, điểm nhấn vừa đủ cho mỗi ngày.
                    </Typography>
                    <Typography className="mt-5 max-w-2xl text-base leading-7 text-blue-gray-600">
                        Chúng tôi chọn lọc vòng tay, dây chuyền, bông tai, nhẫn và các phụ kiện thời trang theo tinh thần
                        tinh gọn, dễ phối, giá hợp lý và thông tin sản phẩm minh bạch.
                    </Typography>

                    <div className="mt-8 grid grid-cols-3 gap-4">
                        {[
                            ['80+', 'Sản phẩm'],
                            ['4', 'Danh mục'],
                            ['7 ngày', 'Đổi mới'],
                        ].map(([value, label]) => (
                            <div key={label} className="border-l border-blue-gray-100 pl-4">
                                <Typography className="text-2xl font-bold text-blue-gray-900">{value}</Typography>
                                <Typography className="text-sm text-blue-gray-500">{label}</Typography>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg">
                    <img
                        className="h-full min-h-[360px] w-full object-cover"
                        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80"
                        alt="Phụ kiện thời trang"
                    />
                </div>
            </section>

            <section className="bg-blue-gray-50/60 py-12">
                <div className="mx-auto grid max-w-[1440px] gap-4 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4">
                    {values.map((item) => (
                        <Card key={item.title} className="rounded-lg shadow-sm">
                            <CardBody>
                                <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-600">
                                    {item.icon}
                                </div>
                                <Typography className="text-lg font-semibold text-blue-gray-900">{item.title}</Typography>
                                <Typography className="mt-2 text-sm leading-6 text-blue-gray-600">{item.text}</Typography>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-[1120px] px-4 py-12 md:px-8 lg:py-16">
                <div className="mb-8 text-center">
                    <Typography className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                        Câu hỏi thường gặp
                    </Typography>
                    <Typography as="h2" className="mt-3 text-3xl font-bold">
                        Cần biết trước khi mua hàng
                    </Typography>
                </div>

                <Tabs value={activeTab}>
                    <TabsHeader className="mx-auto max-w-3xl">
                        {faqTabs.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => {
                                    setActiveTab(value);
                                    setOpenQuestion(0);
                                }}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        {faqTabs.map(({ value, questions }) => (
                            <TabPanel key={value} value={value} className="px-0">
                                <div className="rounded-lg border border-blue-gray-100 bg-white">
                                    {questions.map((item, index) => (
                                        <Accordion key={item.title} open={openQuestion === index}>
                                            <AccordionHeader
                                                className="px-5 text-left text-base"
                                                onClick={() =>
                                                    setOpenQuestion((current) => (current === index ? -1 : index))
                                                }
                                            >
                                                {item.title}
                                            </AccordionHeader>
                                            <AccordionBody className="px-5 text-sm leading-6 text-blue-gray-600">
                                                {item.desc}
                                            </AccordionBody>
                                        </Accordion>
                                    ))}
                                </div>
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </section>
        </div>
    );
}

export default About;
