import CustomCheckoutSuccessfullySection from '@/components/layouts/CustomCheckoutSuccessfullySection';
import { useSelector } from 'react-redux';

function CheckoutSuccessfully({ successOrderUuid }) {
    const { orders } = useSelector((state) => state.user);

    const lastSuccessOrder = orders.length > 0 ? orders[orders.length - 1] : null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-brown-50 p-4">
            <CustomCheckoutSuccessfullySection order_uuid={lastSuccessOrder} />
        </div>
    );
}

export default CheckoutSuccessfully;
