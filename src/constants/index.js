export const BASE_URL = process.env.REACT_APP_BASE_URL

export const DATE_TEMPLATE = 'DD/MM/YYYY'

export const DEFAULT_AVATAR = 'https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png'

export const ACCESS_TOKEN = 'access_token'

export const MESSAGE_FORM_ERROR = {
    // Back end error code
    existing_user_login: 'Tên đăng nhập đã tồn tại',
    existing_user_email: 'Email đã tồn tại',
    rest_user_invalid_password: 'Mật khẩu không hợp lệ',
    rest_user_invalid_username: 'Tên đăng nhập không hợp lệ',
    rest_user_invalid_email: 'Email không hợp lệ',
    password_length: 'Mật khẩu phải ít nhất 6 ký tự',

    // Front end error code
    email_required: 'Email không được rỗng',
    password_required: 'Mật khẩu không được rỗng',
    username_required: 'Tên đăng nhập không được rỗng',

    default: 'Có lỗi xảy ra, vui lòng thử lại'
}

export const ROUTER_POST = '/post/:slug'