import { privateRoutes, publicRoutes } from '@/routes';
import { Breadcrumbs, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function CustomPageTitleSection({ pathname }) {
    const [title, setTitle] = useState('');
    const paths = pathname.split('/').filter((el) => el !== '');

    const displayRoute = (path) => {
        return path;
    };

    const getPageTitle = (pathname) => {
        const page = [...publicRoutes, ...privateRoutes].find((route) => route.path === pathname);

        return page ? page.title : 'Accessories';
    };

    return (
        <div className="mt-14 grid place-items-center bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] py-10 md:py-16">
            <Typography as="h3" className="text-2xl font-medium">
                {getPageTitle(pathname)}
            </Typography>
            <Breadcrumbs className="bg-transparent p-0 py-3 transition-all">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Trang chủ
                </Typography>

                <Typography variant="small" color="blue-gray" className="font-normal">
                    {getPageTitle(pathname)}
                </Typography>
            </Breadcrumbs>
        </div>
    );
}

export default CustomPageTitleSection;
