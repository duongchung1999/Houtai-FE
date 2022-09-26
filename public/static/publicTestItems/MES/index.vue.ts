import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "MES";

@Component({ name: dllname + 'PublicTestItems' })
export default class MESPublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods = [
        { name: 'Binding', label: '绑定条码' },
        { name: 'QueryKeyPart', label: '查询绑定信息判断与SN是否关联' },
        { name: 'QueryKeyPartInfo', label: '查询绑定信息并储存' },
        { name: 'GetBDFromMES', label: '获取BD号（根据工单）' },
        { name: 'QueryBD', label: '获取BD号（根据SN）' },
        { name: 'QueryBDNoBySN', label: '通过扫码框的SN获取BD号' },
        { name: 'CustomerSN', label: '通过流水码获取客户SN' },
        { name: 'IsBindSecurityCode', label: '金士顿T3用的过站接口' },
        { name: 'UploadKingStonSN', label: '金士顿T4用的过站接口' },
        { name: 'GetSN_BCCodeFromMES', label: '获取Poly的客户SN' },
    ]
}