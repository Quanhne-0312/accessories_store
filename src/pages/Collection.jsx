import CustomProductCard from '@/components/cards/CustomProductCard';
import CustomFilter from '@/components/shared/CustomFilter';
import { productService } from '@/services';
import { Card, Chip, Typography } from '@material-tailwind/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const createEmptyFilters = () => ({
    category: [],
    material: [],
    color: [],
});

const toQueryString = (values) => (values.length > 0 ? values.join(',') : undefined);

function Collection() {
    const [isLoading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [isFetchingMore, setFetchingMore] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [filterMenu, setFilterMenu] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState(createEmptyFilters);
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const searchKeyword = new URLSearchParams(location.search).get('q');
    const listRequestIdRef = useRef(0);

    const activeCategories = useMemo(() => {
        if (selectedFilters.category.length > 0) {
            return selectedFilters.category.join(',');
        }

        return 'all';
    }, [selectedFilters.category]);

    const activeFilters = useMemo(
        () => ({
            materials: toQueryString(selectedFilters.material),
            colors: toQueryString(selectedFilters.color),
        }),
        [selectedFilters.material, selectedFilters.color],
    );

    const activeFilterItems = useMemo(() => {
        if (!filterMenu) return [];

        return filterMenu.flatMap(({ count_by, data }) =>
            (selectedFilters[count_by] || []).map((value) => {
                const option = data.find((item) => (item.slug ?? item.name) === value);
                return {
                    type: count_by,
                    value,
                    label: option?.name || value,
                };
            }),
        );
    }, [filterMenu, selectedFilters]);

    const handleGetProducts = async (categories, page, filters) => {
        const requestId = ++listRequestIdRef.current;

        try {
            setLoading(true);
            const response = await productService.getProductsService(categories, page, filters);
            if (requestId !== listRequestIdRef.current) return;

            if (response?.code === 'SUCCESS') {
                const { page: responsePage, total_pages, total_results, result } = response;
                const nextPage = Number(responsePage) || 1;
                const nextTotalPages = Number(total_pages) || 1;
                setProducts(Array.isArray(result) ? result.filter(Boolean) : []);
                setCurrentPage(nextPage);
                setTotalPages(nextTotalPages);
                setTotalResults(Number(total_results) || 0);
                setHasMore(nextPage < nextTotalPages);
            } else {
                setProducts([]);
                setHasMore(false);
            }
        } finally {
            if (requestId === listRequestIdRef.current) {
                setLoading(false);
            }
        }
    };

    const handleInfinityGetProducts = async (categories, page, filters) => {
        if (isFetchingMore) return;

        const requestId = listRequestIdRef.current;
        try {
            setFetchingMore(true);
            const response = await productService.getProductsService(categories, page, filters);
            if (requestId !== listRequestIdRef.current) return;

            if (response?.code === 'SUCCESS') {
                const responsePage = Number(response.page) || page;
                const nextItems = Array.isArray(response.result) ? response.result.filter(Boolean) : [];
                setCurrentPage(responsePage);
                setProducts((prevState) => {
                    const knownIds = new Set(prevState.map((item) => item?.id || item?.slug));
                    return [
                        ...prevState,
                        ...nextItems.filter((item) => !knownIds.has(item?.id || item?.slug)),
                    ];
                });
                setHasMore(responsePage < (Number(response.total_pages) || totalPages));
            } else {
                setHasMore(false);
            }
        } finally {
            if (requestId === listRequestIdRef.current) {
                setFetchingMore(false);
            }
        }
    };

    const handleSearchProducts = async (keyword, page) => {
        const requestId = ++listRequestIdRef.current;

        try {
            setLoading(true);
            const response = await productService.searchProductsService(keyword, page);
            if (requestId !== listRequestIdRef.current) return;

            if (response?.code === 'SUCCESS') {
                const { page: responsePage, total_pages, total_results, result } = response;
                const nextPage = Number(responsePage) || 1;
                const nextTotalPages = Number(total_pages) || 1;
                setProducts(Array.isArray(result) ? result.filter(Boolean) : []);
                setCurrentPage(nextPage);
                setTotalPages(nextTotalPages);
                setTotalResults(Number(total_results) || 0);
                setHasMore(nextPage < nextTotalPages);
            } else {
                setProducts([]);
                setHasMore(false);
            }
        } finally {
            if (requestId === listRequestIdRef.current) {
                setLoading(false);
            }
        }
    };

    const handleToggleFilter = (filterType, value) => {
        setSelectedFilters((prevFilters) => {
            const currentValues = prevFilters[filterType] || [];
            const nextValues = currentValues.includes(value)
                ? currentValues.filter((item) => item !== value)
                : [...currentValues, value];

            return {
                ...prevFilters,
                [filterType]: nextValues,
            };
        });
    };

    const handleClearFilters = () => {
        const nextFilters = createEmptyFilters();
        setSelectedFilters(nextFilters);
        setSearchParams({}, { replace: true });
    };

    const handleGetProductsCount = useCallback(async () => {
        const response = await productService.getProductsCountService();
        if (response && response.code === 'SUCCESS') {
            setFilterMenu(Array.isArray(response.result) ? response.result.filter(Boolean) : []);
        }
    }, []);

    useEffect(() => {
        const urlFilters = {
            category: searchParams.get('category')?.split(',').filter(Boolean) || [],
            material: searchParams.get('material')?.split(',').filter(Boolean) || [],
            color: searchParams.get('color')?.split(',').filter(Boolean) || [],
        };

        if (urlFilters.category.length || urlFilters.material.length || urlFilters.color.length) {
            setSelectedFilters(urlFilters);
            return;
        }

        setSelectedFilters({
            ...createEmptyFilters(),
            category: slug && slug !== 'all' ? [slug] : [],
        });
    }, [slug]);

    useEffect(() => {
        const nextParams = {};

        if (searchKeyword) {
            nextParams.q = searchKeyword;
        }

        Object.entries(selectedFilters).forEach(([key, values]) => {
            if (values.length > 0) {
                nextParams[key] = values.join(',');
            }
        });

        setSearchParams(nextParams, { replace: true });
    }, [selectedFilters]);

    useEffect(() => {
        setFetchingMore(false);

        if (searchKeyword) {
            setHasMore(false);
            handleSearchProducts(searchKeyword, 1);
        } else {
            setHasMore(false);
            handleGetProducts(activeCategories, 1, activeFilters);
        }

        return () => {
            listRequestIdRef.current += 1;
        };
    }, [activeCategories, activeFilters.materials, activeFilters.colors, searchKeyword]);

    useEffect(() => {
        handleGetProductsCount();

        const handleRefreshWhenFocused = () => {
            if (!document.hidden) {
                handleGetProductsCount();
            }
        };

        window.addEventListener('focus', handleRefreshWhenFocused);
        document.addEventListener('visibilitychange', handleRefreshWhenFocused);

        return () => {
            window.removeEventListener('focus', handleRefreshWhenFocused);
            document.removeEventListener('visibilitychange', handleRefreshWhenFocused);
        };
    }, [handleGetProductsCount]);

    const handleInfiniteScroll = () => {
        if (hasMore && !isFetchingMore) {
            handleInfinityGetProducts(activeCategories, currentPage + 1, activeFilters);
        }
    };

    return (
        <div className="py-8">
            <div className="mx-auto flex w-full max-w-[1440px] flex-wrap gap-4 p-4 md:flex-nowrap">
                <div className="w-full shrink-0 md:w-[280px]">
                    {filterMenu && (
                        <CustomFilter
                            contents={filterMenu}
                            selectedFilters={selectedFilters}
                            onToggleFilter={handleToggleFilter}
                            onClearFilters={handleClearFilters}
                        />
                    )}
                </div>
                <div className="min-h-screen flex-1">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <Typography className="text-sm font-medium text-blue-gray-500">
                            {isLoading ? 'Đang tải sản phẩm...' : `${totalResults} sản phẩm phù hợp`}
                        </Typography>

                        {activeFilterItems.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {activeFilterItems.map((item) => (
                                    <Chip
                                        key={`${item.type}-${item.value}`}
                                        value={item.label}
                                        onClose={() => handleToggleFilter(item.type, item.value)}
                                        className="rounded-full bg-blue-gray-50 text-blue-gray-700"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {products.length > 0 ? (
                        <InfiniteScroll
                            dataLength={products.length}
                            next={handleInfiniteScroll}
                            hasMore={hasMore}
                            loader={isFetchingMore ? <CustomProductCard /> : null}
                            className="grid w-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                        >
                            {products.map((item) => (
                                <CustomProductCard key={item.id || item.slug} data={item} />
                            ))}
                        </InfiniteScroll>
                    ) : (
                        <Card className="flex h-full min-h-[320px] items-center justify-center p-6">
                            <Typography className="text-center text-lg font-semibold">
                                Không tìm thấy sản phẩm phù hợp
                            </Typography>
                        </Card>
                    )}
                    {totalPages === currentPage && products.length > 0 && (
                        <div>
                            <hr className="mx-auto mt-16 w-full max-w-xs border-t border-blue-gray-100" />
                            <Typography className="mx-auto mb-16 mt-6 w-max text-center font-semibold">
                                Bạn đã xem hết rồi
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Collection;
