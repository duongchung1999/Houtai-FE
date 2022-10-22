import { RoleAPI } from '@/api/roleAPI';
import VModalBox from '@/components/VModalBox/index.vue';
import { Role } from '@/entity/role';
import { removeEle, updateEle } from '@/utils';
import Vue from "vue";
import { Component } from 'vue-property-decorator';

@Component({ name: "RoleManagePage", components: { VModalBox } })
export default class RoleManagePage extends Vue {
    roles: Role[] = [];

    rules = {
        name: [{ required: true, message: '角色名称不能为空', triggler: 'click' }],
        level: [{ required: true, type: 'number', message: '权限等级不能为空', triggler: 'click' }],
    }

    modal = {
        visible: false,
        addMode: false,
        title: '',
        formData: new Role(),
    }

    selectedRole: Role = null;

    async mounted() {
        this.roles = await RoleAPI.getList();
    }

    showEditModel(r: Role) {
        this.modal = {
            visible: true,
            addMode: false,
            title: "编辑角色",
            formData: { ...r }
        }
    }

    showAddModel() {
        this.modal = {
            visible: true,
            addMode: true,
            title: "添加角色",
            formData: new Role()
        }
    }

    async addRole(r: Role) {
        let addedRole = await RoleAPI.add(r);
        this.roles.push(addedRole);

        this.$message.success('添加成功');
        this.modal.visible = false;
    }

    async deleteRole(r: Role) {
        this.$confirm('是否删除这个角色', '删除角色')
            .then(async _ => {
                await RoleAPI.del(r.id);
                removeEle(this.roles, e => e.id == r.id);

                this.$message.success('删除成功');
            }).catch(e => console.info(e))
    }

    async updateRole(r: Role) {
        let updatedRole = await RoleAPI.update(r);
        updateEle(this.roles, updatedRole, e => e.id == updatedRole.id);

        this.$message.success('更新成功');
        this.modal.visible = false;
    }

};