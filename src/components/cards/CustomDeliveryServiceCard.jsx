import { MapPinIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import CustomCurrencyDisplay from '../shared/CustomCurrencyDisplay';

function CustomDeliveryServiceCard({ name, description, fee }) {
    return (
        <div className="flex justify-between gap-4">
            <div className="grid gap-2">
                <Typography className="text-sm font-semibold">{name}</Typography>
                <Typography className="text-sm font-normal">{description}</Typography>
            </div>
            {fee > 0 ? (
                <CustomCurrencyDisplay className="shrink-0 text-sm font-medium" value={fee} />
            ) : (
                <Typography className="text-sm font-medium">Miễn phí</Typography>
            )}
        </div>
    );
}

CustomDeliveryServiceCard.defaultProps = {
    name: 'Giao hàng tiết kiệm',
    description: 'Miễn phí giao hàng tiết kiệm.',
    fee: 0,
};

export default CustomDeliveryServiceCard;
