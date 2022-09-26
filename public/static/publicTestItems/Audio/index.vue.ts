import { Component, Vue } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "Audio";

@Component({ name: dllname + 'PublicTestItems' })
export default class AudioPublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods = [
        { name: 'PlayTest', label: '播放音乐测试' },
        { name: 'RecordTest', label: '录音' },
        { name: 'SpkVolume', label: '喇叭音量调节' },
        { name: 'MicVolume', label: '麦克风音量调节' },
        { name: 'PlayMusic', label: '播放音乐' },
        { name: 'Sidetone', label: 'Sidetone' },
        { name: 'StopMusic', label: '停止播放音乐' },
        { name: 'A2DP', label: 'A2DP' },
        { name: 'HFP', label: 'HFP' }
    ]

    columns: Column[] = [
        { key: "装置名称", label: "装置名称" },
        { key: "选择音频", label: "播放音频" },
        { key: "显示内容信息", label: "提示内容" },
        { key: "音量值", label: "音量值" },
        { key: "音频文件名字", label: "音频文件名字" },
    ];

    form = {
        装置名称: '',
        选择音频: '',
        显示内容信息: '',
        音量值: 0,
        音频文件名字: '',
    }

    showFieldMap = {
        PlayTest: ['装置名称', '选择音频', '显示内容信息'],
        RecordTest: ['装置名称', '显示内容信息'],
        SpkVolume: ['装置名称', '音量值'],
        MicVolume: ['装置名称', '音量值'],
        PlayMusic: ['装置名称', '音频文件名字'],
        Sidetone: ['显示内容信息'],
        StopMusic: [],
        A2DP: [],
        HFP: [],
    }

    /** 选择的音频文件 */
    currentMusic: string = '';

    /** 可选择的音频文件 */
    musics = [
        '加州旅馆音乐（左右耳）',
        '客户敲门声',
        '1HZ音源'
    ]

    onSelectMusic(music: string) {
        let no = this.musics.findIndex(e => e == music);
        this.form.选择音频 = (no == -1 ? '' : no) + '';
    }
}