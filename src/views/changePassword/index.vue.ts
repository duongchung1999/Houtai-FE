import { UserAPI } from '@/api/userAPI'
import { UserModelAPI } from '@/api/userModelAPI'
import VModalBox from '@/components/VModalBox/index.vue'
import { User } from '@/entity/user'
import { userModule } from '@/store/modules'
import { ElForm } from 'element-ui/types/form'
import Vue from 'vue'
import { Component, Ref } from 'vue-property-decorator'

@Component({ name: 'UserManagePage', components: { VModalBox } })
export default class UserManagePage extends Vue {
    user: User = null;
    form = {
      newPassword: '',
      confirmPassword: ''
    }

    validComfirmPwd(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    rules = {
      newPassword: [{ required: true, message: '新密码不能为空', trigger: 'click' }],
      confirmPassword: [
        { required: true, message: '新密码不能为空', trigger: 'click' },
        { validator: this.validComfirmPwd, trigger: 'click' }
      ]
    }

    @Ref('form')
    formRef: ElForm;

    async submit() {
      const valid = await this.formRef.validate()
      if (!valid) return

      this.user = { ...userModule.nowUser }
      this.user.password = this.form.newPassword

      await UserAPI.changePassword(this.user)
      this.$message.success('修改密码成功，请重新登录')

      userModule.logout()
      this.$router.push('/login')
    }
}
