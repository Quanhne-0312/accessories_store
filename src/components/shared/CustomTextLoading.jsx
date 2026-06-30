function CustomTextLoading({ width, size }) {
    return (
        <div
            className={`animate-pulse rounded bg-blue-gray-200 text-transparent ${
                size ? `text-${size}` : 'text-[14px]'
            } ${width ? `w-[calc(${width})]` : 'w-full'} `}
        >
            0
        </div>
    );
}

export default CustomTextLoading;
