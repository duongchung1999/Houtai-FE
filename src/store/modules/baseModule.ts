import { MutationAction, VuexModule } from 'vuex-module-decorators'

export class BaseModule extends VuexModule {
    /**
   * set model state
   * @param stateFragment a object like this module state, include you want to update keys and values
   *
   * if key not in state, throw error (ERR_MUTATE_PARAMS_NOT_IN_PAYLOAD)
   * @returns
   */
    @MutationAction
  public async setState(stateFragment: object) {
    return stateFragment
  }
}
