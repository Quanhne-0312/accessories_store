import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import { Avatar, Option, Rating, Select } from '@material-tailwind/react';
import CustomCommentBubble from '../partials/CustomCommentBubble';

function CustomProductTestimonialSection() {
    const dateFilter = [
        {
            id: 1,
            title: 'Gần đây nhất',
        },
        {
            id: 2,
            title: 'Đánh giá cao nhất',
        },
        {
            id: 3,
            title: 'Đánh giá thấp nhất',
        },
        {
            id: 4,
            title: 'Chỉ có ảnh',
        },
        {
            id: 5,
            title: 'Hữu ích nhất',
        },
    ];

    const userComment = [
        {
            id: 1,
            rating: 5,
            UserImg: 'https://th.bing.com/th/id/OIP.v0Cw6Gydr5bjYPAQrKRljwHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            name: 'Hà Mi',
            ProductImg:
                'https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
            content:
                'Hình ảnh chỉ mang tính chất minh hoạ, sản phẩm chất lượng, giao hàng nhanh, shop nhiệt tình, đóng gói cẩn thận.',
            like: 5,
            disLike: 0,
        },
        {
            id: 2,
            rating: 4,
            UserImg: 'https://th.bing.com/th/id/OIP.v0Cw6Gydr5bjYPAQrKRljwHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            name: 'Mai Dương',
            ProductImg:
                'https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
            content: 'Sản phẩm chất lượng, tôi rất thích, giao hàng nhanh, shop nhiệt tình, đóng gói cẩn thận.',
            like: 5,
            disLike: 0,
        },
        {
            id: 3,
            rating: 2,
            UserImg: 'https://th.bing.com/th/id/OIP.v0Cw6Gydr5bjYPAQrKRljwHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            name: 'Lê Nhật',
            ProductImg:
                'https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
            content: 'Đóng gói không cẩn thận. Sản phẩm bị móp méo',
            like: 2,
            disLike: 4,
        },
        {
            id: 4,
            rating: 5,
            UserImg: 'https://th.bing.com/th/id/OIP.v0Cw6Gydr5bjYPAQrKRljwHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            name: 'Ôn Linh',
            ProductImg:
                'https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
            content: 'Sản phẩm chất lượng, rất đáng để mua, giao hàng nhanh, shop nhiệt tình.',
            like: 8,
            disLike: 0,
        },
    ];

    return (
        <div className="grid gap-4">
            <div className="mb-4">
                <Select variant="standard" label="Filter comment">
                    {dateFilter.map((item) => (
                        <Option key={item.id}>{item.title}</Option>
                    ))}
                </Select>
            </div>
            {userComment.map((item, index) => (
                <CustomCommentBubble key={index} data={item} />
            ))}
        </div>
    );
}

export default CustomProductTestimonialSection;
