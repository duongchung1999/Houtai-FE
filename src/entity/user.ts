import { BaseEntity } from './baseEntity'
import { PermissionRole } from './permissionRole'

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

    public roleId?: number = undefined;

    public permissionRole?: PermissionRole = undefined;

    /** 语言选项 */
    public lang?: string = 'ZN'
}
