
import { get, add, update, del } from '@/utils/request';
import { PermissionRole } from '@/entity/permissionRole';

const BASE_PATH = "/roles";

export class RoleAPI {
    static get(roleId: number): Promise<PermissionRole> { return get(`${BASE_PATH}/${roleId}`) }
    
    static getList(): Promise<PermissionRole[]> { return get(`${BASE_PATH}/list`) }

    static update(role: PermissionRole): Promise<PermissionRole> { return update(BASE_PATH, role) }

    static add(role: PermissionRole): Promise<PermissionRole> { return add(BASE_PATH, role) }

    static del(roleId: number): Promise<void> { return del(`${BASE_PATH}/${roleId}`); }
}