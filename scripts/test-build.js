// 测试脚本，用于测试类型合并和目录清理

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url)
// 获取当前文件所在的目录
const __dirname = path.dirname(__filename)
// 项目根目录
const rootDir = path.resolve(__dirname, '..')
// 目标目录
const distDir = path.resolve(rootDir, 'dist-lib')

// 确保目标目录存在
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// 需要保留的文件夹
const keepFolders = ['components', 'hooks', 'directives', 'locale', 'theme', 'typings']

// 创建所需的目录结构
function createFolderStructure() {
  console.log('创建目录结构...')

  // 创建typings目录
  const typingsDir = path.resolve(distDir, 'typings')
  if (!fs.existsSync(typingsDir)) {
    fs.mkdirSync(typingsDir, { recursive: true })
  }

  // 创建其他需要保留的目录
  keepFolders.forEach((folder) => {
    if (folder === 'typings')
      return // 已经创建过

    const folderPath = path.resolve(distDir, folder)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    // 创建示例文件
    fs.writeFileSync(
      path.resolve(folderPath, 'index.js'),
      `// ${folder} folder index file\nexport default {}\n`,
      { encoding: 'utf-8' },
    )
  })

  // 创建其他不需要保留的目录（用于测试清理）
  const testFolders = ['utils', 'constants', 'core']
  testFolders.forEach((folder) => {
    const folderPath = path.resolve(distDir, folder)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    // 创建示例文件
    fs.writeFileSync(
      path.resolve(folderPath, 'index.js'),
      `// ${folder} folder index file\nexport default {}\n`,
      { encoding: 'utf-8' },
    )
  })

  // 创建根目录文件
  fs.writeFileSync(
    path.resolve(distDir, 'jovial-ui.es.js'),
    `// Library entry file\nexport default {}\n`,
    { encoding: 'utf-8' },
  )

  fs.writeFileSync(
    path.resolve(distDir, 'jovial-ui.umd.js'),
    `// Library UMD entry file\nexport default {}\n`,
    { encoding: 'utf-8' },
  )

  fs.writeFileSync(
    path.resolve(distDir, 'should-be-removed.js'),
    `// This file should be removed\n`,
    { encoding: 'utf-8' },
  )

  console.log('✅ 目录结构创建完成')
}

// 生成 global.d.ts 文件
async function generateGlobalDts() {
  console.log('测试生成 global.d.ts 文件...')

  // 运行copy-global-types.js脚本
  const { default: copyGlobalTypes } = await import('./copy-global-types.js')
  // 执行导入的函数
  await copyGlobalTypes()

  console.log('✅ global.d.ts 文件生成完成')
}

// 测试清理目录
async function testCleanDir() {
  console.log('测试清理目录...')

  // 运行clean-dist.js脚本
  const { default: cleanDist } = await import('./clean-dist.js')
  // 执行导入的函数
  await cleanDist()

  console.log('✅ 目录清理测试完成')
}

// 运行测试
async function runTest() {
  try {
    // 创建测试目录结构
    createFolderStructure()

    // 生成global.d.ts文件
    await generateGlobalDts()

    // 测试清理目录
    await testCleanDir()

    console.log('所有测试完成')
  }
  catch (error) {
    console.error('测试失败:', error)
  }
}

// 执行测试
runTest()
