#!/usr/bin/env node
// scripts/generate-component.js

const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')
const readline = require('node:readline')

// 创建命令行交互界面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// 组件目录基础路径
const COMPONENTS_DIR = path.resolve(__dirname, '../src/components')

// 如果组件目录不存在，则创建
if (!fs.existsSync(COMPONENTS_DIR)) {
  fs.mkdirSync(COMPONENTS_DIR, { recursive: true })
}

// 询问组件名称
rl.question('请输入组件名称 (例如: button 将生成 jv-button): ', (answer) => {
  // 标准化组件名称
  const name = answer.trim().toLowerCase()
  if (!name) {
    console.error('组件名称不能为空!')
    rl.close()
    return
  }

  const kebabCaseName = `jv-${name}`
  const pascalCaseName = `Jv${name.charAt(0).toUpperCase() + name.slice(1)}`
  const componentDir = path.join(COMPONENTS_DIR, kebabCaseName)
  const srcDir = path.join(componentDir, 'src')

  // 创建组件目录结构
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true })
  }

  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true })
  }

  // 创建组件 Vue 文件
  const vueFilePath = path.join(srcDir, `${pascalCaseName}.vue`)
  const vueTemplate = `<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { ${pascalCaseName.toUpperCase()}_NAME, type ${pascalCaseName}Props } from './types'

defineOptions({ name: ${pascalCaseName.toUpperCase()}_NAME, inheritAttrs: false })

const props = withDefaults(defineProps<${pascalCaseName}Props>(), {
  // 默认属性值
})

// 解构 props 为响应式引用
const { } = toRefs(props)

defineEmits<{
  // 定义事件
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <div :class="['${kebabCaseName}']">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.${kebabCaseName} {
  // 组件样式
}
</style>
`

  // 创建类型文件
  const typesFilePath = path.join(srcDir, 'types.ts')
  const typesTemplate = `import { createNamespace } from '@/utils'

export const ${pascalCaseName.toUpperCase()}_NAME = '${pascalCaseName}'
export const bem = createNamespace(${pascalCaseName.toUpperCase()}_NAME)

export interface ${pascalCaseName}Props {
  // 定义组件属性
}
`

  // 创建索引文件
  const indexFilePath = path.join(componentDir, 'index.ts')
  const indexTemplate = `import _${pascalCaseName} from './src/${pascalCaseName}.vue'
import { withInstall } from '@/utils'

export const Jv${name.charAt(0).toUpperCase() + name.slice(1)} = withInstall(_${pascalCaseName})
export default Jv${name.charAt(0).toUpperCase() + name.slice(1)}

export * from './src/types'

declare module 'vue' {
  export interface GlobalComponents {
    Jv${name.charAt(0).toUpperCase() + name.slice(1)}: typeof Jv${name.charAt(0).toUpperCase() + name.slice(1)}
  }
}
`

  // 写入文件
  fs.writeFileSync(vueFilePath, vueTemplate)
  fs.writeFileSync(typesFilePath, typesTemplate)
  fs.writeFileSync(indexFilePath, indexTemplate)

  console.log(`✅ 组件 ${pascalCaseName} 创建成功!`)
  console.log(`📁 组件路径: ${componentDir}`)
  console.log('📄 已创建以下文件:')
  console.log(`   - ${vueFilePath}`)
  console.log(`   - ${typesFilePath}`)
  console.log(`   - ${indexFilePath}`)
  console.log('\n组件使用示例:')
  console.log(`<${pascalCaseName} />`)

  // 更新全局组件导出文件 (可选)
  updateComponentsExport(pascalCaseName, kebabCaseName)

  rl.close()
})

// 更新组件全局导出文件
function updateComponentsExport(pascalCaseName, kebabCaseName) {
  const componentsIndexPath = path.join(COMPONENTS_DIR, 'components.ts')

  try {
    let content = ''
    if (fs.existsSync(componentsIndexPath)) {
      content = fs.readFileSync(componentsIndexPath, 'utf-8')
    }

    // 添加组件导入和导出
    const importStatement = `import ${pascalCaseName} from './${kebabCaseName}'\n`
    const exportStatement = `  ${pascalCaseName},\n`

    if (!content.includes(importStatement)) {
      // 查找最后一个导入语句
      const lastImportIndex = content.lastIndexOf('import')
      const lastImportEndIndex = content.indexOf('\n', lastImportIndex) + 1

      // 如果找到导入语句，在最后一个导入语句后添加新导入
      if (lastImportIndex !== -1) {
        content
          = content.slice(0, lastImportEndIndex)
            + importStatement
            + content.slice(lastImportEndIndex)
      }
      else {
        content = importStatement + content
      }

      // 查找导出对象
      const exportStartIndex = content.indexOf('export {')
      if (exportStartIndex !== -1) {
        const exportEndIndex = content.indexOf('}', exportStartIndex)
        // 在导出对象的末尾添加新组件
        content
          = `${content.slice(0, exportEndIndex)
          },${
            exportStatement
          }${content.slice(exportEndIndex)}`
      }
      else {
        // 如果没有找到导出对象，创建一个
        content += `\nexport {\n${exportStatement}}\n`
      }

      fs.writeFileSync(componentsIndexPath, content)
      console.log(`✅ 已更新组件全局导出文件: ${componentsIndexPath}`)
    }
  }
  catch (error) {
    console.error('更新全局组件导出文件时出错:', error)
  }
}
