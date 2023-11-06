import { UserAPI } from '@/api/userAPI'
import { User } from '@/entity/user'
import { removeEle, updateEle } from '@/utils'
import { setToken, removeToken, getToken } from '@/utils/cookies'
import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '../index'

// if you want to use getModule(m: VuexModule) to get this module, set following decorator parameters (name,store and dynamic)
@Module({ name: 'user', store, dynamic: true, namespaced: true })
export default class UserModule extends VuexModule {
    /** user token */
    token = '';
    /** refreshToken */
    refreshToken = '';
    username = '';
    nickname = '';
    id = 0;
    role = '';
    /** logined user */
    nowUser: User = new User();
    /** this property is usually used to front-end elements binding selected user */
    user: User = {};
    /** user informations, must be initialized */
    users: User[] = [];

    get nowUserLang() {
      return this.nowUser.lang
    }

    @Mutation
    public RESET_STATE() {
      removeToken()
      this.token = ''
      this.refreshToken = ''
      this.username = ''
      this.nickname = ''
      this.id = 0
      this.role = ''
      this.nowUser = new User()
      this.user = new User()
      this.users = new Array<User>()
    }

    /**
     * login and set token
     * @param user a user entity that with a username and a password
     * @returns \{token, refreshToken}
     */
    @MutationAction
    public async login(user: User) {
      const { token, refreshToken } = await UserAPI.login(user)
      setToken(token)
      console.info(getToken())
      return { token, refreshToken }
    }

    /**
     * logout and reset state
     */
    @Action
    public logout() {
      removeToken() // must remove  token  first
      // resetRouter()
      this.context.commit('RESET_STATE')
    }

    /**
     * fetch user information
     * @param userId
     * @returns
     */
    @MutationAction
    public async getInfo(userId: number) {
      const result = await UserAPI.getInfo(userId)
      return {
        nowUser: result,
        id: result.id,
        nickname: result.nickname
      }
    }

    /**
     * 获取用户信息列表
     * @param param0 page and size
     * @returns
     */
    @MutationAction
    public async getInfoList({ page, size }: { page: number, size: number }) {
      const result = await UserAPI.getInfoList(page, size)
      return { users: result.items }
    }

    @Mutation
    public updateUserLangMutaion(lang: string) {
      this.nowUser.lang = lang
    }

    @Action
    public async updateUserLang({ lang }: { lang: string }) {
      await UserAPI.updateUserLang(lang)
      this.context.commit('updateUserLangMutaion', lang)
    }

    @Action
    public async update(u: User) {
      const result = await UserAPI.update(u)
      updateEle(this.users, result, e => e.id == result.id)
      if (this.user.id === result.id) {
        this.setState({ user: result })
      }
    }

    @Action
    public async add(u: User) {
      const result = await UserAPI.register(u)
      this.users.push(result)
    }

    @Action
    public async delete(u: User) {
      await UserAPI.del(u)
      removeEle(this.users, e => e.id == u.id)
    }

    @Action
    public resetToken() {
      removeToken() // must remove  token  first
      this.context.commit('RESET_STATE')
    }

    /**
     * set model state
     * @param stateFragment a object like this module state object, key is you want to update state ojbect key name and value is you want to update new value. if key not in state, throw error (ERR_MUTATE_PARAMS_NOT_IN_PAYLOAD)
     * @returns
     */
    @MutationAction
    public async setState(stateFragment: object) {
      return stateFragment
    }
}
