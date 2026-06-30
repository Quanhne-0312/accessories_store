import { Typography } from '@material-tailwind/react';
import CustomBlogCard from '../cards/CustomBlogCard';

const trendPosts = [
    {
        img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85',
        title: 'Layer dây chuyền mảnh: công thức giúp cổ áo trông thanh thoát hơn',
        description: 'Chọn độ dài, mặt dây và màu kim loại sao cho các lớp dây không bị chồng chéo hay nặng nề.',
        route: '/collection/day-chuyen',
        tag: 'Dây chuyền',
        readTime: '5 phút đọc',
    },
    {
        img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
        title: 'Nhẫn bản mảnh đang trở lại với phong cách tối giản',
        description: 'Một vài chiếc nhẫn nhỏ có thể tạo điểm nhấn vừa đủ cho bàn tay mà vẫn giữ cảm giác tinh tế.',
        route: '/collection/nhan',
        tag: 'Nhẫn',
        readTime: '4 phút đọc',
    },
    {
        img: 'https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=900&q=85',
        title: 'Bông tai nhỏ cho ngày đi làm: sáng mặt nhưng không quá nổi',
        description: 'Các kiểu dáng tròn, giọt nước và ngọc trai giúp khuôn mặt mềm hơn khi phối cùng áo sơ mi.',
        route: '/collection/khuyen-tai',
        tag: 'Bông tai',
        readTime: '3 phút đọc',
    },
    {
        img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85',
        title: 'Vòng tay charm và cách phối để cổ tay không bị rối',
        description: 'Gợi ý chọn charm, chất liệu và màu sắc theo tông trang phục để tạo điểm nhấn nhẹ nhàng.',
        route: '/collection/vong-tay',
        tag: 'Vòng tay',
        readTime: '5 phút đọc',
    },
];

function CustomBlogsSection() {
    return (
        <section className="bg-[#f4efed] py-12">
            <div className="mx-auto max-w-[1440px] px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <Typography className="text-base font-semibold uppercase tracking-wide text-blue-gray-900">
                        Xu hướng
                    </Typography>
                    <Typography className="mt-3 text-sm leading-6 text-blue-gray-500">
                        Cập nhật những cách phối phụ kiện dễ áp dụng cho đi làm, đi chơi và những dịp cần một điểm nhấn nhỏ.
                    </Typography>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {trendPosts.map((item) => (
                        <CustomBlogCard key={item.title} data={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CustomBlogsSection;
