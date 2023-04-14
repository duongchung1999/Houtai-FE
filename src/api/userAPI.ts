import { User } from 'src/entity/user';
import { get, add, update, del } from '@/utils/request'
import { PageList } from '@/entity/pageList';

const BASE_PATH = "/users";

/**
 * a class that send request relevant to user
 * @version v2.0.0
 */
export class UserAPI {
    /**
     * fetch user informaction
     * @param userUk user ID or username
     * @returns 
     */
    static getInfo(userUk: string | number): Promise<User> {
        return get(`${BASE_PATH}/info/${userUk}`)
    }

    /** 获取权限选项 */
    static getRoleOptions(): Promise<{ names: string[], values: number[] }> {
        return get(`${BASE_PATH}/role-options/`)
    }


    /**
     * 获取用户信息列表
     * @param page 页码
     * @param size 页面大小
     * @returns 
     */
    static async getInfoList(page: number, size: number): Promise<PageList<User>> {
        return await get(`${BASE_PATH}/info`, { page, size });
    }

    /**
     * delete user
     * @param {User} user
     * @returns empty object
     */
    static del(user: User): Promise<User> {
        return del(BASE_PATH, user);
    }

    /**
     * modify user
     * @param {User} user 
     * @returns modified user entity
     */
    static async update(user: User): Promise<User> {
        return update(BASE_PATH, user);
    }

    /**
     * 更新当前用户的语言选项
     * @param lang 语言选项
     * @returns 
     */
    static async updateUserLang(lang: string = 'ZN'): Promise<boolean> {
        return update(`${BASE_PATH}/user-lang/${lang}`, {});
    }

    /**修改密码 */
    static async changePassword(u: User): Promise<User> {
        return update(`${BASE_PATH}/change-password`, u);
    }

    /**
     * register user
     * @param {User} user 
     * @returns registered user entity
     */
    static register(user: User): Promise<User> {
        return add(BASE_PATH, user);
    }

    /**
     * login and fetch token
     * @param user 
     * @returns \{ token, refeshToken}
     * @see 
     * some API need carry token for request, so you must set the token in the rqeuest headers.
     * 
     * about code of setting token, please read this file—— {@link ../utils/request.js }. 
     */
    static login(user: User): any {
        return add(`${BASE_PATH}/token`, user);
    }
}