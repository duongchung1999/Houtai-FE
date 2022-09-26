import { BaseEntity } from "./baseEntity";

export class TestItem {
    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }

    public id?: number = undefined;
    /** ID of the model that has this test item */
    public modelId?: number = undefined;

    /** test item name */
    public name?: string = undefined;

    /** test item result unit */
    public unit?: string = undefined;

    /** at template program invoke run method of model dll, this value will dispatch to run method */
    public cmd?: string = undefined;

    /** test result upper value */
    public upperValue?: string | number = undefined;

    /** test result lower value */
    public lowerValue?: string | number = undefined;

    /** test result comparsion options */
    public no?: number = undefined;

    /** is hidden in template program */
    public isHidden?: boolean = undefined;

    /** is always run in template program(even if test fail) */
    public isAlwaysRun?: boolean = undefined;
}