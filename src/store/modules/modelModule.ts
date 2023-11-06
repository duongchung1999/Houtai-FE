import { ModelAPI } from '@/api/modelAPI'
import { Model } from '@/entity/model'
import { removeEle, updateEle } from '@/utils/index'
import { Action, Module, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '../index'

@Module({ name: 'model', store, dynamic: true, namespaced: true })
export default class ModelModel extends VuexModule {
  /** current selected model */
  model: Model = new Model()
  modelList: Model[] = new Array<Model>()

  /**
   * fetch a model
   * @param modelUk model name: string | model id: string
   * @returns \{ model }
   */
  @MutationAction
  public async get(modelUk: string | number) {
    const model = await ModelAPI.get(modelUk)
    return { model }
  }

  /**
   * fetch a list that models assigned to this user
   * @returns \{ modelList }
   */
  @MutationAction
  public async getList(userId: number) {
    const modelList = await ModelAPI.getList(userId)
    modelList.sort((a, b) => (a.name > b.name ? 1 : -1))
    return { modelList }
  }

  /**
   * delete model, remove corresponding entity from the model list
   * @param model model id or model entity of carrying id
   */
  @Action
  public async del(model: Model | number) {
    model = model instanceof Model ? model : new Model({ id: model })
    const modelId = model.id
    await ModelAPI.del(model)
    removeEle(this.modelList, e => e.id == modelId)
    this.setState({ model: new Model() })
  }

  /**
   * add model, push this model to the model list
   * @param model
   * @returns new model
   */
  @Action
  public async add(model: Model) {
    const newModel = await ModelAPI.add(model)
    this.modelList.push(newModel)

    return newModel
  }

  /**
   * modify model, modify corresponding entity from the model list
   * @param model
   * @returns modified model entity
   */
  @Action
  public async update(model: Model) {
    const modifiedModel = await ModelAPI.update(model)
    updateEle(this.modelList, modifiedModel, e => e.id == modifiedModel.id)
    if (this.model.id == modifiedModel.id) {
      this.setState({ model: modifiedModel })
    }
  }

  /** 修改机型名称 */
  @Action
  public async updateModelName(model: Model) {
    const modificationData = {
      newValue: model.name,
      oldValue: ''
    }

    const modifiedModel = await ModelAPI.update(model)
    updateEle(this.modelList, modifiedModel, e => e.id === modifiedModel.id)
    if (this.model.id === modifiedModel.id) {
      this.setState({ model: modifiedModel })
    }

    modificationData.oldValue = model.name
  }

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

  @MutationAction
  public async setModel(model: Model) {
    return { model }
  }
}
