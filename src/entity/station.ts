import { BaseEntity } from './baseEntity'

export class Station {
  constructor(data?: any) {
    BaseEntity.converter(this, data)
  }

    public id?: number = undefined;

    /** station name */
    public name?: string = undefined;

    /** an ID that the model which own this staiton */
    public modelId?: number = undefined;

    /**  this config is used to template program config */
    public config?: string = undefined;
}
