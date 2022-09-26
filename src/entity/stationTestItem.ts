import { BaseEntity } from "./baseEntity";
import { Station } from "./station";
import { TestItem } from "./testItem";

export class StationTestItem {
    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }

    public id?: number = undefined;

    /** ID of the station that assigend this test item */
    public stationId?: number = undefined;

    /** ID of testItem */
    public testItemId?: number = undefined;

    /** test sort of the test item */
    public sortIndex?: number = undefined;

    public testItem?: TestItem = undefined;

    public station?: Station = undefined;
}