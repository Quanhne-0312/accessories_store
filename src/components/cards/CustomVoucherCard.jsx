import { Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';

function CustomVoucherCard({ color, discount, condition, border }) {
    const borderClass = border === 'bg-brown-50' ? 'border-brown-50' : 'border-white';

    return (
        <div className={`overflow-hidden py-1.5 ${color}`}>
            <div
                className={`relative flex scale-x-105 flex-col items-center justify-center border-x-[12px] border-dotted ${borderClass} py-4`}
            >
                <Typography color="white" className="line-clamp-1 text-center text-base font-semibold">
                    Nhập mã
                </Typography>
                <Typography color="white" className="line-clamp-1 text-center text-5xl font-extrabold uppercase">
                    {discount}
                </Typography>
                <Typography color="white" className="line-clamp-1 text-center text-sm font-medium">
                    {condition}
                </Typography>
            </div>
        </div>
    );
}

CustomVoucherCard.propTypes = {
    color: PropTypes.string,
    border: PropTypes.string,
    discount: PropTypes.string,
    condition: PropTypes.string,
};

CustomVoucherCard.defaultProps = {
    color: 'red',
    border: 'white',
    discount: 'NEW10',
    condition: 'Giảm 10% đơn hàng',
};

export default CustomVoucherCard;
