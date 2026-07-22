import { PencilIcon } from '@heroicons/react/24/solid';
import { Avatar, IconButton } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustomAvatarUpload({ avatar, readOnly, onChangeAvatar }) {
    const handleCloudinaryUpload = () => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
        const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_CROP_PRESET;

        if (!window.cloudinary || typeof window.cloudinary.createUploadWidget !== 'function') {
            toast.error('Cloudinary chưa sẵn sàng. Hãy tải lại trang rồi thử lại.');
            return;
        }

        if (!cloudName || !uploadPreset) {
            toast.error('Thiếu cấu hình Cloudinary trong accessories_store/.env.');
            return;
        }

        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName,
                uploadPreset,
                ...(apiKey ? { apiKey } : {}),
                sources: ['local'],
                resourceType: 'image',
                multiple: false,
                cropping: true,
                croppingAspectRatio: 1,
                croppingShowDimensions: true,
                croppingDefaultEnabled: true,
                croppingShowSkipCropButton: false,
                clientAllowedFormats: ['image'],
                maxImageFileSize: 5000000,
            },
            (error, result) => {
                if (error) {
                    toast.error(error?.statusText || error?.message || 'Tải ảnh đại diện không thành công!');
                    return;
                }

                if (!error && result && result.event === 'success') {
                    const { original_filename, public_id, secure_url, thumbnail_url } = result.info;
                    onChangeAvatar({ original_filename, public_id, secure_url, thumbnail_url });
                    toast.success('Tải ảnh đại diện thành công. Hãy bấm Lưu lại để hoàn tất.');
                }
            },
        );

        widget.open();
    };

    return (
        <div className="group relative overflow-hidden rounded-full">
            <Avatar
                src={avatar?.secure_url || '/img/default-avatar.jpg'}
                alt="bruce-mars"
                withBorder={true}
                color="green"
                className="h-60 w-60 p-0.5 shadow-lg shadow-blue-gray-500/40"
            />

            <div
                className={`absolute inset-x-0 top-1/2 bottom-0 grid translate-y-full place-items-center bg-gray-500/50 shadow-all transition-transform duration-300 ${
                    readOnly ? null : 'group-hover:translate-y-0'
                }`}
            >
                <IconButton variant="gradient" size="lg" onClick={handleCloudinaryUpload}>
                    <PencilIcon className="h-5 w-5" />
                </IconButton>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                closeOnClick={false}
                newestOnTop={false}
                closeButton={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
            />
        </div>
    );
}

CustomAvatarUpload.propTypes = {
    avatar: PropTypes.object,
    readOnly: PropTypes.bool,
    onChangeAvatar: PropTypes.func,
};

export default memo(CustomAvatarUpload);
