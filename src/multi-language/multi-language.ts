const texts = {
  /** 机型 */
  model: {
    ZN: '机型',
    VN: 'Phiên bản máy',
    EN: 'model'
  },
  /** 料号配置 */
  part_number_configuration: {
    ZN: '料号配置',
    VN: 'Cấu hình số hiệu phụ tùng',
    EN: 'part number configuration'
  },
  /** 分配机型 */
  assign_models: {
    ZN: '分配机型',
    VN: 'Phân bổ các phiên bản máy',
    EN: 'assign models'
  },
  /** 测试项目 */
  test_items: {
    ZN: '测试项目',
    VN: 'Mục kiểm tra',
    EN: 'test items'
  },
  /** 站别测试项目 */
  station_test_items: {
    ZN: '站别测试项目',
    VN: 'Mục kiểm tra trạm',
    EN: 'station test items'
  },
  /** 操作记录 */
  operation_records: {
    ZN: '操作记录',
    VN: 'Ghi chép thao tác',
    EN: 'operation records'
  },
  /** 添加机型 */
  add_model: {
    ZN: '添加机型',
    VN: 'Thêm phiên bản máy',
    EN: 'Add model'
  },
  /** 添加站别 */
  add_station: {
    ZN: '添加站别',
    VN: 'Thêm trạm',
    EN: 'Add station'
  },
  /** 修改名称 */
  modify_name: {
    ZN: '修改名称',
    VN: 'Đổi tên',
    EN: 'Modify name'
  },
  /** 设置密码 */
  set_password: {
    ZN: '设置密码',
    VN: 'Đặt mật khẩu',
    EN: 'Set password'
  },
  /** 删除 */
  delete: {
    ZN: '删除',
    VN: 'Xóa',
    EN: 'Delete'
  },
  /** 编辑配置 */
  edit_configuration: {
    ZN: '编辑配置',
    VN: 'Sửa cấu hình',
    EN: 'Edit configuration'
  },
  /** 保存配置 */
  save_configuration: {
    ZN: '保存配置',
    VN: 'Lưu cấu hình',
    EN: 'Save configuration'
  },
  /** 编辑机型名称 */
  edit_model_name: {
    ZN: '编辑机型名称',
    VN: 'Sửa tên phiên bản máy',
    EN: 'Edit model name'
  },
  /** 机型名称 */
  model_name: {
    ZN: '机型名称',
    VN: 'Tên phiên bản máy',
    EN: 'Model name'
  },
  /** 取消 */
  cancel: {
    ZN: '取消',
    VN: 'Hủy',
    EN: 'Cancel'
  },
  /** 添加 */
  add: {
    ZN: '添加',
    VN: 'Thêm',
    EN: 'Add'
  },
  /** 保存 */
  save: {
    ZN: '保存',
    VN: 'Lưu',
    EN: 'Save'
  },
  /** 确定 */
  confirm: {
    ZN: '确定',
    VN: 'Đồng ý',
    EN: 'Confirm'
  },
  /** 设置动态密码 */
  set_dynamic_password: {
    ZN: '设置动态密码',
    VN: 'Đặt mật khẩu động',
    EN: 'Set dynamic password'
  },
  /** 动态密码 */
  dynamic_password: {
    ZN: '动态密码',
    VN: 'Mật khẩu động',
    EN: 'Dynamic password'
  },
  /** 刷新 */
  refresh: {
    ZN: '刷新',
    VN: 'Làm mới',
    EN: 'Refresh'
  },
  /** 过期时间 */
  expiration_time: {
    ZN: '过期时间',
    VN: 'Thời gian hết hạn',
    EN: 'Expiration time'
  },
  /** 编辑站别名称 */
  edit_station_name: {
    ZN: '编辑站别名称',
    VN: 'Sửa tên trạm',
    EN: 'Edit station name'
  },
  /** 站别名称 */
  station_name: {
    ZN: '站别名称',
    VN: 'Tên trạm',
    EN: 'Station name'
  },
  /** 删除机型 */
  delete_model: {
    ZN: '删除机型',
    VN: 'Xóa phiên bản máy',
    EN: 'Delete model'
  },
  /** 删除站别 */
  delete_station: {
    ZN: '删除站别',
    VN: 'Xóa trạm',
    EN: 'Delete station'
  },
  /** 请选择机型 */
  please_select_device_model: {
    ZN: '请选择机型',
    VN: 'Vui lòng chọn kiểu máy',
    EN: 'Please select device model'
  },
  /** 主页 */
  home: {
    ZN: '主页',
    VN: 'trang chủ',
    EN: 'Home'
  },

  /** 切换语言 **/
  changeLanguage: {
    ZN: '切换语言',
    VN: 'Thay đổi ngôn ngữ',
    EN: 'Change language'
  },
  /** 修改密码 **/
  changePassword: {
    ZN: '修改密码',
    VN: 'Thay đổi mật khẩu',
    EN: 'Change password'
  },
  /** 退出登录 **/
  logout: {
    ZN: '退出登录',
    VN: 'Đăng xuất',
    EN: 'Logout'
  },
  /** 后台配置 **/
  admin_config: {
    ZN: '后台配置',
    EN: 'Admin Config',
    VN: 'Cấu hình quản trị viên'
  },

  /** 用户管理 **/
  user_management: {
    ZN: '用户管理',
    VN: 'Quản lý người dùng',
    EN: 'User Management'
  }

}

export function getTranslation(text: string, lang = 'ZN'): string {
  const textKeys = Object.keys(texts)

  // 遍历多语言文本中的所有keys
  // 比对其中的每个翻译
  // 如果找到源文本
  // 返回 文本Key.lang
  for (const textKey of textKeys) {
    const textGroup = texts[textKey]
    if (textGroup.ZN === text || textGroup.VN === text || textGroup.EN === text) {
      return textGroup[lang]
    }
  }

  console.warn('no text')
  return text
}

export interface LocaleOptions {
    language: string
    timezone: string
}

export function getTranslationDate(timestamp: number, lang: string): string {
  const date = new Date(timestamp)

  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const en_date = formatter.format(date)

  switch (lang) {
    case 'EN':
      return en_date
    case 'CN':
      return `${year}年${month}月${day}日`
    case 'VN':
      return `ngày ${day} tháng ${month} năm ${year}`
    default:
      return 'unknow lang'
  }
}

export default texts
