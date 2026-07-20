import CustomOrderProductCard from './CustomOrderProductCard';

function CustomOrderPackageCard({ data }) {
    const items = Array.isArray(data) ? data.filter(Boolean) : [];

    return (
        <div className="grid gap-2">
            {items.length > 0 ? (
                items.map((item, index) => (
                    <CustomOrderProductCard key={item.id ?? item.slug ?? index} data={item} />
                ))
            ) : (
                <div className="select-none rounded-lg border border-blue-gray-200 bg-white p-4 text-center font-medium">
                    Không có sản phẩm trong giỏ
                </div>
            )}
        </div>
    );
}

export default CustomOrderPackageCard;
