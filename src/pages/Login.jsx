import { login } from '@/redux/actions/authAction';
import { routes } from '@/routes';
import { authService } from '@/services';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, CardFooter, Input, Spinner, Typography } from '@material-tailwind/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Login() {
    const [isLoading, setLoading] = useState(false);
    const [isLoginable, setLoginable] = useState(false);
    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleToggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(null);
        handleLogin(username, password);
    };

    const handleLogin = async (username, password) => {
        try {
            setLoading(true);
            const response = await authService.loginService(username, password);
            if (response) {
                const { code, message: resMessage, result, accessToken, refreshToken } = response;
                if (code === 'SUCCESS') {
                    dispatch(
                        login({
                            user: result,
                            accessToken,
                            refreshToken,
                        }),
                    );
                    navigate(routes.home);
                    // navigate(location.state?.from === routes.register ? routes.home : -1);
                } else {
                    setMessage(resMessage);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!_.isEmpty(username) && !_.isEmpty(password)) {
            setLoginable(true);
        } else {
            setLoginable(false);
        }
    }, [username, password]);

    return (
        <div className="grid min-h-screen md:grid-cols-2">
            <img
                src="https://www.junie.vn/cdn/shop/files/NonSale_HP_Hero_5-16_5-23_Desktop.jpg?v=1684537968&width=3000"
                className="absolute inset-0 -z-10 h-full object-cover object-left"
            />
            <div></div>
            <div className="grid h-full w-full place-items-center bg-white">
                <Card className="shadow-none">
                    <form action="#" onSubmit={handleSubmit}>
                        <CardBody className="flex min-w-[320px] flex-col gap-4">
                            <Typography variant="h5" className="text-center">
                                Đăng nhập
                            </Typography>

                            {message && (
                                <Typography className="animation-float text-center text-sm font-medium text-red-700">
                                    {message}
                                </Typography>
                            )}

                            <Input
                                type="text"
                                label="Email hoặc SĐT"
                                size="lg"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <Input
                                size="lg"
                                type={showPassword ? 'text' : 'password'}
                                label="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                icon={
                                    <div className="cursor-pointer" onClick={handleToggleShowPassword}>
                                        {showPassword ? (
                                            <EyeIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        )}
                                    </div>
                                }
                            />
                        </CardBody>
                        <CardFooter className="grid gap-4 pt-0">
                            <Button
                                type="submit"
                                variant="gradient"
                                className="flex items-center justify-center gap-2"
                                disabled={!isLoginable || isLoading}
                                fullWidth
                            >
                                {isLoading && <Spinner className="h-5 w-5" />}
                                Đăng nhập
                            </Button>
                            <div color="blue" className="flex items-center justify-center gap-2 ">
                                <Typography className="text-sm">Chưa có tài khoản?</Typography>
                                <Link to={routes.register}>
                                    <Typography color="blue" className="text-sm font-medium">
                                        Đăng ký
                                    </Typography>
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Login;
