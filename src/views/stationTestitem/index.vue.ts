import { Model } from "@/entity/model";
import { Station } from "@/entity/station";
import { StationTestItem } from "@/entity/stationTestItem";
import { TestItem } from "@/entity/testItem";
import { modelModule, stationModule, stationTestItemModule, testItemModule, userModule } from '@/store/modules';
import { objectIsEqual } from "@/utils/index";
import { ElUploadInternalFileDetail } from "element-ui/types/upload";
import FileSaver from "file-saver";
import Vue from "vue";
import { Component, Ref, Watch } from 'vue-property-decorator';
import Draggable from 'vuedraggable';

enum DragingDirectionOptions {
    Upward,
    Middle,
    Downward,
}

Component.registerHooks(['beforeRouteLeave'])

@Component({ name: 'stationTestitem', components: { Draggable } })
export default class StationTestItemPage extends Vue {
    isLoading = false;
    searchTestItemKw: string = ''
    searchStationTestItemKw: string = ''

    /** extract TestItem from this.stationTestItemList to form a new array */
    parsedStationTestItemList: TestItem[] = [];

    /** last test items of station, this property is used to check wherther the save-btn can be clicked */
    lastStationTestItem: TestItem[] = [];

    /** timer id of set scrollbar scrollTop, runing when the test item is dragging */
    timerId = null;

    /** used to determine the draging direction */
    dragingDirection = DragingDirectionOptions.Middle;

    @Ref("stationTestItemDragList") stationTestItemDragList: any;
    @Ref("stationTestItemScrollbar") stationTestItemScrollbar: any;

    /** wherther the save-btn can be clicked */
    get isChanged() {
        if (!this.station?.id) return false;
        let lst = this.lastStationTestItem;
        let pst = this.parsedStationTestItemList;
        if (lst.length != pst.length) {
            return true;
        }
        for (const i in lst) {
            if (lst[i].cmd != pst[i].cmd) {
                return true;
            }
        }
        return false;
    }

    /** wherther the list item of test items can be dragged */
    get canPull() {
        return this.station?.id ? 'clone' : false;
    }

    get model(): Model { return modelModule.model; }
    set model(v: Model) {
        this.$nextTick(async () => {
            v = new Model(v)
            await modelModule.setState({ model: v })
            // stationModule.stationList.length = 0;

            await stationModule.setState({ station: {}, stationList: [] })
            // await stationModule.setState({ stationList: [] })

            if (!v?.id) return;
            this.searchTestItemKw = '';
            this.searchStationTestItemKw = '';
            await testItemModule.getList(this.model.id);

            await stationModule.getList(this.model.id)
            if (!this.station?.id && this.stationList.length) {
                this.station = new Station(this.stationList[0])
            } else {
                // 如果一个机型没有站别，清空测试项目列表
                this.station = new Station();
            }

        })

    };

    get station(): Station { return stationModule.station };
    set station(v: Station) {
        this.$nextTick(async () => {
            await stationModule.setStation(v);

            this.searchStationTestItemKw = '';
            // must clear before fetch list
            await stationTestItemModule.setList([])

            if (this.model?.id && this.station?.id) {
                await stationTestItemModule.getList({ mdoelUk: this.model.id, stationUk: this.station.id });
                this.lastStationTestItem = Array.from(this.stationTestItemDragList.list);
            }
        })

    };

    get modelList() { return modelModule.modelList; }
    get stationList() { return stationModule.stationList; }

    get testItemList() { return testItemModule.testItemList; }
    get stationTestItemList() { return stationTestItemModule.stationTestItemList; }

    get fliteredTestItem() {
        let kw = this.searchTestItemKw.toLowerCase();
        if (!kw) {
            return this.testItemList;
        }
        let result = [];
        this.testItemList.forEach(e => {
            if (e.name.toLowerCase().includes(kw) || e.cmd.toLowerCase().includes(kw)) {
                result.push(e)
            }
        })
        return result;
    }

