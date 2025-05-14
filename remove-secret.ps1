#!/usr/bin/env pwsh

# 检查是否为README.md文件
if ($args[0] -eq "README.md") {
    # 读取文件内容
    $content = [System.IO.File]::ReadAllText($args[0])
    
    # 替换任何包含figma key的行
    $content = $content -replace "figma key: figd_.*", ""
    
    # 将修改后的内容写回文件
    [System.IO.File]::WriteAllText($args[0], $content)
}

# 返回文件名，以便git继续处理
Write-Output $args[0] 