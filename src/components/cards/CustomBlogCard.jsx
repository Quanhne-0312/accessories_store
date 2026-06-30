import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function CustomBlogCard({ data }) {
    const { img, title, description, tag, route, readTime } = data;

    return (
        <Card className="h-full overflow-hidden rounded-lg border border-blue-gray-50 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader floated={false} shadow={false} className="relative mx-0 mt-0 h-56 rounded-none">
                <img src={img} alt={title} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <Chip
                    className="absolute left-4 bottom-4 w-max rounded bg-black px-2 py-1 text-[10px] font-semibold uppercase"
                    size="sm"
                    value={tag}
                />
            </CardHeader>
            <CardBody className="grid gap-3 px-4 py-4">
                <Typography className="text-xs font-semibold uppercase tracking-wide text-red-500">
                    {readTime}
                </Typography>
                <Typography variant="h5" color="blue-gray" className="line-clamp-2 text-xl font-bold leading-snug">
                    {title}
                </Typography>
                <Typography className="line-clamp-3 text-sm font-normal leading-6 text-blue-gray-500">
                    {description}
                </Typography>
            </CardBody>
            <CardFooter className="mt-auto px-4 pb-5 pt-0">
                <Link to={route}>
                    <Button variant="outlined" color="blue-gray" className="rounded px-5 py-3">
                        Xem thêm
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

CustomBlogCard.defaultProps = {
    data: {
        img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85',
        title: 'Cách chọn phụ kiện tinh tế cho trang phục hằng ngày',
        description: 'Gợi ý phối vòng tay, dây chuyền và nhẫn để tổng thể gọn gàng, nữ tính mà không bị rối mắt.',
        route: '/collection/all',
        tag: 'Phong cách',
        readTime: '4 phút đọc',
    },
};

CustomBlogCard.propTypes = {
    data: PropTypes.object,
};

export default CustomBlogCard;
