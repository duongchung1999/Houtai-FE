import { get, add, update, del } from '@/utils/request'
import { TestItem } from '@/entity/testItem';
import { StationTestItem } from '@/entity/stationTestItem';

function BASE_PATH(routerParam: string | number) {
    return `/models/${routerParam}/test-items`
};

/**
 * relevant request of test item
 */
export class TestItemAPI {
 
    /**
     * search test items
     * @param modelUk [string] name of model that has the test items | [number] id of model that has the test items
     * @param stationId if stationId is not 0, search scope will be limted to this station 
     * @param keyWord key word of search
     * @returns 
     */
    public static async getList(modelUk: string | number, stationId: number = 0, keyWord: string| null = null): Promise<TestItem[]> {
        return await get(BASE_PATH(modelUk), { stationId, keyWord });
    }

    /**
     * delete a test item from model
     * @param modelId id of model that has this test item
     * @param testItem to delete test item
     * @returns empty object
     */
    public static async del(modelId: number, testItem: TestItem): Promise<TestItem> {
        return await del(BASE_PATH(modelId), testItem);
    }

    /**
     * add test item to model
     * @param modelId id of model to add this test item
     * @param testItem new test item
     * @returns new test item
     */
    public static async add(modelId: number, testItem: TestItem): Promise<TestItem> {
        return await add(BASE_PATH(modelId), testItem);
    }

    /**
     * update test item
     * @param modelId id of model to modify this test item
     * @param testItem test item
     * @returns modified test item
     */
    public static async update(modelId: number, testItem: TestItem): Promise<TestItem> {
        return await update(BASE_PATH(modelId), testItem);
    }

    /**
     * get which stations have used this test item
     * @param testItemId id of this test item
     * @returns eg. [ { sortIndex, station: { name } } ]
     */
    public static getWhereUsed(testItemId: number): Promise<StationTestItem[]> {
        return get(`/models/test-items/${testItemId}/where-used`);
    }

}
