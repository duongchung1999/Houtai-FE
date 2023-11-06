import { RoleAPI } from '@/api/roleAPI'
import VModalBox from '@/components/VModalBox/index.vue'
import { PermissionRole } from '@/entity/permissionRole'
import { User } from '@/entity/user'
import { userModule } from '@/store/modules'
import Vue from 'vue'
import { Component, Ref } from 'vue-property-decorator'
import { getTranslation } from '@/multi-language/multi-language'
// TODO 权限选项旁边增加序号

@Component({ name: 'UserManagePage', components: { VModalBox } })
export default class UserManagePage extends Vue {
    rules = {
      username: [{ required: true, message: '用户名不能为空', trigger: 'click' }],
      nickname: [{ required: true, message: '昵称不能为空', trigger: 'click' }],
      // role: [{ required: true, message: '权限不能为空', trigger: 'click' },],
      permissionRole: [{ required: true, message: '权限不能为空', trigger: 'click' }]
      // password: [{ required: true, message: '密码不能为空', trigger: 'click' },],
    }

    userModal = {
      visible: false,
      addMode: false,
      title: '',
      formData: new User()
    }

    permissionRoles: PermissionRole[] = []

    selectedUser: User = null;

    get users() {
      const users = userModule.users
      return users.filter(e => e.permissionRole.level <= userModule.nowUser.permissionRole.level)
    }

    async mounted() {
      // 加载用户列表
      await userModule.getInfoList({ page: 1, size: 1000 })

      // 加载权限角色列表
      this.permissionRoles = await RoleAPI.getList()
    }

    showEditModel(u: User) {
      this.userModal = {
        visible: true,
        addMode: false,
        title: '编辑用户',
        formData: { ...u, password: '' }
      }
    }

    showAddModel() {
      this.userModal = {
        visible: true,
        addMode: true,
        title: '添加用户',
        formData: new User()
      }
    }

    @Ref('user-modal-box')
    userModalBox: VModalBox;

    async addUser(user: User) {
      await this.userModalBox.elForm.validate()
      user.roleId = user.permissionRole.id
      delete user.permissionRole
      await userModule.add(user)
      this.$message.success('添加成功')
      await userModule.getInfoList({ page: 1, size: 1000 })
      this.userModal.visible = false
    }

    async updateUser(user: User) {
      await this.userModalBox.elForm.validate()
      user.roleId = user.permissionRole.id
      delete user.permissionRole
      await userModule.update(user)
      this.$message.success('更新成功')
      this.userModal.visible = false
    }

    async deleteUser(formData: User) {
      const user = formData as User
      this.$confirm('确定要和删除这个用户吗', '删除用户', { confirmButtonText: '删除', cancelButtonText: '否' })
        .then(async _ => {
          userModule.delete(user)
          this.$message.success('删除成功')
        })
        .catch(e => console.info(e))
    }
}
