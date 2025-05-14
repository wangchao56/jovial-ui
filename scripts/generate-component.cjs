#!/usr/bin/env node

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
// 模板目录路径
const TEMPLATE_DIR = path.resolve(__dirname, './template')

// 如果组件目录不存在，则创建
if (!fs.existsSync(COMPONENTS_DIR)) {
  fs.mkdirSync(COMPONENTS_DIR, { recursive: true })
}

let categoryValue = 'Components' // 默认分类

// 询问组件分类
rl.question('请输入组件的分类 (默认为 "Components"): ', (categoryAnswer) => {
  // 设置分类
  categoryValue = categoryAnswer.trim() || 'Components'

  // 然后询问组件名称
  rl.question('请输入组件名称 (例如: button 将生成 jv-button): ', (answer) => {
    // 标准化组件名称
    const name = answer.trim().toLowerCase()
    if (!name) {
      console.error('组件名称不能为空!')
      rl.close()
      return
    }
    // 例子：
    // jv-button
    const kebabCaseName = `jv-${name}`
    // JvButton
    const pascalCaseName = `Jv${name.charAt(0).toUpperCase() + name.slice(1)}`
    const componentDir = path.join(COMPONENTS_DIR, kebabCaseName)
    const upperCaseName = pascalCaseName.toUpperCase()

    // 创建组件主目录
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true })
    }

    // 创建的后文件路径集合
    const createdfilePaths = []

    // template下的目录名称
    const templateDirs = fs.readdirSync(TEMPLATE_DIR)

    for (const dir of templateDirs) {
      // 如果是文件则直接创建
      if (fs.statSync(path.join(TEMPLATE_DIR, dir)).isFile()) {
        const filePath = path.join(componentDir, dir.replace('.txt', ''))
        const content = fs.readFileSync(path.join(TEMPLATE_DIR, dir), 'utf-8')
        const newContent = processTemplate(content)
        fs.writeFileSync(filePath, newContent)
        createdfilePaths.push(filePath)
        continue
      }

      const dirPath = path.join(TEMPLATE_DIR, dir)
      const files = fs.readdirSync(dirPath)
      // 在组件目录下创建目录
      const newDirPath = path.join(componentDir, dir)
      if (!fs.existsSync(newDirPath)) {
        fs.mkdirSync(newDirPath, { recursive: true })
      }

      files.forEach((file) => {
        const filePath = path.join(dirPath, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const newContent = processTemplate(content)
        const newFilePath = path.join(newDirPath, file.replace('[name]', pascalCaseName).replace('.txt', ''))
        fs.writeFileSync(newFilePath, newContent)
        createdfilePaths.push(newFilePath)
      })
    }

    // 处理模板替换的函数
    function processTemplate(content) {
      return content
        .replace(/\{\{name\}\}/g, name)
        .replace(/\{\{name:capitalize\}\}/g, pascalCaseName)
        .replace(/\{\{name:upper\}\}/g, upperCaseName)
        .replace(/\{\{component:category\}\}/g, categoryValue)
    }

    console.log(`✅ 组件 ${pascalCaseName} 创建成功!`)
    console.log(`📁 组件路径: ${componentDir}`)
    console.log('📄 已创建以下文件:')
    createdfilePaths.forEach((file) => {
      console.log(`   - ${file}`)
    })
    console.log('\n组件使用示例:')
    console.log(`<${pascalCaseName} />`)
    // 更新全局组件导出文件 (可选)
    updateComponentsExport(pascalCaseName, kebabCaseName)

    rl.close()
  })
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
          }${exportStatement
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
