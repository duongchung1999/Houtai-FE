
import Vue from 'vue'
import { Component, Model, Prop, PropSync, Watch } from 'vue-property-decorator'

@Component({ name: 'FormItemGroup' })
export default class FormItemGroupComponent extends Vue {
    @Model() public value: string;

    @Prop() public desc: string
}
