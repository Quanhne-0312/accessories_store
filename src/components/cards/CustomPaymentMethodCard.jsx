import { BanknotesIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';

function CustomPaymentMethodCard({ name, description }) {
    return (
        <div className="grid h-max gap-4">
            <div className="flex items-center gap-2">
                <BanknotesIcon className="h-4 w-4 shrink-0" />
                <Typography className="text-sm font-medium">{name}</Typography>
            </div>
            <div className="flex items-center gap-2">
                <ClipboardDocumentListIcon className="h-4 w-4 shrink-0" />
                <Typography className="text-sm font-medium">{description}</Typography>
            </div>
        </div>
    );
}

export default CustomPaymentMethodCard;
