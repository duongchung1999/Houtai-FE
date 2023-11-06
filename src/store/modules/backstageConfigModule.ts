import { BackstageConfigAPI } from '@/api/backstageConfigAPI'
import { BackstageConfig } from '@/entity/bakcstageConfig'
import { Module, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '../index'

@Module({ name: 'backstageConfig', store, dynamic: true, namespaced: true })
export default class BackstageConfigModule extends VuexModule {
    configItem = new BackstageConfig();
    keyList = new Array<BackstageConfig>();

    @MutationAction
    public async get(key: string) {
      const configItem = await BackstageConfigAPI.get(key)
      return { configItem }
    }

    @MutationAction
    public async getKeyList() {
      const keyList = await BackstageConfigAPI.getKeyList()
      return { keyList }
    }

    @MutationAction
    public async update(config: BackstageConfig) {
      const configItem = await BackstageConfigAPI.update(config)
      return { configItem }
    }

    /**
     * set model state
     * @param stateFragment a object like this module state object, key is you want to update state ojbect key name and value is you want to update new value. if key not in state, throw error (ERR_MUTATE_PARAMS_NOT_IN_PAYLOAD)
     * @returns
     */
    @MutationAction
    public async setState(stateFragment: object) {
      return stateFragment
    }
}
