import { TestItemAPI } from '@/api/testItemAPI'
import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '../index'
import { removeEle, updateEle } from '@/utils/index'
import { TestItem } from '@/entity/testItem'
import { BaseModule } from './baseModule'

@Module({ name: 'testItem', store, dynamic: true, namespaced: true })
export default class TestItemModule extends BaseModule {
    /** current selected test item */
    testItem: TestItem = new TestItem();
    testItemList: TestItem[] = new Array<TestItem>();

    @Mutation
    public async setList(list: TestItem[]) {
      this.testItemList = list
    }

    /**
     * fetch a list of test item owned by a model and set this.testItem
     * @param modelUk [number]:a id of the model that has this test item | [string]: a name of the model that has this test item
     * @param filte paging filter condition
     * @returns test items
     */
    @MutationAction
    public async getList(modelUk: number | string) {
      const testItemList = await TestItemAPI.getList(modelUk)
      testItemList.sort((a, b) => a.name > b.name ? 1 : -1)
      return { testItemList }
      // stationId: number = 0, keyWord: string = null
    }

    /**
  * search test items
  * @param modelUk [number]:a id of the model that has this test item | [string]: a name of the model that has this test item
  * @param stationId
  * @param keyWord
  * @returns test items
  */
    @Action
    public async search({ modelUk, stationId, keyWord }: { modelUk: string | number, stationId?: number, keyWord?: string }) {
      const testItemList = await TestItemAPI.getList(modelUk, stationId, keyWord)
      testItemList.sort((a, b) => a.name > b.name ? 1 : -1)
      // return { testItemList };
      return testItemList
    }

    /**
     * delete test item and remove relevant test item from this.testItemList
     * @param modelId id of the model that has this test item
     * @param testItem to delete test item
     */
    @Action
    public async del({ modelId, testItem }: { modelId: number, testItem: TestItem }) {
      await TestItemAPI.del(modelId, testItem)
      removeEle(this.testItemList, e => e.id == testItem.id)
      if (this.testItem.id === testItem.id) {
        this.setState({ testItem: new TestItem() })
      }
    }

    /**
     * modify test item and modify relevant test item from this.testItemList
     * @param modelId id of the model that to modify this test item
     * @param testItem to modify test item
     * @returns modified test item
     */
    @Action
    public async update({ modelId, testItem }: { modelId: number, testItem: TestItem }) {
      const modifiedTestItem = await TestItemAPI.update(modelId, testItem)
      updateEle(this.testItemList, modifiedTestItem, e => e.id == testItem.id)
      if (this.testItem.id === modifiedTestItem.id) {
        this.setState({ testItem: modifiedTestItem })
      }
    }

    /**
     * add test item and push this test item to this.testItemList
     * @param modelId a id of the model you want to add
     * @param testItem test item
     * @returns added test item
     */
    @Action
    public async add({ modelId, testItem }: { modelId: number, testItem: TestItem }) {
      const newTestItem = await TestItemAPI.add(modelId, testItem)
      this.testItemList.push(newTestItem)
      return newTestItem
    }
}
