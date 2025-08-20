<template>
  <div class="wangeditor-wrapper">
    <div class="editor-container">
      <Toolbar
        class="toolbar"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        class="editor"
        :style="{ height: height + 'px' }"
        v-model="localValueHtml"
        :defaultConfig="mergedEditorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
      />
    </div>
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { ref, shallowRef, onBeforeUnmount, watch, computed, defineProps, defineEmits, defineExpose } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'


// 定义props
const props = defineProps({
  // 绑定的HTML内容
  modelValue: {
    type: String,
    default: ''
  },
  // 占位符
  placeholder: {
    type: String,
    default: '请输入内容...'
  },
  // 编辑器高度
  height: {
    type: Number,
    default: 500
  },
  // 编辑器模式：default | simple
  mode: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'simple'].includes(value)
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否启用滚动
  scrollEnabled: {
    type: Boolean,
    default: true
  },
  // 工具栏配置
  toolbarConfig: {
    type: Object,
    default: () => ({})
  },
  // 编辑器配置
  editorConfig: {
    type: Object,
    default: () => ({})
  }
})

// 定义emits
const emit = defineEmits(['update:modelValue', 'change', 'created', 'destroyed'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef(null)

// 本地内容副本，避免直接修改props
const localValueHtml = ref(props.modelValue || '')

// 配置图片上传地址
const uploadApiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
// 合并编辑器配置
const mergedEditorConfig = computed(() => ({
  placeholder: props.placeholder,
  readOnly: props.disabled,
  height: `${props.height}px`, // 设置编辑器高度
  scroll: props.scrollEnabled, // 使用props控制是否启用滚动
  MENU_CONF: {
    uploadImage: {
      server: `${uploadApiBaseUrl}/upload/image`, // 图片上传接口
      fieldName: 'file', // 上传文件的字段名
      headers: {
        // 可以添加自定义请求头
      },
      maxFileSize: 5 * 1024 * 1024, // 最大5MB
      allowedFileTypes: ['image/*'],
      metaWithUrl: true, // 返回结果中包含图片URL
      onBeforeUpload(file) {
        // 上传前的校验
        return file
      },
      onSuccess(file, res) {
        // 上传成功回调 - 接口实际返回格式: {success: true, fileUrl: '图片地址'}
        if (res && res.success) {
          return res.fileUrl // 返回图片URL
        }
        return '' // 如果不成功返回空字符串
      },
      onFailed(file, res) {
        // 上传失败回调
        console.error('图片上传失败:', res)
      },
      onError(file, err, res) {
        // 上传错误回调
        console.error('图片上传错误:', err)
      }
    }
  },
  ...props.editorConfig
}))

// 监听外部modelValue变化
watch(
  () => props.modelValue,
  (newValue) => {
    // 避免死循环
    if (newValue !== localValueHtml.value && (!editorRef.value || editorRef.value.getHtml() !== newValue)) {
      localValueHtml.value = newValue || ''
    }
  },
  { immediate: true }
)

// 监听本地内容变化，通知父组件
watch(
  () => localValueHtml.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

// 监听disabled变化
watch(
  () => props.disabled,
  (newValue) => {
    if (editorRef.value) {
      editorRef.value.setReadOnly(newValue)
    }
  }
)

// 编辑器创建时的回调
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例
  emit('created', editor)
}

// 编辑器内容变化时的回调
const handleChange = (editor) => {
  const html = editor.getHtml()
  const text = editor.getText()
  emit('change', html, text, editor)
}

// 编辑器销毁时的回调
const handleDestroyed = () => {
  emit('destroyed')
}

// 组件销毁时，销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) {
    editor.destroy()
    editorRef.value = null
  }
})

// 暴露方法给父组件
defineExpose({
  // 获取编辑器实例
  getEditor: () => editorRef.value,

  // 获取编辑器内容
  getContent: () => {
    if (editorRef.value) {
      return editorRef.value.getHtml()
    }
    return localValueHtml.value
  },

  // 设置编辑器内容
  setContent: (html) => {
    localValueHtml.value = html || ''
    if (editorRef.value) {
      editorRef.value.setHtml(html || '')
    }
  },

  // 清空编辑器内容
  clearContent: () => {
    localValueHtml.value = ''
    if (editorRef.value) {
      editorRef.value.clear()
    }
  },

  // 聚焦编辑器
  focus: () => {
    if (editorRef.value) {
      editorRef.value.focus()
    }
  },

  // 失焦编辑器
  blur: () => {
    if (editorRef.value) {
      editorRef.value.blur()
    }
  }
})
</script>

<style scoped>

.wangeditor-wrapper {
  width: 100%;
  position: relative;
}

.editor-container {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.3s;
}

.editor-container:hover {
  border-color: #c0c4cc;
}

.toolbar {
  border-bottom: 1px solid #e4e7ed;
  padding: 4px 6px;
  background-color: #fafafa;
}

.editor {
  width: 100%;
  min-height: 300px;
  overflow-y: auto;
  background-color: #fff;
}

/* 自定义滚动条样式 */
.editor::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.editor::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.editor::-webkit-scrollbar-thumb {
  background: #c0c4cc;
  border-radius: 3px;
}

.editor::-webkit-scrollbar-thumb:hover {
  background: #909399;
}
</style>
