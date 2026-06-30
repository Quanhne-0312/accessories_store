import CustomUserEditorForm from '@/components/layouts/CustomUserEditorForm';
import CustomConfirmDialog from '@/components/layouts/CustomConfirmDialog';
import CustomCrudGroupButtons from '@/components/partials/CustomCrudGroupButtons';
import { updateProfile } from '@/redux/actions/authAction';
import { authService } from '@/services';
import { Card, CardBody, CardFooter } from '@material-tailwind/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function ProfileUpdate() {
    const [profile, setProfile] = useState({});
    const [defaultProfile, setDefaultProfile] = useState({});
    const [updatable, setUpdatable] = useState(false);
    const [dialog, setDialog] = useState({});
    const currentUser = useSelector((state) => state.auth.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            const birth = handleFormatDate(currentUser?.birth);
            const address = handleConvertAddressToObject(currentUser?.address);

            setProfile({
                ...currentUser,
                birth,
                address,
            });

            setDefaultProfile({
                ...currentUser,
                birth,
                address,
            });
        }

        return () => {
            setProfile({});
            setDefaultProfile({});
        };
    }, [currentUser]);

    useEffect(() => {
        if (_.isEqual(defaultProfile, profile)) {
            setUpdatable(false);
        } else {
            setUpdatable(true);
        }

        return () => setUpdatable(false);
    }, [defaultProfile, profile]);

    const handleFormatDate = (date) => {
        const localeDate = new Date(date);
        const day = localeDate.getDate().toString().padStart(2, '0');
        const month = (localeDate.getMonth() + 1).toString().padStart(2, '0');
        const year = localeDate.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleConvertAddressToObject = (address) => {
        const slicedAddress = address.split('-').filter((item) => item !== '');

        const province = slicedAddress.pop().trim();
        const district = slicedAddress.pop().trim();
        const ward = slicedAddress.pop().trim();
        const location = slicedAddress.join('-');
        return { location, ward, district, province };
    };

    const handleConvertAddressToString = (address) => {
        const values = [address.location, address.ward, address.district, address.province];
        return values.join(' - ');
    };

    const handleOnChangeInput = (key, value) => {
        setProfile((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleUpdateProfile = async (data) => {
        try {
            setDialog((prevState) => ({
                ...prevState,
                status: 'PENDING',
                text: 'Đang xử lý thông tin...',
            }));

            const response = await new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await authService.updateProfileService(data);
                    resolve(result);
                }, 2000);
            });

            if (response && response.code === 'SUCCESS') {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'SUCCESS',
                    text: `Cập nhật thông tin thành công!`,
                }));

                let countdown = 50;
                const countdownInterval = setInterval(() => {
                    setDialog((prevState) => ({
                        ...prevState,
                        countdown: countdown / 10,
                    }));
                    countdown = countdown - 1;
                    if (countdown === 0) {
                        clearInterval(countdownInterval);
                        const address = handleConvertAddressToString(data.address);
                        dispatch(updateProfile({ ...data, address }));
                        navigate(-1);
                    }
                }, 100);
            } else {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'ERROR',
                    btnConfirm: 'Thử lại',
                    text: 'Cập nhật thông tin không thành công!',
                }));
            }
        } catch (error) {
            setDialog((prevState) => ({
                ...prevState,
                status: 'ERROR',
                btnConfirm: 'Thử lại',
                text: error?.message || error || 'Cập nhật thông tin không thành công!',
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateProfile(profile);
    };

    /** 3. Active dialog */

    const handleOpenUpdateDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: true,
            status: 'READY',
            title: 'Cập nhật thông tin tài khoản',
            text: 'Xác nhận cập nhật thông tin tài khoản?',
            handler: handleCloseDialog,
            btnCancel: 'Hủy',
            onCancel: handleCloseDialog,
            btnConfirm: 'Cập nhật',
            onConfirm: handleSubmit,
        }));
    };

    const handleCloseDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: false,
        }));
    };

    const handleCancel = async () => {
        if (profile.avatar_url && profile.avatar_url !== defaultProfile.avatar_url) {
            const result = await handleCloudinaryUploadRollback([profile?.avatar_url]);
            if (result) {
                navigate(-1);
            }
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="py-4">
            <div className="mx-auto max-w-[1440px]">
                <div className="p-4">
                    {!_.isEmpty(profile) && <CustomUserEditorForm data={profile} onChange={handleOnChangeInput} />}
                </div>
                <div className='p-4'>
                    <CustomCrudGroupButtons
                        btnConfirn={{
                            text: 'Lưu lại',
                            disabled: !updatable,
                            onClick: handleOpenUpdateDialog,
                        }}
                        btnCancel={{
                            text: 'Hủy',
                            onClick: handleCancel,
                        }}
                    />
                </div>
            </div>
            <CustomConfirmDialog {...dialog} />
        </div>
    );
}

export default ProfileUpdate;
