import { BaseEntity } from "./baseEntity";

export enum RoleOptions {
    /// <summary>
    /// 无权限
    /// </summary>
    NONE = 1 << 0,

    /// <summary>
    /// 基础权限
    /// </summary>
    NORMAL = 1 << 2,

    /// <summary>
    /// 软体
    /// </summary>
    SW = 1 << 3,

    /// <summary>
    /// 账号管理员
    /// </summary>
    ACCOUNT_MANAGER = 1 << 4,

    /// <summary>
    /// 管理员
    /// </summary>
    ADMIN = 1 << 5,
}

/**
 * user
 */
export class User {
    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }

    public id?: number = undefined;
    /** nickanme */
    public nickname?: string = undefined;
    /** username（account） */
    public username?: string = undefined;
    /** password */
    public password?: string = undefined;

    /** permission role */
    public role?: RoleOptions = undefined;
}