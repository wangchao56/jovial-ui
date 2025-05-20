// 复制typings目录中的类型定义到dist-lib/typings/global.d.ts

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url)
// 获取当前文件所在的目录
const __dirname = path.dirname(__filename)
// 项目根目录
const rootDir = path.resolve(__dirname, '..')
// 源文件目录
const srcTypingsDir = path.resolve(rootDir, 'src/typings')
// 目标文件目录
const distTypingsDir = path.resolve(rootDir, 'dist-lib/typings')

// 合并所有类型文件
function mergeTypeFiles() {
  console.log('正在生成 global.d.ts 文件...')

  // 创建目标目录
  if (!fs.existsSync(distTypingsDir)) {
    fs.mkdirSync(distTypingsDir, { recursive: true })
  }

  // 获取所有类型定义文件
  const typeFiles = fs.readdirSync(srcTypingsDir)
    .filter(file => file.endsWith('.d.ts'))

  // 合并文件内容
  let content = '// 全局类型定义，自动生成\n\n'

  typeFiles.forEach((file) => {
    const filePath = path.resolve(srcTypingsDir, file)
    // 使用UTF-8编码读取文件
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    content += `// 来自 ${file}\n${fileContent}\n\n`
  })

  // 写入到目标文件，确保使用UTF-8编码
  const targetFile = path.resolve(distTypingsDir, 'global.d.ts')
  fs.writeFileSync(targetFile, content, { encoding: 'utf-8' })

  console.log(`✅ global.d.ts 文件生成成功，位置：${targetFile}`)

  return targetFile
}

// 如果直接运行此脚本，则执行生成
if (import.meta.url === `file://${__filename}`) {
  mergeTypeFiles()
}

// 导出函数，方便其他脚本导入
export default mergeTypeFiles