    get fliteredStationTestItem() {
        let kw = this.searchStationTestItemKw.toLowerCase();
        let result = [];

        if (!kw) {
            result = this.parsedStationTestItemList;
        } else {
            this.parsedStationTestItemList.forEach(e => {
                if (e.name.toLowerCase().includes(kw) || e.cmd.toLowerCase().includes(kw)) {
                    result.push(e)
                }
            })
        }

        var reallyIndex = 1;
        result.forEach(e => {
            if (e.isHidden) {
                e.reallyIndex = 0;
            } else {
                e.reallyIndex = reallyIndex++;
            }
        })
        return result;
    }

    async onRemoveTestItem(index: number, item: TestItem) {
        this.stationTestItemDragList.list.splice(index, 1);
    }

    async save() {
        this.isLoading = true;
        let requestData: StationTestItem[] = [];
        let stationId = this.station.id;
        this.parsedStationTestItemList.forEach((item, sortIndex) => {
            requestData.push({
                stationId,
                testItemId: item.id,
                sortIndex
            })
        })
        try {
            await stationTestItemModule.distribute({ stationId, newItems: requestData })
            this.$message.success('保存成功');
            this.lastStationTestItem = Array.from(this.stationTestItemDragList.list);
        } catch (error) {
            console.info(error)
        } finally {
            this.isLoading = false;
        }
    }

    getTestItemName(testItem: TestItem) {
        return testItem.name.replace("+", "").replace("-", "");
    }

    setDragingDirection(e: MouseEvent, scrollbarName: string) {
        let el: HTMLElement = this.stationTestItemScrollbar.$el
        // height offset of page top
        let pageTopOffset = 170;
        // height of the mouse pointer from the Scrollbar top
        let moveHeight = e.clientY - pageTopOffset;

        let scrollbarHeight = el.clientHeight;

        // 设置滚动方向
        // top 15 precent is upward direction, bottom 15 precent is downward direction and the others is middle direction
        if (moveHeight < scrollbarHeight * 0.15) {
            this.dragingDirection = DragingDirectionOptions.Upward;
        } else if (moveHeight > scrollbarHeight * 0.85) {
            this.dragingDirection = DragingDirectionOptions.Downward;
        } else {
            this.dragingDirection = DragingDirectionOptions.Middle;
        }
    }

    setScollbarValue() {
        switch (this.dragingDirection) {
            case DragingDirectionOptions.Middle: break;
            case DragingDirectionOptions.Upward:
                this.stationTestItemScrollbar.wrap.scrollTop -= 4;
                break;
            case DragingDirectionOptions.Downward:
                this.stationTestItemScrollbar.wrap.scrollTop += 4;
            default:
                break;
        }
        this.timerId = requestAnimationFrame(this.setScollbarValue);
    }

    /** request animationFrame */
    onTestItemDragListChoose() {
        this.searchStationTestItemKw = ''
        this.$nextTick(() => {
            this.dragingDirection = DragingDirectionOptions.Middle;
            this.timerId = requestAnimationFrame(this.setScollbarValue);
        })
    }

    /** cancal animationFrame */
    onTestItemDragListUnchoose() {
        if (this.timerId) cancelAnimationFrame(this.timerId)
    }

    fileList: File[] = []

    async importTestItemFromTextFile(fileDetail: ElUploadInternalFileDetail) {
        let fr = new FileReader();
        fr.onload = () => {
            if (fr.result) this.parseTxt2Testitem(fr.result, fileDetail);
        };
        fr.readAsText(fileDetail.raw);
    }

