import { userService } from '@/services';
import { Input, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CustomAddressSelection from '../partials/CustomAddressSelection';
import CustomCartProductCard from '../cards/CustomCartProductCard';
import CustomShippingInfoCard from '../cards/CustomShippingInfoCard';
import CustomVoucherSubmitForm from './CustomVoucherSubmitForm';
import CustomCurrencyDisplay from '../shared/CustomCurrencyDisplay';

export function CustomOrderEditorForm({ data, isCreate, onChange }) {
    const [isLoading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const { role_id } = useSelector((state) => state.auth.data);

    useEffect(() => {
        const handleGetRoles = async () => {
            setLoading(true);
            const response = await userService.getRolesService(role_id);
            if (response && response.code === 'SUCCESS') {
                setRoles(response.result);
            }
            setLoading(false);
        };
        handleGetRoles();
    }, []);

    /**EVENT HANDLER */
    const handleOnSelectRole = (value) => {
        const result = roles.find((item) => item.name === value);
        if (result && result.name !== data.role) {
            onChange('role', result.name);
            onChange('role_id', result.id);
        }
    };
    const handleOnChangeAddress = (key, value) => {
        switch (key) {
            case 'province':
                onChange('address', {
                    ...data.address,
                    province: value,
                    district: '',
                    ward: '',
                });
                break;
            case 'district':
                onChange('address', {
                    ...data.address,
                    district: value,
                    ward: '',
                });
                break;
            case 'ward':
                onChange('address', {
                    ...data.address,
                    ward: value,
                });
                break;
            default:
                onChange('address', {
                    ...data.address,
                    location: value,
                });
                break;
        }
    };
    const contents = [
        {
            key: 'name',
            type: 'text',
            label: 'Họ tên',
        },
        {
            key: 'phone_number',
            type: 'tel',
            label: 'Số điện thoại',
        },
    ];

    return (
        <div className="flex w-full flex-wrap gap-4">
            <div className="grid w-full flex-1 gap-4">
                <div className="rounded-lg border border-blue-gray-100 p-4">
                    <Typography as="h5" className="mb-4 text-lg font-semibold">
                        Thông tin khách hàng
                    </Typography>
                    <div className="grid w-full gap-4">
                        {contents.map((item, index) => (
                            <Input
                                key={item.key}
                                size="lg"
                                color="blue"
                                type={item.type}
                                label={item.label}
                                value={data[item.key] ?? ''}
                                onChange={(e) => onChange(item.key, e.target.value)}
                            />
                        ))}
                        <CustomAddressSelection address={data?.address} onChange={handleOnChangeAddress} />
                    </div>
                </div>
                <div className="rounded-lg border border-blue-gray-100 p-4">
                    <Typography as="h5" className="mb-4 text-lg font-semibold">
                        Thông tin sản phẩm
                    </Typography>
                    <div className="grid w-full gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <CustomCartProductCard key={item} />
                        ))}
                    </div>
                </div>
                <div className="rounded-lg border border-blue-gray-100 p-4">
                    <Typography as="h5" className="mb-4 text-lg font-semibold">
                        Thông tin giao hàng
                    </Typography>
                    <div className="grid w-full gap-4 sm:grid-cols-2">
                        <CustomShippingInfoCard />
                    </div>
                </div>
            </div>
            <div className="flex w-full min-w-[240px] shrink-0 flex-col gap-4 md:w-max">
                <div className="rounded-lg border border-blue-gray-100 p-4">
                    <Typography as="h5" className="mb-4 text-lg font-semibold">
                        Hình thức thanh toán
                    </Typography>
                    <div className="grid gap-4">
                        {[1, 2].map((item) => (
                            <CustomShippingInfoCard key={item} />
                        ))}
                    </div>
                </div>
                <div className="rounded-lg border border-blue-gray-100 p-4">
                    <Typography as="h5" className="mb-4 text-lg font-semibold">
                        Mã giảm giá
                    </Typography>
                    <div className="grid gap-4">
                        <CustomVoucherSubmitForm />
                    </div>
                </div>

                <div className="rounded-lg border border-blue-gray-100 p-4">
                    <Typography as="h5" className="mb-4 text-lg font-semibold">
                        Thanh toán
                    </Typography>
                    <div className="grid gap-4">
                        <div className="flex items-baseline justify-between gap-4">
                            <Typography className="text-sm font-medium text-gray-600 line-clamp-1">
                                Tổng tiền sản phẩm:
                            </Typography>
                            <CustomCurrencyDisplay className="text-base font-semibold" value={100000} />
                        </div>

                        <div className="flex items-baseline justify-between gap-4">
                            <Typography className="text-sm font-medium text-gray-600 line-clamp-1">
                                Phí vận chuyển:
                            </Typography>
                            <CustomCurrencyDisplay className="text-base font-semibold" value={100000} />
                        </div>

                        <div className="flex items-baseline justify-between gap-4">
                            <Typography className="text-sm font-medium text-gray-600 line-clamp-1">
                                Mã giảm giá:
                            </Typography>
                            <CustomCurrencyDisplay className="text-base font-semibold" value={100000} />
                        </div>

                        <hr className="border-t border-blue-gray-100"></hr>

                        <div className="flex items-baseline justify-between gap-4">
                            <Typography className="text-sm font-medium text-gray-600 line-clamp-1">
                                Thành tiền:
                            </Typography>
                            <CustomCurrencyDisplay className="text-lg font-semibold text-red-600" value={100000} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

CustomOrderEditorForm.defaultProps = {};

CustomOrderEditorForm.propTypes = {
    data: PropTypes.object,
    isCreate: PropTypes.bool,
    onChange: PropTypes.func,
};

export default CustomOrderEditorForm;
