
import UserModule from './modules/userModule';
import ModelModule from './modules/modelModule';
import StationModule from './modules/stationModule';
import TestItemModule from './modules/testItemModule';
import StationTestItemModule from './modules/stationTestItemModule';
import BackstageConfigModule from './modules/backstageConfigModule';
 
import { getModule } from 'vuex-module-decorators'

export const userModule = getModule(UserModule);
export const modelModule = getModule(ModelModule);
export const stationModule = getModule(StationModule);
export const testItemModule = getModule(TestItemModule);
export const stationTestItemModule = getModule(StationTestItemModule);
export const backstageConfigModule = getModule(BackstageConfigModule);