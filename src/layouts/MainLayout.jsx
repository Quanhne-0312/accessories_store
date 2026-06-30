import CustomCartModal from '@/components/layouts/CustomCartModal';
import CustomCarouselService from '@/components/layouts/CustomCarouselService';
import CustomFooter from '@/components/layouts/CustomFooter';
import CustomHeader from '@/components/layouts/CustomHeader';
import CustomPageTitleSection from '@/components/layouts/CustomPageTitleSection';
import { routes } from '@/routes';
import { Breadcrumbs, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
function MainLayout({ children }) {
    const { pathname } = useLocation();

    return (
        <div className="w-full">
            <CustomHeader />
            {pathname !== routes.home && <CustomPageTitleSection pathname={pathname} />}
            <div className="min-h-screen">{children}</div>
            <CustomCarouselService />
            <CustomFooter />
            <CustomCartModal />
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
