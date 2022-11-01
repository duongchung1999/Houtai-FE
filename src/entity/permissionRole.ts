import { BaseEntity } from "./baseEntity";

export enum PermissionRoleOptions {
    ADMIN = 8,
    ACCOUNT_MANAGER = 7,
    SW = 5,
    TE = 4,
    /** 模板程序开发者 */
    TEMPLATE_PROGRAM_DEVELOPER = 2,
    BASC = 1,
}

/** 权限角色 */
export class PermissionRole {
    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }

    id?: number = undefined;

    /** 角色名称 */
    name?: string = undefined;

    /** 权限等级 */
    level?: number = undefined;
}