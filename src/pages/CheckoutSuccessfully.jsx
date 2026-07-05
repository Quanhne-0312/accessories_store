import CustomCheckoutSuccessfullySection from '@/components/layouts/CustomCheckoutSuccessfullySection';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function CheckoutSuccessfully({ successOrderUuid }) {
    const [storedOrderUuid] = useState(() => sessionStorage.getItem('checkoutSuccessOrderUuid'));
    const { orders } = useSelector((state) => state.user);
    const location = useLocation();

    const orderUuids = Array.isArray(orders) ? orders : [];
    const successOrder = location.state?.orderUuid || storedOrderUuid || (orderUuids.length > 0 ? orderUuids[0] : null);

    useEffect(() => {
        sessionStorage.removeItem('checkoutSuccessOrderUuid');
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-brown-50 p-4">
            <CustomCheckoutSuccessfullySection order_uuid={successOrder} />
        </div>
    );
}

export default CheckoutSuccessfully;
