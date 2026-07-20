import { locationService } from '@/services';
import { Input } from '@material-tailwind/react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CustomSelectOption from './CustomSelectOption';

export function CustomAddressSelection({ address, onChange }) {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const handleGetProvinces = async () => {
        setLoading(true);

        try {
            const response = await locationService.getProvincesService();

            if (response) {
                setProvinces(response);
                setError(null);
            } else {
                setError('province');
            }
        } catch (e) {
            console.error(e);
            setError('province');
        }

        setLoading(false);
    };

    const handleGetDistricts = async (provinceCode) => {
        setLoading(true);

        try {
            const response = await locationService.getDistrictsService(provinceCode);

            if (response) {
                setDistricts(response);
                setError(null);
            } else {
                setError('district');
            }
        } catch (e) {
            console.error(e);
            setError('district');
        }

        setLoading(false);
    };

    const handleGetWards = async (districtCode) => {
        setLoading(true);

        try {
            const response = await locationService.getWardsService(districtCode);

            if (response) {
                setWards(response);
                setError(null);
            } else {
                setError('ward');
            }
        } catch (e) {
            console.error(e);
            setError('ward');
        }

        setLoading(false);
    };

    useEffect(() => {
        handleGetProvinces();
    }, []);

    useEffect(() => {
        if (!address?.province) return;

        const province = provinces.find(
            (item) => item.name === address.province,
        );

        if (province) {
            handleGetDistricts(province.code);
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [address?.province, provinces]);

    useEffect(() => {
        if (!address?.district) return;

        const district = districts.find(
            (item) => item.name === address.district,
        );

        if (district) {
            handleGetWards(district.code);
        } else {
            setWards([]);
        }
    }, [address?.district, districts]);

    /** Retry */

    useEffect(() => {
        if (!error) return;

        const timeout = setTimeout(() => {
            switch (error) {
                case 'province':
                    handleGetProvinces();
                    break;

                case 'district': {
                    const province = provinces.find(
                        (item) => item.name === address.province,
                    );

                    if (province) {
                        handleGetDistricts(province.code);
                    }

                    break;
                }

                case 'ward': {
                    const district = districts.find(
                        (item) => item.name === address.district,
                    );

                    if (district) {
                        handleGetWards(district.code);
                    }

                    break;
                }

                default:
                    break;
            }
        }, 5000);

        return () => clearTimeout(timeout);
    }, [error, provinces, districts]);

    /** EVENTS */

    const handleProvinceChange = (value) => {
        const province = provinces.find(
            (item) => item.name === value,
        );

        if (!province) return;

        onChange('province', province.name);

        setDistricts([]);
        setWards([]);
    };

    const handleDistrictChange = (value) => {
        const district = districts.find(
            (item) => item.name === value,
        );

        if (!district) return;

        onChange('district', district.name);

        setWards([]);
    };

    const handleWardChange = (value) => {
        const ward = wards.find(
            (item) => item.name === value,
        );

        if (!ward) return;

        onChange('ward', ward.name);
    };

    const handleAddressChange = (e) => {
        onChange('location', e.target.value);
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-4">

                <div className="min-w-[240px] w-full">
                    <CustomSelectOption
                        options={provinces}
                        variant={{
                            key: 'province',
                            label: 'Tỉnh / Thành phố',
                        }}
                        value={address?.province}
                        loading={isLoading && _.isEmpty(provinces)}
                        onSelect={handleProvinceChange}
                    />
                </div>

                <div className="min-w-[240px] w-full">
                    <CustomSelectOption
                        options={districts}
                        variant={{
                            key: 'district',
                            label: 'Quận / Huyện',
                        }}
                        value={address?.district}
                        loading={isLoading && _.isEmpty(districts)}
                        onSelect={handleDistrictChange}
                    />
                </div>

                <div className="min-w-[240px] w-full">
                    <CustomSelectOption
                        options={wards}
                        variant={{
                            key: 'ward',
                            label: 'Phường / Xã',
                        }}
                        value={address?.ward}
                        loading={isLoading && _.isEmpty(wards)}
                        onSelect={handleWardChange}
                    />
                </div>

                <Input
                    size="lg"
                    color="blue"
                    label="Địa chỉ chi tiết"
                    value={address?.location || ''}
                    onChange={handleAddressChange}
                    required
                />
            </div>
        </div>
    );
}

CustomAddressSelection.propTypes = {
    address: PropTypes.object,
    onChange: PropTypes.func,
};

export default CustomAddressSelection;
