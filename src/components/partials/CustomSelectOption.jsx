import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Spinner } from '@material-tailwind/react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { memo, useEffect, useRef, useState } from 'react';

function CustomSelectOption({
    type,
    variant,
    value,
    options,
    onSelect,
    disabled,
    readOnly,
    loading,
}) {
    const [isOpen, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [dropdownable, setDropdownable] = useState(true);

    const selectionRef = useRef(null);

    useEffect(() => {
        const calculatePosY = () => {
            if (selectionRef.current) {
                const { top } = selectionRef.current.getBoundingClientRect();

                const posY = window.scrollY + top;
                const distance = window.innerHeight - posY;

                setDropdownable(distance >= 240);
            }
        };

        calculatePosY();

        window.addEventListener('scroll', calculatePosY);

        return () => {
            window.removeEventListener('scroll', calculatePosY);
        };
    }, []);

    useEffect(() => {
        setData(options || []);
    }, [options]);

    const handleOpen = () => {
        if (disabled || readOnly) return;

        setOpen((prev) => !prev);
        setText('');
        setData(options || []);
    };

    const handleSelect = (value) => {
        setOpen(false);

        if (onSelect) {
            onSelect(value);
        }
    };

    const handleOnChangeFilter = (e) => {
        const keyword = e.target.value;

        setText(keyword);

        if (_.isEmpty(keyword)) {
            setData(options || []);
            return;
        }

        const normalizedKeyword = keyword.toLowerCase();
        const filtered = (Array.isArray(options) ? options : []).filter((item) =>
            String(item?.name || '')
                .toLowerCase()
                .includes(normalizedKeyword),
        );

        setData(filtered);
    };

    return (
        <div className="w-full">
            <div
                className={`custom-select-option ${disabled ? 'select-none' : ''} ${
                    isOpen ? 'open' : ''
                }`}
            >
                <div
                    className={`select ${value ? '!border-t-transparent' : ''}`}
                    onClick={handleOpen}
                >
                    <div className="absolute left-3 top-2/4 -translate-y-2/4 pt-0.5">
                        <span>{value}</span>
                    </div>

                    <label
                        className={`label ${
                            value || isOpen
                                ? 'minimize'
                                : 'text-sm leading-[4.1]'
                        }`}
                    >
                        {variant?.label || ''}

                        {variant?.required && (
                            <span className="ml-1 font-semibold text-red-500">
                                *
                            </span>
                        )}
                    </label>

                    <div
                        className={`absolute right-2 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center transition-all duration-300 ${
                            isOpen ? '-rotate-180' : ''
                        }`}
                    >
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                </div>

                {!disabled && (
                    <div
                        ref={selectionRef}
                        className={`absolute left-0 right-0 z-50 overflow-hidden rounded-md bg-white transition-all duration-300
                        ${
                            dropdownable
                                ? 'top-[calc(100%+5px)]'
                                : 'bottom-[calc(100%+5px)]'
                        }
                        ${
                            isOpen
                                ? 'max-h-96 border border-blue-gray-100 shadow-lg shadow-blue-gray-500/10'
                                : 'max-h-0'
                        }`}
                    >
                        <div className="bg-gray-100 p-2">
                            <input
                                type="text"
                                value={text}
                                placeholder="Tìm kiếm..."
                                className="w-full rounded border border-blue-gray-200 py-1 px-2 text-sm outline-none"
                                onChange={handleOnChangeFilter}
                            />
                        </div>

                        <ul className="options">
                            {loading ? (
                                <li>
                                    <div className="option-item flex items-center gap-2">
                                        <Spinner className="h-4 w-4" />
                                        <span>Đang tải dữ liệu...</span>
                                    </div>
                                </li>
                            ) : data.length > 0 ? (
                                data.filter(Boolean).map((item, index) => (
                                    <li
                                        key={item.code || item.name || index}
                                        className="option-item cursor-pointer hover:bg-blue-50"
                                        onClick={() =>
                                            handleSelect(item.name || '')
                                        }
                                    >
                                        <span>{item.name || ''}</span>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <div className="option-item">
                                        <span>
                                            Không tìm thấy{' '}
                                            <strong>{text}</strong>
                                        </span>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

CustomSelectOption.propTypes = {
    type: PropTypes.string,
    variant: PropTypes.object,
    value: PropTypes.any,
    options: PropTypes.array,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    loading: PropTypes.bool,
};

export default memo(CustomSelectOption);
