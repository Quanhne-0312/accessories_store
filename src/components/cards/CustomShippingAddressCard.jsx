import { MapPinIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';

function CustomShippingAddressCard({ receiver_name, receiver_phone, receiver_address }) {
    return (
        <div className="grid gap-4">
            <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                <Typography className="text-sm font-medium">{receiver_name}</Typography>
            </div>
            <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                <Typography className="text-sm font-medium">{receiver_phone}</Typography>
            </div>
            <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <Typography className="text-sm font-medium">{receiver_address}</Typography>
            </div>
        </div>
    );
}

export default CustomShippingAddressCard;
