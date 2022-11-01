import { RoleAPI } from '@/api/roleAPI';
import VModalBox from '@/components/VModalBox/index.vue';
import { PermissionRole } from '@/entity/permissionRole';
import { RoleOptions, User } from '@/entity/user';
import { userModule } from '@/store/modules';
import Vue from "vue";
import { Component, Ref } from 'vue-property-decorator';

@Component({ name: "UserManagePage", components: { VModalBox } })
export default class UserManagePage extends Vue {
    get roleOptions() {
        let result = new Array<{ name: string, value: number }>();
        let nowUserRoleValue = userModule.nowUser.role;

        // 遍历枚举，会反向再遍历一边，取1/2
        for (const value in RoleOptions) {
            const name = RoleOptions[value];
            result.push({ name, value: parseInt(value) })
        }

        // 取前 1/2
        result = result.splice(0, (result.length) / 2)

        // 如果不是管理员，过滤比自己高的权限选项
        return result.filter(e => {
            if (nowUserRoleValue == RoleOptions.ADMIN) return true;
            return nowUserRoleValue > RoleOptions[e.name]
        });
    }

    get roleValues() {
        let values: number[] = [];
        this.roleOptions.forEach(e => values.push(e.value));
        return values;
    }

    rules = {
        username: [{ required: true, message: '用户名不能为空', trigger: 'click' },],
        nickname: [{ required: true, message: '昵称不能为空', trigger: 'click' },],
        // role: [{ required: true, message: '权限不能为空', trigger: 'click' },],
        permissionRole:[{ required: true, message: '权限不能为空', trigger: 'click' },],
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
        let users = userModule.users;
        return users.filter(e => e.role <= userModule.nowUser.role);
    }

    async mounted() {
        //加载用户列表
        await userModule.getInfoList({ page: 1, size: 1000 });

        //加载权限角色列表
        this.permissionRoles = await RoleAPI.getList();
    }
 
    showEditModel(u: User) {
        this.userModal = {
            visible: true,
            addMode: false,
            title: "编辑用户",
            formData: { ...u, password: '' }
        }
    }

    showAddModel() {
        this.userModal = {
            visible: true,
            addMode: true,
            title: "添加用户",
            formData: new User()
        }
    }

    @Ref('user-modal-box')
    userModalBox: VModalBox;

    async addUser(user: User) {
        await this.userModalBox.elForm.validate()
        user.roleId = user.permissionRole.id;
        delete user.permissionRole;
        await userModule.add(user);
        this.$message.success('添加成功')
        await userModule.getInfoList({ page: 1, size: 1000 });
        this.userModal.visible = false;
    }
    
    async updateUser(user: User) {
        await this.userModalBox.elForm.validate()
        user.roleId = user.permissionRole.id;
        delete user.permissionRole;
        await userModule.update(user);
        this.$message.success('更新成功')
        this.userModal.visible = false;
    }

    async deleteUser(formData: User) {
        let user = formData as User;
        this.$confirm('确定要和删除这个用户吗', '删除用户', { confirmButtonText: '删除', cancelButtonText: '否' })
            .then(async _ => {
                userModule.delete(user)
                this.$message.success('删除成功');
            })
            .catch(e => console.info(e));
    }

    getRoleName(value: number) {
        return RoleOptions[value];
    }

};