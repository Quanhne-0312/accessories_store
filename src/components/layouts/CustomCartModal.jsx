import { closeCartModal } from '@/redux/actions/cartActions';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button, Drawer, IconButton, Spinner, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomCartProductCard from '../cards/CustomCartProductCard';
import CustomCurrencyDisplay from '../shared/CustomCurrencyDisplay';

function CustomCartModal() {
    const { isOpen, quantity, subtotal, items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseCartModal = () => {
        dispatch(closeCartModal());
    };

    const handleRedirectToCheckOut = () => {
        dispatch(closeCartModal());
        navigate('/checkout');
    };

    return (
        <Drawer placement="right" open={isOpen} onClose={handleCloseCartModal} size={480} className="flex flex-col p-4">
            <div className="-mr-3 flex shrink-0 items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                    {`Giỏ hàng (${quantity > 9 ? '9+' : quantity})`}
                </Typography>
                <IconButton variant="text" onClick={handleCloseCartModal}>
                    <XMarkIcon className="h-5 w-5" strokeWidth={2} />
                </IconButton>
            </div>
            <ul className=" flex flex-1 flex-col gap-2 overflow-y-auto py-2">
                {items.length > 0 &&
                    items.map((item, index) => (
                        <li key={index}>
                            <div className="flex">
                                <CustomCartProductCard data={item} />
                            </div>
                        </li>
                    ))}
            </ul>
            <div className="mt-auto shrink-0">
                <Button
                    color="red"
                    variant="gradient"
                    className="flex items-center justify-center gap-2"
                    disabled={quantity <= 0}
                    onClick={handleRedirectToCheckOut}
                    fullWidth
                >
                    <span>Thanh toán</span>
                    {quantity > 0 ? <CustomCurrencyDisplay className="text-inherit font-semibold" value={subtotal}/> : null}
                </Button>
            </div>
        </Drawer>
    );
}

export default CustomCartModal;
