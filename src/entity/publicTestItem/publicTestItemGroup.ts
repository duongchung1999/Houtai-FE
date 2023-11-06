import { BaseEntity } from './../baseEntity'

/**
/** 通用测试项目组 */
export class PublicTestItemGroup {
  constructor(data?: any) {
    BaseEntity.converter(this, data)
  }

  id?: number = undefined

  /** 概述 */
  summary?: string = undefined

  /** dll名称 */
  dllName?: string = undefined

  /** 备注 */
  mark?: string = undefined
}
