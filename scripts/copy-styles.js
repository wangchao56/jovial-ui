/**
 * 复制样式工具类文件到打包目录
 * 这个脚本会在打包完成后运行，确保工具类样式文件被正确复制到输出目录
 */
const fs = require('node:fs')
const path = require('node:path')

// 源目录和目标目录
const SRC_STYLES_DIR = path.resolve(__dirname, '../src/theme/styles')
const LIB_DEST_DIR = path.resolve(__dirname, '../dist-lib/theme/styles')
const COMPONENTS_DEST_DIR = path.resolve(__dirname, '../dist-components/theme/styles')

/**
 * 递归创建目录
 * @param {string} targetDir 目录路径
 */
export function mkdirRecursive(targetDir) {
  if (!fs.existsSync(targetDir)) {
    // 递归创建父目录
    mkdirRecursive(path.dirname(targetDir))
    fs.mkdirSync(targetDir)
  }
}

/**
 * 复制目录
 * @param {string} srcDir 源目录
 * @param {string} destDir 目标目录
 */
export function copyDir(srcDir, destDir) {
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
export function main() {
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
