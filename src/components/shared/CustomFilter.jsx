import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Accordion, AccordionBody, AccordionHeader, Button, Typography } from '@material-tailwind/react';
import React from 'react';

const filterLabels = {
    category: 'Danh mục',
    material: 'Chất liệu',
    color: 'Màu sắc',
};

function CustomFilter({ contents, selectedFilters, onToggleFilter, onClearFilters }) {
    const [open, setOpen] = React.useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const hasActiveFilter = Object.values(selectedFilters || {}).some((values) => values.length > 0);

    return (
        <aside className="rounded-lg border border-blue-gray-50 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <Typography className="text-xl font-bold text-blue-gray-900">Bộ lọc</Typography>
                    <Typography className="mt-1 text-xs text-blue-gray-400">Chọn thuộc tính sản phẩm</Typography>
                </div>

                {hasActiveFilter && (
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full px-2 py-1 text-xs normal-case"
                        onClick={onClearFilters}
                    >
                        <XMarkIcon className="h-4 w-4" />
                        Xóa
                    </Button>
                )}
            </div>

            {contents?.map(({ count_by, data }, index) => {
                const sectionId = index + 1;
                const isOpen = open === sectionId;

                return (
                    <Accordion key={count_by} open={isOpen}>
                        <AccordionHeader
                            className="border-b border-blue-gray-50 py-4 text-base"
                            onClick={() => handleOpen(sectionId)}
                        >
                            <div className="flex w-full items-center justify-between">
                                <span className="font-semibold text-blue-gray-800">
                                    {filterLabels[count_by] || count_by}
                                </span>
                                {isOpen ? (
                                    <MinusIcon className="h-5 w-5 text-blue-gray-500" />
                                ) : (
                                    <PlusIcon className="h-5 w-5 text-blue-gray-500" />
                                )}
                            </div>
                        </AccordionHeader>

                        <AccordionBody className="py-4">
                            <div className="grid gap-2">
                                {(data || []).map((item) => {
                                    const value = item.slug ?? item.name;
                                    const checked = selectedFilters?.[count_by]?.includes(value) || false;

                                    return (
                                        <button
                                            key={`${count_by}-${value}`}
                                            type="button"
                                            className={`flex min-h-[44px] w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition ${
                                                checked
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                                                    : 'border-blue-gray-100 bg-white text-blue-gray-700 hover:border-blue-gray-200 hover:bg-blue-gray-50'
                                            }`}
                                            onClick={() => onToggleFilter(count_by, value)}
                                        >
                                            <span className="flex min-w-0 items-center gap-2">
                                                <span
                                                    className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${
                                                        checked
                                                            ? 'border-blue-500 bg-blue-500'
                                                            : 'border-blue-gray-200 bg-white'
                                                    }`}
                                                >
                                                    {checked && <span className="h-1.5 w-1.5 rounded-sm bg-white" />}
                                                </span>
                                                <span className="min-w-0 text-sm font-medium leading-5">{item.name}</span>
                                            </span>

                                            <span
                                                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                    checked
                                                        ? 'bg-white text-blue-700'
                                                        : 'bg-blue-gray-50 text-blue-gray-500'
                                                }`}
                                            >
                                                {Number(item.product_count || 0)}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </AccordionBody>
                    </Accordion>
                );
            })}
        </aside>
    );
}

export default CustomFilter;
