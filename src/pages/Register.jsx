import CustomAddressSelection from '@/components/partials/CustomAddressSelection';
import { login } from '@/redux/actions/authAction';
import { routes } from '@/routes';
import { authService } from '@/services';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, CardFooter, Checkbox, Input, Spinner, Typography } from '@material-tailwind/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const passwordPattern = '(?=.*\\d)[A-Z].{6,}';
const passwordTitle = 'Mat khau phai tren 6 ky tu, viet hoa chu cai dau va co it nhat 1 so.';

function Register() {
    const [isLoading, setLoading] = useState(false);
    const [isSubmitable, setSubmitable] = useState(false);
    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isEqualPassword, setEqualPassword] = useState(false);
    const [isAgreeCondition, setAgreeCondition] = useState(false);
    const [address, setAddress] = useState({});
    const [userData, setUserData] = useState({
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
        name: '',
        address: '',
    });

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleToggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleOnChange = (key, value) => {
        setUserData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleOnChangeAddress = (key, value) => {
        setAddress((prevState) => ({
            ...prevState,
            [key]: value,
        }));

        const { location, ...rest } = address;

        const addressArray = Object.values(rest);

        handleOnChange('address', [...addressArray, location].reverse().join(' - '));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(null);
        handleRegister(userData);
    };

    const handleRegister = async (data) => {
        try {
            setLoading(true);
            const response = await authService.registerService(data);
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
        const { email, phone_number, password, confirm_password, name, address } = userData;

        if (
            isAgreeCondition &&
            !_.isEmpty(email) &&
            !_.isEmpty(phone_number) &&
            !_.isEmpty(password) &&
            !_.isEmpty(confirm_password) &&
            !_.isEmpty(name) &&
            !_.isEmpty(address) &&
            _.isEqual(password, confirm_password)
        ) {
            setSubmitable(true);
        } else {
            setSubmitable(false);
        }

        if (_.isEqual(password, confirm_password)) {
            setMessage(null);
        } else {
            setMessage('Xác nhận mật khẩu không khớp, kiểm tra lại!');
        }
    }, [userData, isAgreeCondition]);

    const contents = [
        {
            key: 'phone_number',
            label: 'Số điện thoại',
            type: 'tel',
            pattern: '0+[0-9]{9}',
            require: true,
        },
        {
            key: 'email',
            label: 'Email',
            type: 'email',
            require: true,
        },
        {
            key: 'password',
            label: 'Mật khẩu',
            type: 'password',
            pattern: passwordPattern,
            require: true,
        },

        {
            key: 'confirm_password',
            label: 'Xác nhận mật khẩu',
            type: 'password',
            pattern: passwordPattern,
            require: true,
        },
        {
            key: 'name',
            label: 'Tên bạn là gì?',
            type: 'text',
        },
    ];

    return (
        <div className="grid min-h-screen md:grid-cols-2">
            <img
                src="https://www.junie.vn/cdn/shop/files/NonSale_HP_Hero_5-16_5-23_Desktop.jpg?v=1684537968&width=3000"
                className="absolute inset-0 -z-10 h-full object-cover object-right"
            />
            <div className="grid h-full w-full place-items-center bg-white">
                <Card className="shadow-none">
                    <form action="#" onSubmit={handleSubmit}>
                        <CardBody>
                            <div className="grid max-w-sm gap-4">
                                <Typography variant="h5" className="text-center">
                                    Đăng ký
                                </Typography>

                                {message && (
                                    <Typography className="animation-float text-center text-sm font-medium text-red-700">
                                        {message}
                                    </Typography>
                                )}

                                {contents.map((item, index) =>
                                    item.type === 'password' ? (
                                        <Input
                                            key={item.key}
                                            size="lg"
                                            color="blue"
                                            label={item.label}
                                            pattern={item.pattern ?? null}
                                            title={item.type === 'password' ? passwordTitle : undefined}
                                            value={userData[item.key] ?? ''}
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={(e) => handleOnChange(item.key, e.target.value)}
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
                                    ) : (
                                        <Input
                                            key={item.key}
                                            size="lg"
                                            color="blue"
                                            type={item.type}
                                            label={item.label}
                                            pattern={item.pattern ?? null}
                                            value={userData[item.key] ?? ''}
                                            onChange={(e) => handleOnChange(item.key, e.target.value)}
                                            required={item.require}
                                        />
                                    ),
                                )}

                                <CustomAddressSelection address={address ?? {}} onChange={handleOnChangeAddress} />

                                <Checkbox
                                    checked={isAgreeCondition}
                                    label={
                                        <Typography className="text-sm font-medium">
                                            Đồng ý với đ.kiện và đ.khoản sử dụng
                                        </Typography>
                                    }
                                    onChange={() => setAgreeCondition((prevState) => !prevState)}
                                />
                            </div>
                        </CardBody>
                        <CardFooter className="grid gap-4 pt-0">
                            <Button
                                type="submit"
                                variant="gradient"
                                className="flex items-center justify-center gap-2"
                                disabled={!isSubmitable || isLoading}
                                fullWidth
                            >
                                {isLoading && <Spinner className="h-5 w-5" />}
                                Đăng ký
                            </Button>
                            <div color="blue" className="flex items-center justify-center gap-2 ">
                                <Typography className="text-sm">Đã có tài khoản?</Typography>
                                <Link to={{ pathname: routes.login, state: { from: location.pathname } }}>
                                    <Typography color="blue" className="text-sm font-medium">
                                        Đăng nhập
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

export default Register;
