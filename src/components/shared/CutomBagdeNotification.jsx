function CustomBagdeNotification({ notification, children }) {
    return (
        <div className="relative inline-flex items-center rounded-lg">
            {children}
            <div className="absolute -top-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white">
                {notification}
            </div>
        </div>
    );
}

export default CustomBagdeNotification;
