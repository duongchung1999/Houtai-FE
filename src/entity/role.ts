import { BaseEntity } from "./baseEntity";

/** 角色 */
export class Role {
    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }

    id?: number = undefined;

    /** 角色名称 */
    name?: string = undefined;

    /** 权限等级 */
    level?: number = undefined;
}