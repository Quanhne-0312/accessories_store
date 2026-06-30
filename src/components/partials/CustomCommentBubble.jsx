import { HandThumbDownIcon, HandThumbUpIcon, StarIcon } from '@heroicons/react/24/solid';
import { Avatar, Rating, Typography } from '@material-tailwind/react';
// import dayjs from 'dayjs';
// import 'dayjs/plugin/relativeTime';

// dayjs.extend(relativeTime);

function CustomCommentBubble({ data }) {
    const time = '2023-09-24T07:12:26.480Z';

    return (
        <div className="flex gap-2 overflow-hidden rounded-lg border border-gray-200 p-4">
            <Avatar src={data.UserImg} alt={data.name} className="shrink-0" />
            <div className="grid flex-1 gap-4">
                <h2 className="text-base font-medium">{data.name}</h2>
                <CustomRating value={data.rating} />
                <Typography className="rounded-lg bg-brown-50 p-4 text-xs italic">{data.content}</Typography>
            </div>
            {/* <div>{dayjs(time).fromNow()}</div> */}
        </div>
    );
}

const CustomRating = ({ value }) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].slice(0, value).map((star, index) => (
                <StarIcon key={index} className="h-4 w-4 text-yellow-700" />
            ))}
            {[1, 2, 3, 4, 5].slice(value).map((star, index) => (
                <StarIcon key={index} className="h-4 w-4 text-gray-600" />
            ))}
        </div>
    );
};

export default CustomCommentBubble;
