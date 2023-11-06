import { BaseEntity } from './baseEntity'

/** 动态码 */
export class DynamicCode {
  constructor(data?: any) {
    BaseEntity.converter(this, data)
  }

  id?: number = undefined

  modelId?: number = undefined

  modelName?: string = undefined

  /** 动态码 */
  code?: string = undefined

  /** 创建时间 */
  createDate: Date = undefined

  /** 到期时间 */
  expireDate: Date = undefined
}
