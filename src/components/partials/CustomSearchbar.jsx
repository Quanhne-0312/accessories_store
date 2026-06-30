import { IconButton } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function CustomSearchbar() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isFocus, setFocus] = useState(false);
    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setFocus(false);
        const searchParams = new URLSearchParams();
        searchParams.append('q', searchKeyword);
        navigate(`/collection/search?${searchParams.toString()}`);
    };

    return (
        <form action="#" onSubmit={handleOnSubmit} className="w-full max-w-[1440px]">
            <div
                className={`flex h-11 items-center rounded-full pl-5 pr-1 ${
                    isFocus ? 'border-2 border-blue-500' : 'border-2 border-blue-gray-100'
                }`}
            >
                <input
                    placeholder="tìm kiếm..."
                    value={searchKeyword}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full flex-1 border-0 border-none outline-none"
                />
                <span className="mx-1 h-5 border-l border-l-blue-gray-100"></span>
                <IconButton type="submit" variant="text" size="sm" className="shrink-0 rounded-full">
                    <MagnifyingGlassIcon className="h-5 w-5 rounded-full" />
                </IconButton>
            </div>
        </form>
    );
}

export default CustomSearchbar;
