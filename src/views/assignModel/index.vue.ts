import { ModelAPI } from '@/api/modelAPI';
import { UserModelAPI } from '@/api/userModelAPI';
import { Model } from '@/entity/model';
import { User } from '@/entity/user';
import { UserModel } from '@/entity/userModel';
import { modelModule, userModule } from '@/store/modules';
import Vue from "vue";
import { Component } from 'vue-property-decorator';
// todo 分页

@Component({ name: "AssignModelgPage" })
export default class AssignModelgPage extends Vue {
    allocateModelKeyWord = '';
    unallocateModelKeyWord = '';

    dialogVisible = false;
    selectedUser: User = null;
    user: User = null;
    model: Model = null;

    userModels: Model[] = [];

    get filteredUserMdoles() {
        return this.userModels.filter(e => e.name.includes(this.allocateModelKeyWord))
    }
    filter = {
        //总页数
        pageCount: 0,
        // 当前页数
        page: 1,
        //页面大小
        pageSize: 20,
    }

    get filteredUnalloateModels() {
        let models = modelModule.modelList;
        models = models.filter(e => !this.userModels.some(um => um.name == e.name))
        return models.filter(e => e.name.includes(this.unallocateModelKeyWord))
    }

    users: User[] = []

    /** 列表 */
    list = new Array<{ user: User, models: Model[] }>();

    get filteredList() {
        if (this.selectedUser) {
            return this.list.filter(e => e.user.id == this.selectedUser.id);
        }
        return this.list.sort((a, b) => a.user.id > b.user.id ? 1 : -1);
    }

    async mounted() {
        //加载用户列表
        await userModule.getInfoList({ page: 1, size: 1000 });


        userModule.users.forEach(u => {
            if (userModule.nowUser.role > u.role) {
                this.users.push(u)
            }
        })

        this.users.forEach(async user => {
            let models = await ModelAPI.getList(user.id)
            this.list.push({ user, models })
        });

        await modelModule.getList(userModule.nowUser.id);
    }

    showDialog(user: User) {
        this.user = user;
        this.model = new Model();
        let models = this.list.find(e => e.user.id == this.user.id).models;
        this.userModels = [];
        models.forEach(m => this.userModels.push(m))
        this.dialogVisible = true;
    }

    addModel2User(m: Model) {
        if (this.userModels.find(e => e.id == m.id)) {
            this.$message.warning('已经分配过这个机型');
            return;
        }
        this.userModels.push(m);
        this.model = null;
    }

    removeModel4User(m: Model) {
        let index = this.userModels.findIndex(e => e.id == m.id);
        if (index != -1) {
            this.userModels.splice(index, 1);
        }
    }

    async assign() {
        let userModelList: UserModel[] = [];
        this.userModels.forEach(m => {
            userModelList.push({
                modelId: m.id,
                userId: this.user.id
            })
        })

        await UserModelAPI.Reallocate(userModelList);

        this.$message.success('分配成功');

        //更新表格数据
        let um = this.list.find(e => e.user.id == this.user.id);
        um.models = await ModelAPI.getList(this.user.id);

        this.dialogVisible = false;
    }
};