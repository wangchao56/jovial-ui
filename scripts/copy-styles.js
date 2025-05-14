/**
 * 复制样式工具类文件到打包目录
 * 这个脚本会在打包完成后运行，确保工具类样式文件被正确复制到输出目录
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 源目录和目标目录
const SRC_STYLES_DIR = path.resolve(__dirname, '../src/theme/styles')
const LIB_DEST_DIR = path.resolve(__dirname, '../dist-lib/theme/styles')
const COMPONENTS_DEST_DIR = path.resolve(__dirname, '../dist-components/theme/styles')

/**
 * 复制目录
 * @param {string} srcDir 源目录
 * @param {string} destDir 目标目录
 */
function copyDir(srcDir, destDir) {
  // 确保目标目录存在
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  // 读取源目录内容
  const entries = fs.readdirSync(srcDir, { withFileTypes: true })

  // 复制每个文件或子目录
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    if (entry.isDirectory()) {
      // 递归复制子目录
      copyDir(srcPath, destPath)
    }
    else {
      // 复制文件
      fs.copyFileSync(srcPath, destPath)
      console.log(`已复制文件: ${srcPath} -> ${destPath}`)
    }
  }
}

/**
 * 开始复制流程
 */
function main() {
  // 复制到库打包目录
  if (!fs.existsSync(LIB_DEST_DIR)) {
    fs.mkdirSync(LIB_DEST_DIR, { recursive: true })
  }
  copyDir(SRC_STYLES_DIR, LIB_DEST_DIR)
  console.log('已完成库样式工具类复制')

  // 复制到组件打包目录
  if (!fs.existsSync(COMPONENTS_DEST_DIR)) {
    fs.mkdirSync(COMPONENTS_DEST_DIR, { recursive: true })
  }
  copyDir(SRC_STYLES_DIR, COMPONENTS_DEST_DIR)
  console.log('已完成组件样式工具类复制')
}

// 执行脚本
main()
