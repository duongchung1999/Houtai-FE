import { StationAPI } from '@/api/stationAPI'
import { Station } from '@/entity/station'
import { removeEle, updateEle } from '@/utils/index'
import { Action, Module, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '../index'

@Module({ name: 'station', store, dynamic: true, namespaced: true })
export default class StationModule extends VuexModule {
    /** current selected station */
    public station: Station = new Station();
    public stationList: Station[] = new Array<Station>();

    /**
  * fetch station and set this.station
  * @param modelSlug [string]: a name of the model that owned this station | [number]: a id of the model that owned this station
  * @param stationSlug string: station name | number: station id
  * @returns
  */
    @MutationAction
    public async get(modelSlug: string | number, stationSlug: string | number) {
      const station = await StationAPI.get(modelSlug, stationSlug)
      return { station }
    }

    /**
     * fetch a list of stations owned by a model and set this.stations
     * @param filte paging filter condition
     * @returns station list
     */
    @MutationAction
    public async getList(modelSlug: number | string) {
      const stationList = await StationAPI.getList(modelSlug)
      stationList.sort((a, b) => a.name > b.name ? 1 : -1)
      return { stationList }
    }

    /**
     * delete an staion and delete relevant station from this.stationList
     * @param modelId a id of the model that owned this station
     * @param station [Station]: a station entity that carrying a station id | [number]: station id
     */
    @Action
    public async del({ modelId, station }: { modelId: number, station: Station | number }) {
      await StationAPI.del(modelId, station)
      const stationId = station instanceof Station ? station.id : station
      removeEle(this.stationList, e => e.id == stationId)
      if (this.station.id === stationId) {
        await this.setStation(new Station())
      }
    }

    /**
     * modify station and modify relevant station from this.stationList
     * @param modelId a id of the model that owned this station
     * @param station station entity
     * @returns modified station
     */
    @Action
    public async update({ modelId, station }: { modelId: number, station: Station }) {
      const modifyedStation = await StationAPI.update(modelId, station)
      updateEle(this.stationList, modifyedStation, e => e.id == station.id)
      if (this.station.id === modifyedStation.id) {
        this.setState({ station: modifyedStation })
      }
    }

    /**
     * add an station and push this station to this.stationList
     * @param modelId a id of the model you want to add
     * @param station station
     * @returns added station
     */
    @Action
    public async add({ modelId, station }: { modelId: number, station: Station }) {
      const newStation = await StationAPI.add(modelId, station)
      this.stationList.push(newStation)
      return newStation
    }

    /**
    * set model state
    * @param stateFragment a object like this module state, include you want to update keys and values
    *
    * if key not in state, throw error (ERR_MUTATE_PARAMS_NOT_IN_PAYLOAD)
    * @returns
    */
    @MutationAction
    public async setState(stateFragment: any) {
      return stateFragment
    }

    /**
     * for unknown reasons, if setState({station: xxx}) is invoked, then ERR_MUTATE_PARAMS_NOT_IN_PAYLOAD error will be thrown.
     * @param station set station
     * @returns
     */
    @MutationAction
    public async setStation(station: Station) {
      return { station }
    }
}
