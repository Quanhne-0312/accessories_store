import { Button, Input } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import CustomAddressSelection from '../partials/CustomAddressSelection';
import CustomAvatarUpload from '../partials/CustomAvatarUpload';
import CustomEditor from '../partials/CustomEditor';
import CustomUserDetailsItem from '../partials/CustomUserDetailsItem';

const passwordPattern = '(?=.*\\d)[A-Z].{6,}';
const passwordTitle = 'Mat khau phai tren 6 ky tu, viet hoa chu cai dau va co it nhat 1 so.';

export function CustomUserEditorForm({ data, isCreate, onChange }) {
    const handleOnChangeAddress = (key, value) => {
        switch (key) {
            case 'province':
                onChange('address', {
                    ...data.address,
                    province: value,
                    district: '',
                    ward: '',
                });
                break;
            case 'district':
                onChange('address', {
                    ...data.address,
                    district: value,
                    ward: '',
                });
                break;
            case 'ward':
                onChange('address', {
                    ...data.address,
                    ward: value,
                });
                break;
            default:
                onChange('address', {
                    ...data.address,
                    location: value,
                });
                break;
        }
    };
    const contents = [
        {
            layout: 'header',
            items: [
                {
                    key: 'name',
                    type: 'text',
                    label: 'Họ tên',
                },
                {
                    key: 'birth',
                    type: 'date',
                    label: 'Ngày sinh',
                },
            ],
        },
        {
            layout: 'body',
            items: [
                {
                    key: 'phone_number',
                    type: 'tel',
                    label: 'Số điện thoại',
                    pattern: '0+[0-9]{9}',
                    readOnly: true,
                },
                {
                    key: 'email',
                    type: 'email',
                    label: 'Email',
                    readOnly: true,
                },
                {
                    key: 'password',
                    type: 'password',
                    pattern: passwordPattern,
                    label: 'Mật khẩu',
                    readOnly: true,
                },
            ],
        },
    ];

    return (
        <div className="grid w-full gap-6 md:grid-cols-2">
            <div className="grid place-items-center">
                <CustomAvatarUpload
                    avatar={data?.avatar}
                    readOnly={false}
                    onChangeAvatar={(value) => onChange('avatar', value)}
                />
            </div>
            <div className="grid gap-4">
                {contents.map(({ layout, items }, index) =>
                    layout === 'header'
                        ? items.map((item) => (
                              <Input
                                  key={item.key}
                                  size="lg"
                                  color="blue"
                                  type={item.type}
                                  label={item.label}
                                  pattern={item.pattern ?? null}
                                  value={data[item.key] ?? ''}
                                  onChange={(e) => onChange(item.key, e.target.value)}
                                  readOnly={item.readOnly && !isCreate ? true : false}
                              />
                          ))
                        : items.map((item) => (
                              <div key={item.key} className="flex items-end justify-between gap-2 pl-1">
                                  {item.readOnly && !isCreate ? (
                                      <>
                                          <CustomUserDetailsItem
                                              label={item.label}
                                              text={data[item.key] ? data[item.key] : 'unknown'}
                                              encrypt={item.key}
                                          />
                                          <Button
                                              size="sm"
                                              color="blue"
                                              variant="text"
                                              className="whitespace-nowrap px-2"
                                          >
                                              Chỉnh sửa
                                          </Button>
                                      </>
                                  ) : (
                                      <Input
                                          key={item.key}
                                          size="lg"
                                          color="blue"
                                          type={item.type}
                                          label={item.label}
                                          pattern={item.pattern ?? null}
                                          title={item.type === 'password' ? passwordTitle : undefined}
                                          value={data[item.key] ?? ''}
                                          onChange={(e) => onChange(item.key, e.target.value)}
                                          readOnly={item.readOnly && !isCreate ? true : false}
                                      />
                                  )}
                              </div>
                          )),
                )}
                <CustomAddressSelection address={data?.address} onChange={handleOnChangeAddress} />
            </div>
            <div className="grid gap-6 md:col-span-2">
                <CustomEditor value={data?.bio} onChange={(value) => onChange('bio', value)} />
            </div>
        </div>
    );
}

CustomUserEditorForm.defaultProps = {};

CustomUserEditorForm.propTypes = {
    data: PropTypes.object,
    isCreate: PropTypes.bool,
    onChange: PropTypes.func,
};

export default CustomUserEditorForm;
