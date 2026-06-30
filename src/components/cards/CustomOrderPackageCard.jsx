import CustomOrderProductCard from './CustomOrderProductCard';

function CustomOrderPackageCard({ data }) {
    return (
        <div className="grid gap-2">
            {data.length > 0 ? (
                data.map((item) => <CustomOrderProductCard key={item.id ?? item.slug} data={item} />)
            ) : (
                <div className="select-none rounded-lg border border-blue-gray-200 bg-white p-4 text-center font-medium">
                    Không có sản phẩm trong giỏ
                </div>
            )}
        </div>
    );
}

export default CustomOrderPackageCard;
