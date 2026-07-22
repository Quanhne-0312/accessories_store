import CustomConfirmDialog from '@/components/layouts/CustomConfirmDialog';
import CustomUserEditorForm from '@/components/layouts/CustomUserEditorForm';
import CustomCrudGroupButtons from '@/components/partials/CustomCrudGroupButtons';
import { updateProfile } from '@/redux/actions/authAction';
import { authService, imageService } from '@/services';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const emptyAddress = {
    location: '',
    ward: '',
    district: '',
    province: '',
};

const formatDate = (date) => {
    if (!date) return '';

    const localeDate = new Date(date);
    if (Number.isNaN(localeDate.getTime())) return '';

    const day = localeDate.getDate().toString().padStart(2, '0');
    const month = (localeDate.getMonth() + 1).toString().padStart(2, '0');
    const year = localeDate.getFullYear();
    return `${year}-${month}-${day}`;
};

const convertAddressToObject = (address) => {
    if (!address) return { ...emptyAddress };

    if (typeof address === 'object') {
        return {
            ...emptyAddress,
            ...address,
        };
    }

    if (typeof address !== 'string') return { ...emptyAddress };

    const parts = address
        .split(/\s+-\s+/)
        .map((item) => item.trim())
        .filter(Boolean);

    if (parts.length < 4) {
        return {
            ...emptyAddress,
            location: address.trim(),
        };
    }

    const province = parts.pop() || '';
    const district = parts.pop() || '';
    const ward = parts.pop() || '';
    const location = parts.join(' - ');
    return { location, ward, district, province };
};

const convertAddressToString = (address = {}) =>
    [address.location, address.ward, address.district, address.province]
        .map((value) => (typeof value === 'string' ? value.trim() : ''))
        .filter(Boolean)
        .join(' - ');

export function ProfileUpdate() {
    const [profile, setProfile] = useState({});
    const [defaultProfile, setDefaultProfile] = useState({});
    const [updatable, setUpdatable] = useState(false);
    const [dialog, setDialog] = useState({});
    const currentUser = useSelector((state) => state.auth.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || _.isEmpty(currentUser)) return;

        const normalizedProfile = {
            ...currentUser,
            birth: formatDate(currentUser.birth),
            address: convertAddressToObject(currentUser.address),
        };

        setProfile(normalizedProfile);
        setDefaultProfile(normalizedProfile);
    }, [currentUser]);

    useEffect(() => {
        setUpdatable(!_.isEqual(defaultProfile, profile));
    }, [defaultProfile, profile]);

    const handleOnChangeInput = (key, value) => {
        setProfile((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleCloseDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: false,
        }));
    };

    const handleUpdateProfile = async (data) => {
        setDialog((prevState) => ({
            ...prevState,
            status: 'PENDING',
            text: 'Đang xử lý thông tin...',
            btnConfirm: null,
            btnCancel: null,
        }));

        try {
            const requestData = {
                ...data,
                birth: data?.birth || null,
            };
            const response = await authService.updateProfileService(requestData);

            if (response?.code !== 'SUCCESS') {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'ERROR',
                    btnConfirm: 'Thử lại',
                    btnCancel: 'Đóng',
                    onConfirm: () => handleUpdateProfile(profile),
                    onCancel: handleCloseDialog,
                    text: response?.message || 'Cập nhật thông tin không thành công!',
                }));
                return;
            }

            const oldAvatar = defaultProfile?.avatar;
            const nextAvatar = requestData?.avatar;

            // Delete the old Cloudinary image only after the database update has
            // succeeded, so cancelling or a failed update cannot break the avatar.
            if (oldAvatar?.public_id && nextAvatar?.public_id && oldAvatar.public_id !== nextAvatar.public_id) {
                void imageService.rollbackCloudUpload([{ public_id: oldAvatar.public_id }]);
            }

            const address = convertAddressToString(requestData.address);
            dispatch(updateProfile({ ...requestData, address }));

            setDialog((prevState) => ({
                ...prevState,
                status: 'SUCCESS',
                text: 'Cập nhật thông tin thành công!',
                btnConfirm: 'Đóng',
                onConfirm: () => {
                    handleCloseDialog();
                    navigate(-1);
                },
            }));
        } catch (error) {
            setDialog((prevState) => ({
                ...prevState,
                status: 'ERROR',
                btnConfirm: 'Thử lại',
                btnCancel: 'Đóng',
                onConfirm: () => handleUpdateProfile(profile),
                onCancel: handleCloseDialog,
                text: error?.message || 'Cập nhật thông tin không thành công!',
            }));
        }
    };

    const handleSubmit = (event) => {
        event?.preventDefault?.();
        handleUpdateProfile(profile);
    };

    const handleOpenUpdateDialog = () => {
        setDialog({
            open: true,
            status: 'READY',
            title: 'Cập nhật thông tin tài khoản',
            text: 'Xác nhận cập nhật thông tin tài khoản?',
            handler: handleCloseDialog,
            btnCancel: 'Hủy',
            onCancel: handleCloseDialog,
            btnConfirm: 'Cập nhật',
            onConfirm: handleSubmit,
        });
    };

    const handleCancel = () => {
        const currentAvatar = profile?.avatar;
        const originalAvatar = defaultProfile?.avatar;

        if (currentAvatar?.public_id && currentAvatar.public_id !== originalAvatar?.public_id) {
            void imageService.rollbackCloudUpload([{ public_id: currentAvatar.public_id }]);
        }

        navigate(-1);
    };

    return (
        <div className="py-4">
            <div className="mx-auto max-w-[1440px]">
                <div className="p-4">
                    {!_.isEmpty(profile) && <CustomUserEditorForm data={profile} onChange={handleOnChangeInput} />}
                </div>
                <div className="p-4">
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
