
import { get, add, update, del } from '@/utils/request';
import { Role } from '@/entity/role';

const BASE_PATH = "/roles";

export class RoleAPI {
    static get(roleId: number): Promise<Role> { return get(`${BASE_PATH}/${roleId}`) }
    
    static getList(): Promise<Role[]> { return get(`${BASE_PATH}/list`) }

    static update(role: Role): Promise<Role> { return update(BASE_PATH, role) }

    static add(role: Role): Promise<Role> { return add(BASE_PATH, role) }

    static del(roleId: number): Promise<void> { return del(`${BASE_PATH}/${roleId}`); }
}