import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { logout, refreshTokens } from './redux/actions/authAction';
import { useEffect, useRef } from 'react';
import NotFound from './pages/NotFound';

function ScrollToTop() {
    const { pathname, search, hash } = useLocation();

    useEffect(() => {
        window.requestAnimationFrame(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
    }, [pathname, search, hash]);

    return null;
}

function App() {
    const dispatch = useDispatch();
    const { isLogged, refreshToken } = useSelector((state) => state.auth);
    const refreshStarted = useRef(false);

    useEffect(() => {
        if (refreshStarted.current) return;
        refreshStarted.current = true;

        const handleRefreshTokens = async () => {
            try {
                if (refreshToken) {
                    await dispatch(refreshTokens());
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.log(error);
                dispatch(logout());
            }
        };

        handleRefreshTokens();
    }, []);

    return (
        <div className="App">
            <ScrollToTop />
            <Routes>
                {publicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <route.Layout>
                                <route.Component />
                            </route.Layout>
                        }
                    />
                ))}
                {isLogged &&
                    privateRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <route.Layout>
                                    <route.Component />
                                </route.Layout>
                            }
                        />
                    ))}
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
