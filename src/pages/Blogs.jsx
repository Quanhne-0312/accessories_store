import CustomBlogCard from '@/components/cards/CustomBlogCard';
import { Typography } from '@material-tailwind/react';

const posts = [
    {
        id: 1,
        img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
        title: 'Cách chọn dây chuyền theo cổ áo để tổng thể gọn và sang hơn',
        description:
            'Cổ tròn, cổ chữ V hay sơ mi đều hợp với một kiểu dây chuyền khác nhau. Chỉ cần đổi độ dài dây, trang phục đã có cảm giác chỉn chu hơn.',
        route: '/collection/day-chuyen',
        tag: 'Dây chuyền',
        readTime: '5 phút đọc',
    },
    {
        id: 2,
        img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
        title: 'Nhẫn tối giản: món phụ kiện nhỏ nhưng rất dễ nâng outfit',
        description:
            'Nhẫn bạc, nhẫn vàng hồng và nhẫn đính đá nhỏ phù hợp với phong cách hằng ngày, không kén màu da và dễ phối cùng đồng hồ.',
        route: '/collection/nhan',
        tag: 'Nhẫn',
        readTime: '4 phút đọc',
    },
    {
        id: 3,
        img: 'https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=1000&q=85',
        title: 'Bông tai cho khuôn mặt tròn, dài và góc cạnh',
        description:
            'Chọn dáng bông tai phù hợp sẽ giúp khuôn mặt cân đối hơn. Bài viết gợi ý các kiểu nhỏ, vòng và dáng thả dễ dùng nhất.',
        route: '/collection/khuyen-tai',
        tag: 'Bông tai',
        readTime: '6 phút đọc',
    },
    {
        id: 4,
        img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85',
        title: 'Vòng tay charm: phối thế nào để cổ tay thanh mảnh hơn',
        description:
            'Một chiếc vòng tay đẹp không nhất thiết phải nhiều chi tiết. Quan trọng là khoảng hở, độ rơi và sự cân bằng với trang phục.',
        route: '/collection/vong-tay',
        tag: 'Vòng tay',
        readTime: '5 phút đọc',
    },
    {
        id: 5,
        img: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85',
        title: 'Bảo quản trang sức sáng lâu: những thói quen nên tránh',
        description:
            'Nước hoa, mồ hôi và độ ẩm có thể làm phụ kiện nhanh xỉn màu. Đây là checklist ngắn để giữ sản phẩm luôn đẹp.',
        route: '/collection/all',
        tag: 'Bảo quản',
        readTime: '3 phút đọc',
    },
    {
        id: 6,
        img: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=85',
        title: 'Gợi ý quà tặng phụ kiện theo ngân sách',
        description:
            'Từ một chiếc bông tai nhỏ đến dây chuyền ngọc trai, bạn có thể chọn món quà vừa tinh tế vừa dễ dùng cho người nhận.',
        route: '/collection/all',
        tag: 'Quà tặng',
        readTime: '4 phút đọc',
    },
];

function Blogs() {
    return (
        <div className="bg-white">
            <section className="mx-auto max-w-[1440px] px-4 py-10">
                <div className="mx-auto max-w-3xl text-center">
                    <Typography className="text-sm font-semibold uppercase tracking-wide text-red-500">
                        Blog phụ kiện
                    </Typography>
                    <Typography variant="h2" color="blue-gray" className="mt-3 text-3xl font-bold md:text-4xl">
                        Cảm hứng phối trang sức mỗi ngày
                    </Typography>
                    <Typography className="mt-4 text-base leading-7 text-blue-gray-500">
                        Những gợi ý ngắn gọn về cách chọn, phối và bảo quản phụ kiện để bạn dễ tìm được món hợp với phong cách của mình.
                    </Typography>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((item) => (
                        <CustomBlogCard data={item} key={item.id} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Blogs;