    parseTxt2Testitem(txt: string | ArrayBuffer, fileDetail: ElUploadInternalFileDetail) {
        let txtFileStationTestItem: StationTestItem[] = [];
        let lines = txt.toString().trim().split("\r");

        lines.forEach((line, i) => {
            line = line?.trim();
            if (!line) return;

            let testItemProps = line.split(",");

            let tempTestItem: TestItem = {
                modelId: this.model.id,
                name: testItemProps[1],
                unit: testItemProps[2],
                lowerValue: testItemProps[3],
                upperValue: testItemProps[4],
                no: parseInt(testItemProps[5]),
                cmd: testItemProps[6],
            }

            tempTestItem.isHidden = tempTestItem.name.includes('-')
            tempTestItem.isAlwaysRun = tempTestItem.name.includes('+')
            let tempStationTestItem: StationTestItem = {
                stationId: this.station.id,
                testItem: tempTestItem,
                sortIndex: i
            }

            txtFileStationTestItem.push(tempStationTestItem);
        });

        this.$confirm(`此操作会清空之前分配的测试项目，相同名称的测试项目将会被覆盖`, { type: "warning", })
            .then(async (_) => {
                // 查找/添加 站别
                let stationName = fileDetail.name.replace(".txt", "");
                let station = this.stationList.find((e) => e.name == stationName);

                if (station) {
                    await stationModule.setStation(station);
                } else {
                    let result = await stationModule.add({
                        modelId: this.model.id,
                        station: new Station({ name: stationName })
                    });
                    await stationModule.setStation(result);
                }

                // clear all test item before redistributing
                await stationTestItemModule.setList([])

                for (const fileTestItem of txtFileStationTestItem) {
                    let oldTestItem = this.testItemList.find(
                        (e) => this.getTestItemName(e) == this.getTestItemName(fileTestItem.testItem)
                    );
                    // 更新旧的测试项目
                    if (oldTestItem) {
                        fileTestItem.testItemId = oldTestItem.id;
                        fileTestItem.testItem.id = oldTestItem.id;
                        if (!objectIsEqual(oldTestItem, fileTestItem.testItem)) {
                            await testItemModule.update({ modelId: this.model.id, testItem: new TestItem(fileTestItem.testItem) })
                        }
                    } else {
                        // 添加分配测试项目
                        oldTestItem = await testItemModule.add({ modelId: this.model.id, testItem: fileTestItem.testItem })
                        fileTestItem.testItemId = oldTestItem.id;
                        fileTestItem.testItem = oldTestItem;
                    }

                    this.stationTestItemList.push(fileTestItem)
                }
                this.$message.success("导入成功，点击保存后应用更改");
                this.lastStationTestItem = []
            })
            .catch((e) => console.info(e));
    }

    async exportTextItem2File() {
        let txt = [];
        let hiddenItemCount = 0;
        this.parsedStationTestItemList.forEach((t, i) => {
            let index = (i + 1 - hiddenItemCount);
            if (t.name.includes('-')) {
                hiddenItemCount++;
                index = 0;
            }
      
            let line = `${index},${t.name},${t.unit},${t.lowerValue},${t.upperValue},${t.no},${t.cmd}\r\n`;
            txt.push(line);
        })
        var blob = new Blob(txt, { type: "text/plain;charset=utf-8" });

        FileSaver.saveAs(blob, `${this.station.name}.txt`);
    }

    @Watch('stationTestItemList', { immediate: true })
    parseStationTestItemList(items: StationTestItem[]) {
        console.log('parser')
        let result: TestItem[] = [];
        let copyItems = Array.from(items);

        copyItems.sort((a, b) => {
            return a.sortIndex > b.sortIndex ? 1 : -1;
        })
        for (const item of copyItems) {
            result.push(item.testItem);
        }
        this.parsedStationTestItemList = result;
    }

    public async beforeRouteLeave(to, form, next) {
        if (!this.isChanged) {
            next();
            return;
        }
        await this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
            confirmButtonText: '保存',
            cancelButtonText: '放弃修改'
        }).then(async () => {
            await this.save();
        }).catch(async () => {
            this.$message.warning('放弃修改');
        });
        next();
    }

    async mounted() {
        await modelModule.getList(userModule.nowUser.id);

        if (!this.model?.id) {
            this.model = this.modelList[0]
            return;
        }
        else {
            this.model = this.model;
        }
    }
};