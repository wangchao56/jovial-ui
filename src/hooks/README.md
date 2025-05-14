# Hooks

## useSize

`useSize` 是一个用于统一处理组件尺寸的hooks工具函数。它支持多种尺寸表示方式，并提供了尺寸值的转换和格式化功能。

### 功能介绍

当组件需要设置尺寸时，经常会遇到各种尺寸值的表示方式：

- 预定义尺寸名称：如 'small', 'medium', 'large' 等
- 数字值：如 16, 24, 32 等
- CSS单位值：如 '1.5rem', '20px', '50%' 等

本hooks提供了统一的处理方式，支持以上所有表示方式，并提供：

- 计算后的实际尺寸值
- 转换为像素的数值
- 格式化为带单位的CSS尺寸字符串

### 使用示例

```vue
<script setup lang="ts">
import { useSize } from '@/hooks/useSize'

const props = defineProps({
  size: {
    type: [String, Number],
    default: 'medium'
  }
})

// 使用默认尺寸映射
const { computedSize, sizeInPx, sizeWithUnit } = useSize(props.size)

// 使用自定义尺寸映射和默认值
const customSizeMap = { small: 100, medium: 200, large: 300 }
const { computedSize, sizeWithUnit } = useSize(props.size, customSizeMap, 200)

// 在CSS变量中使用
const customStyles = computed(() => ({
  '--component-size': sizeWithUnit.value
}))
</script>

<template>
  <div :style="customStyles">
    <!-- 组件内容 -->
  </div>
</template>
```

### API参考

```ts
function useSize(
  size: string | number | undefined,
  sizeMap?: Record<string, number>,
  defaultValue?: number
): {
  computedSize: ComputedRef<number | string>,
  sizeInPx: ComputedRef<number>,
  sizeWithUnit: ComputedRef<string>
}
```

#### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `string \| number \| undefined` | - | 尺寸值，可以是预设名称、数字或带单位的字符串 |
| sizeMap | `Record<string, number>` | defaultSizeMap | 尺寸名称到数值的映射表 |
| defaultValue | `number` | 40 | 当无法解析size时使用的默认值 |

#### 返回值

返回一个包含以下计算属性的对象：

| 属性名 | 类型 | 说明 |
| --- | --- | --- |
| computedSize | `ComputedRef<number \| string>` | 计算后的尺寸值。若size是预设名称，返回映射的数值；若是数字，返回该数字；若是CSS单位字符串，返回原字符串 |
| sizeInPx | `ComputedRef<number>` | 尝试提取为像素数值。若无法提取，返回defaultValue |
| sizeWithUnit | `ComputedRef<string>` | 带单位的CSS尺寸字符串，可直接用于样式 |

### 默认尺寸映射

```ts
{
  tiny: 24,
  small: 32,
  medium: 40,
  large: 48,
  xlarge: 64
}
```

### 使用场景

此hooks适用于以下情况：

1. 组件需要支持多种尺寸表示方式
2. 需要在CSS变量中使用尺寸值
3. 需要在不同上下文中以不同形式使用同一尺寸值（如数值计算和CSS样式）

### 与其他工具配合

`useSize` hooks可以与其他hooks和工具配合使用：

- 与`useCssVars`配合设置CSS变量
- 与`convertToUnit`配合处理其他单位转换
- 与`isCssFontSize`配合验证CSS尺寸值的有效性

## useStringOrObjectProps

`useStringOrObjectProps` 是一个用于处理可以是字符串、数字或对象类型的props的工具函数。

### 功能介绍

当组件需要接收一个可以是简单类型（如字符串、数字）或复杂对象的属性时，此Hook可以简化处理逻辑。它会：

- 如果传入的是字符串或数字，将其转换为对象，并将值赋给指定的属性名（默认为'text'）
- 如果传入的是对象，则直接使用该对象
- 如果传入的是undefined，则返回空对象

### 使用示例

```vue
<script setup lang="ts">
import { useStringOrObjectProps } from '@/hooks/useStringOrObjectProps'
import type { JvTextProps } from '@/components/jv-typography'

const props = defineProps({
  title: {
    type: [String, Object],
    default: undefined
  },
  subtitle: {
    type: [String, Number, Object],
    default: undefined
  },
  icon: {
    type: [String, Object],
    default: undefined
  }
})

// 处理title属性，如果是字符串则转换为 { text: 'title内容' }
const titleProps = useStringOrObjectProps<JvTextProps>(props.title)

// 处理subtitle属性，支持字符串、数字或对象
const subtitleProps = useStringOrObjectProps(props.subtitle)

// 处理icon属性，使用自定义属性名'name'
// 如果icon是字符串'user'，则转换为 { name: 'user' }
const iconProps = useStringOrObjectProps(props.icon, 'name')
</script>

<template>
  <div>
    <JvTitle v-bind="titleProps" />
    <JvText v-bind="subtitleProps" />
    <JvIcon v-bind="iconProps" />
  </div>
</template>
```

### API参考

```ts
function useStringOrObjectProps<T extends Record<string, any>>(
  prop: string | number | T | undefined,
  textPropName: string = 'text'
): ComputedRef<T>
```

#### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| prop | `string \| number \| T \| undefined` | - | 传入的prop值 |
| textPropName | `string` | 'text' | 当prop是字符串或数字时，将值赋给的属性名 |

#### 返回值

返回一个计算属性，包含处理后的对象。

### 使用场景

此Hook适用于以下情况：

1. 组件需要接收一个可以是简单值或复杂对象的属性
2. 需要简化模板中的条件判断逻辑
3. 需要一致性地处理多个类似的属性

### 示例应用

在卡片组件中，我们通常需要处理标题、副标题等属性，这些属性可以是简单的字符串，也可以是包含样式、大小等信息的复杂对象：

```vue
<script setup lang="ts">
const props = defineProps({
  title: {
    type: [String, Object],
    default: undefined
  }
})

const titleProps = useStringOrObjectProps(props.title)
</script>

<template>
  <JvTitle v-bind="titleProps">
    {{ typeof props.title === 'string' ? props.title : props.title?.text }}
  </JvTitle>
</template>
```

使用此Hook后，可以简化模板：

```vue
<template>
  <JvTitle v-bind="titleProps">
    {{ props.title }}
  </JvTitle>
</template>
``` 