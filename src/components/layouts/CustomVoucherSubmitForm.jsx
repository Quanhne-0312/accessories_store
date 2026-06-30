import { Button, Input, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function CustomVoucherSubmitForm({ appliedVoucher, onApply, onRemove }) {
    const [voucher, setVoucher] = useState('');
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (!appliedVoucher) return;

        setVoucher(appliedVoucher.code);
        setStatus({
            type: 'success',
            message: `${appliedVoucher.code} đang được áp dụng.`,
        });
    }, [appliedVoucher]);

    const handleApply = () => {
        const result = onApply(voucher);
        setStatus({
            type: result.success ? 'success' : 'error',
            message: result.message,
        });
    };

    const handleRemove = () => {
        setVoucher('');
        setStatus(null);
        onRemove();
    };

    return (
        <div className="grid gap-2 rounded-lg border border-blue-gray-100 bg-white p-3">
            <div className="relative flex w-full">
                <Input
                    type="text"
                    label="Nhập mã giảm giá"
                    color="blue"
                    value={voucher}
                    onChange={({ target }) => {
                        setVoucher(target.value.toUpperCase());
                        setStatus(null);
                    }}
                    className="pr-24 uppercase"
                    containerProps={{
                        className: 'min-w-0',
                    }}
                />
                <Button
                    size="sm"
                    color={voucher ? 'blue' : 'blue-gray'}
                    disabled={!voucher}
                    className="!absolute right-1 top-1 rounded"
                    onClick={handleApply}
                >
                    Áp dụng
                </Button>
            </div>

            <div className="flex min-h-[24px] items-center justify-between gap-3">
                {status ? (
                    <Typography
                        className={`text-xs font-medium ${
                            status.type === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {status.message}
                    </Typography>
                ) : (
                    <Typography className="text-xs text-blue-gray-400">Mã hợp lệ: NEW10, YAY15, WOW20</Typography>
                )}

                {appliedVoucher && (
                    <Button variant="text" color="blue-gray" className="shrink-0 px-2 py-1 text-xs" onClick={handleRemove}>
                        Bỏ mã
                    </Button>
                )}
            </div>
        </div>
    );
}

CustomVoucherSubmitForm.propTypes = {
    appliedVoucher: PropTypes.object,
    onApply: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default CustomVoucherSubmitForm;
