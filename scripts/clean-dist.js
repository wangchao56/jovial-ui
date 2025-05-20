// 清理打包目录，只保留components、hooks、directives、locale、theme和typings文件夹

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url)
// 获取当前文件所在的目录
const __dirname = path.dirname(__filename)
// 项目根目录
const rootDir = path.resolve(__dirname, '..')
// 打包输出目录
const distDir = path.resolve(rootDir, 'dist-lib')

// 允许保留的文件夹
const keepFolders = ['components', 'hooks', 'directives', 'locale', 'theme', 'typings']
// 允许保留的根文件(与文件夹同级的文件)
const keepRootFiles = [
  'jovial-ui.es.js',
  'jovial-ui.umd.js',
  'style.css',
  'index.js',
  'index.d.ts',
]

/**
 * 递归删除目录下的所有内容
 * @param {string} dir 要删除的目录
 * @param {boolean} keepDir 是否保留目录本身
 */
function removeDir(dir, keepDir = false) {
  if (!fs.existsSync(dir))
    return

  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      removeDir(filePath)
    }
    else {
      fs.unlinkSync(filePath)
    }
  }

  if (!keepDir) {
    fs.rmdirSync(dir)
  }
}

/**
 * 清理打包目录
 */
function cleanDistDirectory() {
  console.log('正在清理打包目录...')

  if (!fs.existsSync(distDir)) {
    console.log('打包目录不存在，跳过清理')
    return
  }

  // 获取打包目录下的所有文件和文件夹
  const files = fs.readdirSync(distDir)

  // 遍历删除不在保留列表中的文件和文件夹
  for (const file of files) {
    const filePath = path.join(distDir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // 如果是不需要保留的文件夹，则删除
      if (!keepFolders.includes(file)) {
        console.log(`正在删除目录: ${file}`)
        removeDir(filePath)
      }
    }
    else {
      // 如果是不需要保留的文件，则删除
      if (!keepRootFiles.includes(file)) {
        console.log(`正在删除文件: ${file}`)
        fs.unlinkSync(filePath)
      }
    }
  }

  console.log('✅ 打包目录清理完成')
}

// 执行清理
cleanDistDirectory()
