import { Button, Progress, Rating, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

function CustomRatingCountSection() {
    return (
        <div className="py-9 px-6">
            <Typography as={'h2'}>PHẢN HỒI TỪ KHÁCH HÀNG</Typography>
            <div>
                <div className="mb-6 flex flex-col items-center justify-center pt-6">
                    <div className="flex items-center gap-2">
                        <Rating value={4} onChange={(value) => setRated(value)} />
                        <Typography color="blue-gray" className="mt-2">
                            {4} trên 5 sao
                        </Typography>
                    </div>
                    <Typography>Dựa trên 261 đánh giá</Typography>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                        <Rating value={5} readonly />
                        <Progress value={95} size="lg" variant="gradient" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Rating value={4} readonly />
                        <Progress value={5} size="lg" variant="gradient" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Rating value={3} readonly />
                        <Progress value={0} size="lg" variant="gradient" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Rating value={2} readonly />
                        <Progress value={0} size="lg" variant="gradient" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Rating value={1} readonly />
                        <Progress value={0} size="lg" variant="gradient" />
                    </div>
                    <div className="flex justify-center">
                        <Link>
                            <Button variant="text" className="underline">
                                Xem tất cả đánh giá
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomRatingCountSection;
