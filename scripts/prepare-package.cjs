const fs = require('node:fs')
const path = require('node:path')

// 读取根目录的package.json
const packageJson = require('../package.json')

// 创建用于发布的简化版package.json
const publishPackage = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description || '基于Vue3的UI组件库',
  keywords: packageJson.keywords || ['vue', 'ui', 'components', 'vue3'],
  author: packageJson.author || '',
  license: packageJson.license || 'MIT',
  homepage: packageJson.homepage || '',
  repository: packageJson.repository || '',
  bugs: packageJson.bugs || '',
  main: packageJson.main.replace('dist/', ''),
  module: packageJson.module.replace('dist/', ''),
  types: packageJson.types.replace('dist/', ''),
  exports: {
    '.': {
      types: './types/index.d.ts',
      import: './jovial-ui.es.js',
      require: './jovial-ui.umd.js',
    },
    './style.css': './style.css',
  },
  dependencies: packageJson.peerDependencies || {
    vue: '^3.3.0',
  },
  sideEffects: false,
}

// 确保dist目录存在
const distDir = path.resolve(__dirname, '../dist')
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// 写入dist/package.json
fs.writeFileSync(
  path.join(distDir, 'package.json'),
  JSON.stringify(publishPackage, null, 2),
)

// 复制README.md和LICENSE文件到dist目录
try {
  fs.copyFileSync(
    path.resolve(__dirname, '../README.md'),
    path.join(distDir, 'README.md'),
  )
  console.log('复制 README.md 到 dist 目录成功')
}
catch (err) {
  console.error('复制 README.md 失败:', err)
}

try {
  if (fs.existsSync(path.resolve(__dirname, '../LICENSE'))) {
    fs.copyFileSync(
      path.resolve(__dirname, '../LICENSE'),
      path.join(distDir, 'LICENSE'),
    )
    console.log('复制 LICENSE 到 dist 目录成功')
  }
}
catch (err) {
  console.error('复制 LICENSE 失败:', err)
}

console.log('dist/package.json 创建成功')
