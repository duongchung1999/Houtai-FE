import { BaseEntity } from './baseEntity'

export class UserModel {
  constructor(data?: any) {
    BaseEntity.converter(this, data)
  }

    id?: number = undefined;
    modelId?: number = undefined;
    userId?: number = undefined;
}
