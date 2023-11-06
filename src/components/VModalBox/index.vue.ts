import { deepClone } from '@/utils'
import { Form } from 'element-ui'
import Vue from 'vue'
import { Component, Emit, Model, Prop, PropSync, Ref, Watch } from 'vue-property-decorator'

/**
 * form item of MadalBox
 */
export interface FormColumn {
    /**
     * prop of form item
     */
    key: string
    /**
     * label of form item
     */
    label: string
    /**
     * rules of form item
     */
    rules: object[]
}

/**
 * a simple that modal form component, used to add and edit opearations to same component(this component)
 */
@Component({ name: 'VModalBox' })
export default class VModalBoxComponent extends Vue {
    formDataCopy: object = {};

    /**
     * form data of ELForm
     */
    @Model() formData: object;

    /** if true, use add mode, ontherwise use edit(update) mode, default is false */
    @Prop({ type: Boolean, default: false }) addMode: boolean;

    /** columns of ElForm */
    @Prop() columns: FormColumn[];

    /** validation rules of ELForm */
    @Prop() rules: object;

    /** wheter the ModalBox(ElDialog) visible */
    @PropSync('visible') syncedVisible: boolean;

    /** Title of ModalBox(ElDialog) */
    @Prop() title: string

    /** Width of ModalBox(ElDialog) */
    @Prop({ type: String }) width: string

    /** width of ELForm label. */
    @Prop({ type: String, default: '80px' }) labelWidth: string;

    @Ref('form') elForm: Form;

    /**
     * invoked before the ModalBox(ElDialog) is hidden
     */
    @Emit()
    public beforeClose() { }

    /**
     * invoked after clicked the confirm button
     */
    public submit() {
      this.elForm.validate(v => {
        if (v) {
          // 先深拷贝一边，因为关闭后 formDataCopy 会被清空
          const sendData = deepClone(this.formDataCopy)
          this.$emit('submit', sendData)
          if (this.addMode) {
            this.$emit('add', sendData)
          } else {
            this.$emit('edit', sendData)
          }
        }
      })
    }

    @Watch('syncedVisible')
    visibleWatchHandler(v: boolean) {
      if (!v) {
        this.elForm.clearValidate()
        for (const key in this.formDataCopy) {
          this.formDataCopy[key] = null
        }
      } else {
        this.formDataCopy = deepClone(this.formData)
      }
    }
}
