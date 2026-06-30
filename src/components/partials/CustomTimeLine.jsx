import useVietnamDateTime from '@/hook/useVietnamDateTime';
import { ArchiveBoxIcon, BellIcon, CheckCircleIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import {
    Timeline,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineItem,
    Typography,
} from '@material-tailwind/react';

function CustomTimeLine({ data }) {
    const TimeNode = ({ data }) => {
        const [date, time] = data ? useVietnamDateTime(data?.createdAt) : [0, 0];

        return (
            <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                <TimelineIcon className="p-3" variant="ghost">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                </TimelineIcon>

                <div className="grid gap-1">
                    <Typography className="self-center text-xs font-semibold line-clamp-1">
                        {time ? (
                            <span className="flex gap-2">
                                <span>{time}</span>
                                <span>/</span>
                                <span>{date}</span>
                            </span>
                        ) : (
                            'Thời gian'
                        )}
                    </Typography>
                    <Typography className="self-center text-sm font-bold line-clamp-1">
                        {data.status_description ?? 'Trạng thái'}
                    </Typography>
                    <Typography className="self-center text-sm font-normal line-clamp-1">
                        {data.description ?? 'Mô tả trạng thái'}
                    </Typography>
                </div>
            </TimelineHeader>
        );
    };

    return (
        <div className="">
            <Timeline>
                {data &&
                    data.length > 0 &&
                    data.map((node, index) => (
                        <TimelineItem key={index} className="h-28">
                            <TimelineConnector className="!w-[78px]" />
                            <TimeNode data={node} />
                        </TimelineItem>
                    ))}
            </Timeline>
        </div>
    );
}

export default CustomTimeLine;
