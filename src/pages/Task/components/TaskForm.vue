<template>
  <VModal
    :show="visible"
    :title="isEdit ? '编辑任务' : '新增任务'"
    @update:show="visible = $event"
    @close="handleClose"
  >
    <n-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-placement="top"
      require-mark-placement="right-hanging"
    >
      <n-grid :cols="2" :x-gap="16">
        <n-gi>
          <n-form-item label="任务名称" path="name">
            <n-input v-model:value="formData.name" placeholder="输入任务名称" />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="算法场景" path="algorithm">
            <n-select
              v-model:value="formData.algorithm"
              :options="algorithmOptions"
              placeholder="请选择算法"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="关联设备" path="deviceIds">
            <n-select
              v-model:value="formData.deviceIds"
              multiple
              :options="deviceOptions"
              placeholder="选择关联设备"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="任务优先级" path="priority">
            <n-select
              v-model:value="formData.priority"
              :options="priorityOptions"
              placeholder="选择优先级"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="算法版本" path="version">
            <n-select
              v-model:value="formData.version"
              :options="versionOptions"
              placeholder="选择版本"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="算法厂家" path="vendor">
            <n-select
              v-model:value="formData.vendor"
              :options="vendorOptions"
              placeholder="选择厂家"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="检查周期" path="cron">
            <n-input v-model:value="formData.cron" placeholder="如: * * * * *" />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="抽帧频次" path="frameRate">
            <n-input-number v-model:value="formData.frameRate" :min="1" :max="30" />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="触发次数" path="triggerCount">
            <n-input-number v-model:value="formData.triggerCount" :min="1" :max="10" />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="告警级别" path="alertLevel">
            <n-select
              v-model:value="formData.alertLevel"
              :options="alertLevelOptions"
              placeholder="选择级别"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="2">
          <n-form-item label="预警阈值" path="threshold">
            <n-input
              v-model:value="formData.threshold"
              type="textarea"
              placeholder="输入预警阈值 (JSON格式)"
              :rows="2"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="处理人" path="handler">
            <n-select
              v-model:value="formData.handler"
              :options="handlerOptions"
              placeholder="选择处理人"
            />
          </n-form-item>
        </n-gi>
      </n-grid>
    </n-form>

    <template #footer>
      <n-button @click="handleClose">取消</n-button>
      <n-button type="primary" @click="handleSubmit">确定</n-button>
    </template>
  </VModal>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { NForm, NInput, NSelect, NInputNumber, NGrid, NGi, NButton } from 'naive-ui'
import VModal from '@/common/VModal/index.vue'

const visible = ref(false)
const currentId = ref<string | null>(null)
const isEdit = computed(() => !!currentId.value)

const formRef = ref()

const formData = reactive({
  name: '',
  algorithm: null as string | null,
  deviceIds: [] as string[],
  priority: null as string | null,
  version: null as string | null,
  vendor: null as string | null,
  cron: '',
  frameRate: 1,
  triggerCount: 1,
  alertLevel: null as string | null,
  threshold: '',
  handler: null as string | null
})

const rules = {
  name: { required: true, message: '请输入任务名称', trigger: 'blur' },
  algorithm: { required: true, type: 'number', message: '请选择算法', trigger: 'change' },
  deviceIds: { required: true, type: 'array', message: '请选择关联设备', trigger: 'change' },
  priority: { required: true, type: 'number', message: '请选择优先级', trigger: 'change' },
  cron: { required: true, message: '请输入检查周期', trigger: 'blur' },
  frameRate: { required: true, type: 'number', message: '请输入抽帧频次', trigger: 'blur' },
  triggerCount: { required: true, type: 'number', message: '请输入触发次数', trigger: 'blur' },
  alertLevel: { required: true, type: 'number', message: '请选择告警级别', trigger: 'change' },
  handler: { required: true, type: 'number', message: '请选择处理人', trigger: 'change' }
}

const algorithmOptions = [
  { label: '入侵检测', value: 'intrusion' },
  { label: '烟火识别', value: 'fire' },
  { label: '聚众识别', value: 'crowd' },
  { label: '打架斗殴', value: 'fighting' },
  { label: '人员摔倒', value: 'fall' }
]

const deviceOptions = [
  { label: '软件园C3栋-摄像头1', value: 'd1' },
  { label: '软件园C3栋-摄像头2', value: 'd2' },
  { label: '软件园C3栋-摄像头3', value: 'd3' },
  { label: '软件园C3栋-摄像头4', value: 'd4' }
]

const priorityOptions = [
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' }
]

const versionOptions = [
  { label: 'v1.0', value: 'v1.0' },
  { label: 'v1.1', value: 'v1.1' },
  { label: 'v2.0', value: 'v2.0' }
]

const vendorOptions = [
  { label: '海康威视', value: 'hikvision' },
  { label: '大华', value: 'dahua' },
  { label: '宇视', value: 'uniview' }
]

const alertLevelOptions = [
  { label: '紧急', value: 1 },
  { label: '重要', value: 2 },
  { label: '一般', value: 3 }
]

const handlerOptions = [
  { label: '张三', value: 1 },
  { label: '李四', value: 2 },
  { label: '王五', value: 3 }
]

const open = (id?: string) => {
  currentId.value = id || null
  visible.value = true
  if (id) {
    // 编辑模式 - 加载数据
    formData.name = '软件园入侵检测'
    formData.algorithm = 'intrusion'
    formData.deviceIds = ['d1', 'd2']
    formData.priority = 'high'
    formData.version = 'v2.0'
    formData.vendor = 'hikvision'
    formData.cron = '0 */5 * * * *'
    formData.frameRate = 5
    formData.triggerCount = 3
    formData.alertLevel = 1
    formData.threshold = '{"confidence": 0.8}'
    formData.handler = 1
  } else {
    // 新增模式 - 重置表单
    resetForm()
  }
}

const resetForm = () => {
  formData.name = ''
  formData.algorithm = null
  formData.deviceIds = []
  formData.priority = null
  formData.version = null
  formData.vendor = null
  formData.cron = ''
  formData.frameRate = 1
  formData.triggerCount = 1
  formData.alertLevel = null
  formData.threshold = ''
  formData.handler = null
}

const handleClose = () => {
  visible.value = false
  resetForm()
}

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      emit('submit', { id: currentId.value, data: { ...formData } })
      handleClose()
    }
  })
}

const emit = defineEmits<{
  (e: 'submit', payload: { id: string | null; data: typeof formData }): void
}>()

defineExpose({ open })
</script>
