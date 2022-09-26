import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators';
import store from '../index';
import { BaseModule } from './baseModule';
import { StationTestItem } from '@/entity/stationTestItem';
import { StationTestItemAPI } from '@/api/stationTestItemAPI';
import { TestItem } from '@/entity/testItem';

@Module({ name: 'stationTestItem', store, dynamic: true, namespaced: true })
export default class StationTestItemModule extends BaseModule {

    public stationTestItemList: StationTestItem[] = new Array<StationTestItem>();

    /**
     * fetch a list of test items for the station
     * @param modelUk [number]:a id of the model that has this station | [string]: a name of the model that has this station
     * @param stationUk [number]:a id of the station that has this test items | [string]: a name of the station that has this test items
     * @returns station list
     */
    @MutationAction
    public async getList({ mdoelUk, stationUk }: { mdoelUk: number | string, stationUk: number | string }) {
        let stationTestItemList = await StationTestItemAPI.getList(mdoelUk, stationUk);
        stationTestItemList.sort((a, b) => a.sortIndex > b.sortIndex ? 1 : -1)
        return { stationTestItemList };
    }

    /**
     * remove old test items and distribute new test items
     * @param stationId id of station that has the test items
     * @param newItems list of test item of to be redistributed
     * @returns a list of test item on this station
     */
    @MutationAction
    public async distribute({ stationId, newItems }: { stationId: number, newItems: StationTestItem[] }) {
        let stationTestItemList = await StationTestItemAPI.distribute(stationId, newItems);
        stationTestItemList.sort((a, b) => a.sortIndex > b.sortIndex ? 1 : -1)
        return { stationTestItemList };
    }

    /**
    * delete the all test items of the station
    * @param stationId stationId of the station
    * @returns 
    */
    @MutationAction
    public async delAll(stationId: number) {
        await StationTestItemAPI.delAll(stationId);
        return { stationTestItemList: new Array<StationTestItem>() }
    }

    @MutationAction
    public async setList(stationTestItemList) {
        return { stationTestItemList }
    }
}
