import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    Button,
    Drawer,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from '@material-tailwind/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { logout } from '@/redux/actions/authAction';
import { cartItemRemoveAll, openCartModal } from '@/redux/actions/cartActions';
import { userRemoveAllOrders } from '@/redux/actions/userAction';
import { routes } from '@/routes';
import { authService, productService } from '@/services';
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    MinusSmallIcon,
    PlusSmallIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import CustomSearchbar from '../partials/CustomSearchbar';
import CustomBagdeNotification from '../shared/CutomBagdeNotification';

function CustomHeader() {
    const [open, setOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(false);
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [categories, setCategories] = useState([]);
    const { isLogged, data: currentUser } = useSelector((state) => state.auth);
    const cartQuantity = useSelector((state) => state.cart.quantity);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getCategoryPath = (slug) => routes.category.replace(':slug', slug || 'all');

    const handleGetCategories = useCallback(async () => {
        const response = await productService.getCategoriesService();
        if (response?.code === 'SUCCESS') {
            setCategories(response.result || []);
        }
    }, []);

    useEffect(() => {
        handleGetCategories();

        const handleRefreshWhenFocused = () => {
            if (!document.hidden) {
                handleGetCategories();
            }
        };

        window.addEventListener('focus', handleRefreshWhenFocused);
        document.addEventListener('visibilitychange', handleRefreshWhenFocused);

        return () => {
            window.removeEventListener('focus', handleRefreshWhenFocused);
            document.removeEventListener('visibilitychange', handleRefreshWhenFocused);
        };
    }, [handleGetCategories]);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const handleOpenCart = () => {
        dispatch(openCartModal());
    };

    const handleLogout = () => {
        // Capture and submit the authenticated logout request before clearing
        // persisted credentials. Local logout remains immediate even if the
        // server is unavailable.
        if (currentUser?.phone_number) {
            void authService.logoutService(currentUser.phone_number);
        }

        dispatch(logout());
        dispatch(cartItemRemoveAll());
        dispatch(userRemoveAllOrders());
        navigate(routes.home);
    };

    const menu = useMemo(
        () => [
            {
                title: 'Bộ sưu tập',
                path: getCategoryPath('all'),
                children: categories.map((category) => ({
                    title: category.name,
                    path: getCategoryPath(category.slug),
                })),
            },
            {
                title: 'Bài viết',
                path: routes.blogs,
            },
            {
                title: 'Giới thiệu',
                path: routes.about,
            },
            {
                title: 'Dịch vụ',
                path: routes.reservation,
            },
            {
                title: 'Liên hệ',
                path: routes.contact,
            },
        ],
        [categories],
    );

    return (
        <header className="fixed inset-x-0 top-0 z-40 border-b border-b-gray-200 bg-white shadow-md">
            <nav className="relative py-2.5 pl-4 pr-1 lg:px-6 lg:pr-4">
                <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between">
                    <Logo />

                    <div className="flex w-auto items-center justify-between">
                        <ul className="hidden font-medium lg:flex">
                            {menu.map((item, index) => (
                                <li key={index}>
                                    {item.children ? (
                                        <Menu allowHover>
                                            <MenuHandler>
                                                <NavLink to={item.path} onMouseEnter={handleGetCategories}>
                                                    {({ isActive }) => (
                                                        <Button variant="text" color={isActive ? 'blue' : 'gray'}>
                                                            {item.title}
                                                        </Button>
                                                    )}
                                                </NavLink>
                                            </MenuHandler>
                                            <MenuList>
                                                {item.children.map(({ path, title }) => (
                                                    <MenuItem
                                                        key={path}
                                                        onClick={() => navigate(path)}
                                                        className="p-0 hover:bg-transparent"
                                                    >
                                                        <Button fullWidth variant="text" className="rounded">
                                                            {title}
                                                        </Button>
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </Menu>
                                    ) : (
                                        <NavLink to={item.path}>
                                            {({ isActive }) => (
                                                <Button variant="text" color={isActive ? 'blue' : 'gray'}>
                                                    {item.title}
                                                </Button>
                                            )}
                                        </NavLink>
                                    )}
                                </li>
                            ))}

                            <li className="hidden lg:block">
                                {isLogged ? (
                                    <Menu allowHover>
                                        <MenuHandler>
                                            <Button variant="text" className="max-w-[160px]">
                                                <span className="line-clamp-1">{currentUser.name}</span>
                                            </Button>
                                        </MenuHandler>
                                        <MenuList>
                                            <MenuItem onClick={() => navigate(routes.profile)}>
                                                <span>Thông tin tài khoản</span>
                                            </MenuItem>
                                            <MenuItem onClick={() => navigate(routes.orders)}>
                                                <span>Đơn hàng</span>
                                            </MenuItem>
                                            <MenuItem onClick={handleLogout}>
                                                <span>Đăng xuất</span>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                ) : (
                                    <Link to={routes.login}>
                                        <Button variant="gradient" color="blue" className="hidden max-w-[160px] lg:block">
                                            <span className="line-clamp-1">Đăng nhập</span>
                                        </Button>
                                    </Link>
                                )}
                            </li>

                            <li className="mx-2">
                                <IconButton variant="text" onClick={() => setShowSearchbar((prevState) => !prevState)}>
                                    <MagnifyingGlassIcon className="h-6 w-6" />
                                </IconButton>
                            </li>
                        </ul>

                        <CustomBagdeNotification notification={cartQuantity > 9 ? '9+' : cartQuantity}>
                            <IconButton variant="text" onClick={handleOpenCart}>
                                <ShoppingBagIcon className="h-6 w-6" />
                            </IconButton>
                        </CustomBagdeNotification>

                        <IconButton variant="text" onClick={openDrawer} className="lg:hidden">
                            <Bars3Icon className="h-8 w-8" />
                        </IconButton>
                    </div>

                    <div className="w-full items-center justify-between lg:hidden">
                        <Drawer
                            placement="left"
                            open={open}
                            onClose={closeDrawer}
                            size={480}
                            className="flex flex-col p-4"
                        >
                            <div className="-mr-3 mb-6 flex shrink-0 items-center justify-between">
                                <Logo />
                                <IconButton variant="text" onClick={closeDrawer}>
                                    <XMarkIcon className="h-5 w-5" strokeWidth={2} />
                                </IconButton>
                            </div>

                            <CustomSearchbar />

                            <ul className="mt-4 flex flex-1 flex-col font-medium lg:mt-0 lg:flex-row">
                                {menu.map(({ title, path, children }) => (
                                    <li key={path} className="border-b border-b-blue-gray-100">
                                        {children ? (
                                            <Accordion
                                                open={openAccordion === path}
                                                icon={
                                                    <span className="grid h-8 w-8 place-items-center rounded text-blue-gray-500">
                                                        {openAccordion === path ? (
                                                            <MinusSmallIcon className="h-5 w-5" />
                                                        ) : (
                                                            <PlusSmallIcon className="h-5 w-5" />
                                                        )}
                                                    </span>
                                                }
                                            >
                                                <AccordionHeader
                                                    className="py-0"
                                                    onClick={() =>
                                                        setOpenAccordion((current) => (current === path ? false : path))
                                                    }
                                                >
                                                    <span className="flex w-full px-6 py-3 text-xs font-bold uppercase text-blue-gray-500">
                                                        {title}
                                                    </span>
                                                </AccordionHeader>
                                                <AccordionBody className="pt-0 text-sm font-normal">
                                                    {children.map((child) => (
                                                        <Button
                                                            key={child.path}
                                                            fullWidth
                                                            variant="text"
                                                            className="flex"
                                                            onClick={() => {
                                                                closeDrawer();
                                                                navigate(child.path);
                                                            }}
                                                        >
                                                            {child.title}
                                                        </Button>
                                                    ))}
                                                </AccordionBody>
                                            </Accordion>
                                        ) : (
                                            <NavLink
                                                to={path}
                                                onClick={() => {
                                                    closeDrawer();
                                                    navigate(path);
                                                }}
                                            >
                                                {({ isActive }) => (
                                                    <Button
                                                        fullWidth
                                                        variant="text"
                                                        color={isActive ? 'blue' : 'gray'}
                                                        className="flex"
                                                    >
                                                        {title}
                                                    </Button>
                                                )}
                                            </NavLink>
                                        )}
                                    </li>
                                ))}
                                <li className="mt-auto">
                                    {isLogged ? (
                                        <Accordion
                                            open={openAccordion === 'account'}
                                            icon={
                                                <span className="grid h-8 w-8 place-items-center rounded text-blue-gray-500">
                                                    {openAccordion === 'account' ? (
                                                        <MinusSmallIcon className="h-5 w-5" />
                                                    ) : (
                                                        <PlusSmallIcon className="h-5 w-5" />
                                                    )}
                                                </span>
                                            }
                                        >
                                            <AccordionHeader
                                                className={`py-0 ${
                                                    openAccordion === 'account' ? '' : 'border-b-transparent'
                                                }`}
                                                onClick={() =>
                                                    setOpenAccordion((current) =>
                                                        current === 'account' ? false : 'account',
                                                    )
                                                }
                                            >
                                                <div className="flex px-6 py-3 text-xs font-bold">
                                                    {currentUser.name}
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody className="pt-0 text-sm font-normal">
                                                <div className="border-b border-b-blue-gray-100">
                                                    <Button
                                                        fullWidth
                                                        variant="text"
                                                        className="flex"
                                                        onClick={() => {
                                                            closeDrawer();
                                                            navigate(routes.profile);
                                                        }}
                                                    >
                                                        Thông tin tài khoản
                                                    </Button>
                                                </div>
                                                <div className="border-b border-b-blue-gray-100">
                                                    <Button
                                                        fullWidth
                                                        variant="text"
                                                        className="flex"
                                                        onClick={() => {
                                                            closeDrawer();
                                                            navigate(routes.orders);
                                                        }}
                                                    >
                                                        Đơn hàng
                                                    </Button>
                                                </div>
                                                <div className="border-b border-b-blue-gray-100">
                                                    <Button fullWidth variant="text" className="flex" onClick={handleLogout}>
                                                        Đăng xuất
                                                    </Button>
                                                </div>
                                            </AccordionBody>
                                        </Accordion>
                                    ) : (
                                        <Button
                                            color="blue"
                                            variant="gradient"
                                            fullWidth
                                            onClick={() => {
                                                closeDrawer();
                                                navigate(routes.login);
                                            }}
                                        >
                                            <span className="line-clamp-1">Đăng nhập</span>
                                        </Button>
                                    )}
                                </li>
                            </ul>
                        </Drawer>
                    </div>
                </div>
                {showSearchbar && (
                    <div className="animation-dropdown absolute inset-x-0 top-full hidden place-items-center bg-white p-3 lg:grid">
                        <CustomSearchbar />
                    </div>
                )}
            </nav>
        </header>
    );
}

export default CustomHeader;

const Logo = () => (
    <Link to={routes.home} className="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Accessories Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold">Accessories</span>
    </Link>
);
