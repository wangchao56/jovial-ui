import type { Meta, StoryObj } from '@storybook/vue3'
import JvCollapse from '../src/JvCollapse.vue'
import JvCollapseGroup from '../src/JvCollapseGroup.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof JvCollapse> = {
  title: '数据展示组件/Collapse 折叠面板',
  component: JvCollapse,
  subcomponents: { JvCollapseGroup },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '是否展开',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    showArrow: {
      control: 'boolean',
      description: '是否显示箭头',
    },
    duration: {
      control: 'number',
      description: '动画持续时间(毫秒)',
    },
    title: {
      control: 'text',
      description: '折叠面板标题',
    },
    icon: {
      control: 'text',
      description: '标题前显示的图标名称',
    },
    collapseIcon: {
      control: 'text',
      description: '折叠状态显示的图标',
    },
    expandIcon: {
      control: 'text',
      description: '展开状态显示的图标',
    },
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'flat', 'outlined'],
      description: '组件变体样式',
    },
    lazy: {
      control: 'boolean',
      description: '是否懒加载内容',
    },
    class: {
      control: 'text',
      description: '自定义类名',
    },
    size: {
      control: 'select',
      description: '折叠面板尺寸',
      options: ['small', 'medium', 'large'],
    },
  },
  args: {
    modelValue: false,
    disabled: false,
    showArrow: true,
    duration: 300,
    title: '折叠面板',
    icon: '',
    collapseIcon: '$chevronDown',
    expandIcon: '$chevronUp',
    variant: 'elevated',
    lazy: false,
    class: '',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof JvCollapse>

// 基础折叠面板
export const Basic: Story = {
  args: {
    title: '基础折叠面板',
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
       <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这是折叠面板的内容区域。点击标题栏可以展开或收起此内容。
            <p>你可以在这里放置任何内容，包括文本、图片、表单等。</p>
          </div>
        </JvCollapse>
    `,
  }),
}

// 默认展开
export const DefaultExpanded: Story = {
  args: {
    title: '默认展开的折叠面板',
    modelValue: true,
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板默认是展开的。<br>
            用户仍然可以点击标题栏来收起这个面板。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  args: {
    title: '禁用的折叠面板',
    disabled: true,
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板已被禁用，无法点击展开或收起。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 带图标
export const WithIcon: Story = {
  args: {
    title: '带图标的折叠面板',
    icon: 'mdi:information-outline',
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板在标题前有一个图标。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 无箭头
export const NoArrow: Story = {
  args: {
    title: '没有箭头的折叠面板',
    showArrow: false,
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板没有显示展开/收起箭头。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 自定义动画持续时间
export const CustomDuration: Story = {
  args: {
    title: '慢动画折叠面板',
    duration: 1000,
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板的展开/收起动画时间更长（1000毫秒）。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 懒加载内容
export const LazyLoaded: Story = {
  args: {
    title: '懒加载内容',
    lazy: true,
  },
  render: args => ({
    components: { JvCollapse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse v-bind="args">
          <div style="padding: 16px;">
            这个折叠面板的内容使用懒加载，只有首次展开时才会渲染。
            <p>这对于包含大量内容或复杂组件的面板很有用，可以提高初始渲染性能。</p>
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 自定义插槽
export const CustomSlots: Story = {
  render: () => ({
    components: { JvCollapse },
    template: `
      <div style="width: 600px; max-width: 100%; display: flex; flex-direction: column; gap: 16px;">
        <JvCollapse>
          <template #title>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 16px; height: 16px; background-color: #1976d2; border-radius: 50%;"></span>
              <span>自定义标题插槽</span>
            </div>
          </template>
          <div style="padding: 16px;">
            这个折叠面板使用了自定义标题插槽。
          </div>
        </JvCollapse>
        
        <JvCollapse title="自定义图标插槽">
          <template #icon>
            <div style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; background-color: #4caf50; color: white; border-radius: 4px; font-size: 12px; font-weight: bold;">A</div>
          </template>
          <div style="padding: 16px;">
            这个折叠面板使用了自定义图标插槽。
          </div>
        </JvCollapse>
        
        <JvCollapse title="自定义箭头插槽">
          <template #arrow>
            <div style="font-size: 12px; font-weight: bold; color: #f44336;">▼</div>
          </template>
          <div style="padding: 16px;">
            这个折叠面板使用了自定义箭头插槽。
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 折叠面板组
export const CollapseGroup: Story = {
  render: () => ({
    components: { JvCollapse, JvCollapseGroup },
    template: `
        <JvFlex direction="column" gap="16px">
        <JvCard title="折叠面板组-默认">
        <JvCollapseGroup>
        <JvCollapse title="第一个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第一个折叠面板的内容区域。
          </div>
        </JvCollapse>
        <JvCollapse title="第二个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第二个折叠面板的内容区域。
          </div>
        </JvCollapse>
        <div style="height: 1px; background-color: #e0e0e0;"></div>
        <JvCollapse title="第三个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第三个折叠面板的内容区域。
          </div>
          </JvCollapse>
        </JvCollapseGroup>
        </JvCard>
          <JvCard title="折叠面板组-手风琴模式" sub-title="accordion=true">
        <JvCollapseGroup :accordion="true">
        <JvCollapse title="第一个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第一个折叠面板的内容区域。
          </div>
        </JvCollapse>
        <JvCollapse title="第二个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第二个折叠面板的内容区域。
          </div>
        </JvCollapse>
        
        <div style="height: 1px; background-color: #e0e0e0;"></div>
        
        <JvCollapse title="第三个面板" :custom-class="'no-radius'">
          <div style="padding: 16px;">
            第三个折叠面板的内容区域。
          </div>
          </JvCollapse>
        </JvCollapseGroup>
        </JvCard>
      </JvFlex>
    `,
  }),
}

// 嵌套折叠面板
export const NestedCollapse: Story = {
  render: () => ({
    components: { JvCollapse },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <JvCollapse title="外层折叠面板" :model-value="true">
          <div style="padding: 16px;">
            <p>外层折叠面板的内容。</p>
            
            <JvCollapse title="内层折叠面板 1">
              <div style="padding: 16px;">
                内层折叠面板 1 的内容。
              </div>
            </JvCollapse>
            
            <div style="height: 8px;"></div>
            
            <JvCollapse title="内层折叠面板 2">
              <div style="padding: 16px;">
                内层折叠面板 2 的内容。
              </div>
            </JvCollapse>
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 博客网站真实案例
export const BlogExample: Story = {
  render: () => ({
    components: { JvCollapse, JvCollapseGroup },
    setup() {
      const blogPosts = [
        {
          id: 1,
          title: '如何优化 Vue 应用的性能',
          author: '张三',
          date: '2023-11-18',
          tags: ['Vue', '性能优化', '前端开发'],
          summary: '性能优化是每个前端开发者都需要面对的问题。本文将介绍如何通过组件懒加载、虚拟滚动、状态管理优化等方式提升 Vue 应用的性能...',
          content: `<p>性能优化是每个前端开发者都需要面对的问题。本文将介绍几种行之有效的 Vue 应用性能优化策略。</p>
            
            <h3>1. 组件懒加载</h3>
            <p>对于大型应用，可以使用 Vue 的异步组件结合 Webpack 的代码分割功能，实现按需加载组件。这可以显著减少初始加载时间。</p>
            <pre><code>const AsyncComponent = () => import('./AsyncComponent.vue')</code></pre>
            
            <h3>2. 使用虚拟滚动</h3>
            <p>当需要渲染大列表时，可以考虑使用虚拟滚动技术，只渲染可视区域内的元素，减少 DOM 节点数量。可以使用 vue-virtual-scroller 等库来实现。</p>
            
            <h3>3. 合理使用状态管理</h3>
            <p>Vuex 虽然强大，但不是所有状态都需要放在全局存储中。合理划分全局状态和局部状态，可以减少不必要的组件重渲染。</p>
            
            <h3>4. 使用 v-once 指令</h3>
            <p>对于不会改变的内容，可以使用 v-once 指令，这样元素/组件及其所有子节点将只渲染一次，之后重新渲染时会被视为静态内容并跳过。</p>
            
            <h3>5. 避免不必要的组件更新</h3>
            <p>可以通过 v-memo 指令或通过实现 shouldComponentUpdate 等效功能的方式，避免组件不必要的更新。</p>
            
            <p>以上仅是 Vue 性能优化的一部分，实际应用中还需要结合具体场景进行更有针对性的优化。</p>`,
        },
        {
          id: 2,
          title: 'CSS 变量的高级用法',
          author: '李四',
          date: '2023-11-15',
          tags: ['CSS', '前端开发', '设计系统'],
          summary: 'CSS 变量（自定义属性）是现代前端开发的重要工具。本文将深入探讨 CSS 变量的高级用法，包括主题切换、响应式设计等方面...',
          content: `<p>CSS 变量（又称自定义属性）为现代前端开发提供了强大的能力。本文将探讨其高级用法。</p>
            
            <h3>1. 主题切换</h3>
            <p>CSS 变量最常见的用法之一是实现主题切换。通过在不同的容器（如 body）上设置不同的变量值，可以轻松实现明暗主题切换。</p>
            <pre><code>body.light-theme {
  --bg-color: #ffffff;
  --text-color: #333333;
}

body.dark-theme {
  --bg-color: #333333;
  --text-color: #ffffff;
}</code></pre>
            
            <h3>2. 响应式设计</h3>
            <p>结合媒体查询，可以为不同尺寸的设备设置不同的 CSS 变量值，简化响应式设计。</p>
            <pre><code>:root {
  --container-width: 1200px;
}

@media (max-width: 768px) {
  :root {
    --container-width: 100%;
  }
}</code></pre>
            
            <h3>3. 复杂动画</h3>
            <p>CSS 变量可以结合 JavaScript 实现复杂的动画效果，特别是那些需要动态计算的动画。</p>
            
            <h3>4. 组件设计</h3>
            <p>在组件化开发中，CSS 变量可以提供更灵活的样式自定义能力，允许消费者覆盖默认样式而不需要了解组件内部实现。</p>
            
            <p>熟练运用 CSS 变量，将使你的样式代码更加灵活、可维护，也为用户提供更好的体验。</p>`,
        },
        {
          id: 3,
          title: 'TypeScript 类型体操实战',
          author: '王五',
          date: '2023-11-10',
          tags: ['TypeScript', '前端开发', '类型系统'],
          summary: 'TypeScript 的类型系统非常强大，但也很复杂。本文将通过实例讲解如何利用条件类型、映射类型等高级特性解决实际问题...',
          content: `<p>TypeScript 的类型系统非常强大，掌握它可以极大提升代码质量和开发效率。本文将介绍一些高级类型技巧。</p>
            
            <h3>1. 条件类型</h3>
            <p>条件类型允许我们根据某个条件选择不同的类型，类似于类型世界的 if 语句。</p>
            <pre><code>type IsArray<T> = T extends any[] ? true : false;
type CheckString = IsArray<string>; // false
type CheckArray = IsArray<number[]>; // true</code></pre>
            
            <h3>2. 映射类型</h3>
            <p>映射类型允许我们基于一个已有类型创建新类型，通常用于转换接口的属性。</p>
            <pre><code>type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  name: string;
  age: number;
}

type ReadOnlyUser = ReadOnly<User>;</code></pre>
            
            <h3>3. 递归类型</h3>
            <p>TypeScript 支持递归类型定义，这对处理嵌套数据结构非常有用。</p>
            
            <h3>4. 类型推断</h3>
            <p>利用 TypeScript 的类型推断能力，可以减少冗余的类型标注，同时保持类型安全。</p>
            
            <p>这些高级类型技巧看似复杂，但在实际项目中能解决很多棘手问题，提高代码的类型安全性。</p>`,
        },
      ]

      return { blogPosts }
    },
    template: `
      <div style="width: 800px; max-width: 100%; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333;">
        <h2 style="margin-bottom: 16px; color: #2c3e50;">技术博客</h2>
        
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- 博客文章列表 -->
          <div v-for="post in blogPosts" :key="post.id" style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: white;">
            <!-- 文章概览 -->
            <div style="padding: 20px; border-bottom: 1px solid #eee;">
              <h3 style="margin-top: 0; margin-bottom: 12px; color: #1976d2;">{{ post.title }}</h3>
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; color: #666;">
                <span>作者: {{ post.author }}</span>
                <span>发布于: {{ post.date }}</span>
              </div>
              <div style="margin-bottom: 16px;">
                <span v-for="tag in post.tags" :key="tag" 
                  style="display: inline-block; padding: 4px 8px; margin-right: 8px; background-color: #e3f2fd; color: #1976d2; border-radius: 4px; font-size: 12px;">
                  {{ tag }}
                </span>
              </div>
              <p style="margin-bottom: 0; line-height: 1.6;">{{ post.summary }}</p>
            </div>
            
            <!-- 使用 JvCollapse 显示文章全文 -->
            <JvCollapse title="阅读全文" lazy>
              <div style="padding: 20px; line-height: 1.6;" v-html="post.content"></div>
              
              <!-- 评论区折叠面板 -->
              <div style="padding: 0 20px 20px;">
                <JvCollapse title="查看评论" icon="mdi:comment-outline">
                  <div style="padding: 16px;">
                    <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #eee;">
                      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: bold;">用户001</span>
                        <span style="font-size: 12px; color: #666;">2023-11-19</span>
                      </div>
                      <p style="margin: 0;">非常实用的文章，学到了很多！</p>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: bold;">用户002</span>
                        <span style="font-size: 12px; color: #666;">2023-11-18</span>
                      </div>
                      <p style="margin: 0;">请问第一点有没有更详细的示例？</p>
                    </div>
                    
                    <!-- 添加评论表单 -->
                    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee;">
                      <div style="font-weight: bold; margin-bottom: 12px;">发表评论</div>
                      <textarea style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; min-height: 80px; box-sizing: border-box; margin-bottom: 12px;" placeholder="写下你的评论..."></textarea>
                      <button style="background-color: #1976d2; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">提交评论</button>
                    </div>
                  </div>
                </JvCollapse>
                
                <!-- 相关文章折叠面板 -->
                <div style="margin-top: 16px;">
                  <JvCollapse title="相关推荐" icon="mdi:link-variant">
                    <div style="padding: 16px;">
                      <ul style="margin: 0; padding-left: 20px;">
                        <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">Vue3 组合式 API 最佳实践</a></li>
                        <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">网站性能监测与分析指南</a></li>
                        <li><a href="#" style="color: #1976d2; text-decoration: none;">前端代码优化的 20 个小技巧</a></li>
                      </ul>
                    </div>
                  </JvCollapse>
                </div>
              </div>
            </JvCollapse>
          </div>
        </div>
        
        <!-- 分类与归档 -->
        <div style="margin-top: 32px;">
          <h3 style="margin-bottom: 16px; color: #2c3e50;">博客分类</h3>
          <JvCollapseGroup :accordion="true">
            <JvCollapse title="前端开发" icon="mdi:code-tags">
              <div style="padding: 16px;">
                <ul style="margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">JavaScript (42)</a></li>
                  <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">CSS (38)</a></li>
                  <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">HTML (25)</a></li>
                  <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">Vue (31)</a></li>
                  <li><a href="#" style="color: #1976d2; text-decoration: none;">React (27)</a></li>
                </ul>
              </div>
            </JvCollapse>
            
            <JvCollapse title="后端开发" icon="mdi:server">
              <div style="padding: 16px;">
                <ul style="margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">Node.js (19)</a></li>
                  <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">Python (23)</a></li>
                  <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">Java (15)</a></li>
                  <li><a href="#" style="color: #1976d2; text-decoration: none;">Go (11)</a></li>
                </ul>
              </div>
            </JvCollapse>
            
            <JvCollapse title="开发工具" icon="mdi:tools">
              <div style="padding: 16px;">
                <ul style="margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">Git (18)</a></li>
                  <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">VSCode (14)</a></li>
                  <li style="margin-bottom: 8px;"><a href="#" style="color: #1976d2; text-decoration: none;">Webpack (16)</a></li>
                  <li><a href="#" style="color: #1976d2; text-decoration: none;">Docker (12)</a></li>
                </ul>
              </div>
            </JvCollapse>
          </JvCollapseGroup>
        </div>
      </div>
    `,
  }),
}

// 展示不同尺寸的示例
export const DifferentSizes: Story = {
  render: () => ({
    components: { JvCollapse },
    template: `
      <div style="width: 800px; max-width: 100%; display: flex; flex-direction: column; gap: 24px;">
        <JvCollapse title="小尺寸折叠面板" size="small">
          <div style="padding: 16px;">
            这是小尺寸的折叠面板，适合空间有限的场景或移动端使用。
            <p>小尺寸具有更紧凑的高度和内边距。</p>
          </div>
        </JvCollapse>
        
        <JvCollapse title="中等尺寸折叠面板（默认）" size="medium">
          <div style="padding: 16px;">
            这是中等尺寸的折叠面板，适合大多数场景使用。
            <p>中等尺寸是默认尺寸，提供了良好的可点击区域和可读性。</p>
          </div>
        </JvCollapse>
        
        <JvCollapse title="大尺寸折叠面板" size="large">
          <div style="padding: 16px;">
            这是大尺寸的折叠面板，适合需要突出显示或触摸屏设备使用。
            <p>大尺寸提供了更大的可点击区域和更明显的视觉层次。</p>
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 展示折叠面板组中的不同尺寸
export const CollapseGroupSizes: Story = {
  render: () => ({
    components: { JvCollapse, JvCollapseGroup },
    template: `
      <div style="width: 800px; max-width: 100%; display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h3 style="margin-bottom: 16px;">小尺寸折叠面板组</h3>
          <JvCollapseGroup size="small" rounded elevated>
            <JvCollapse title="第一项">
              <div style="padding: 16px;">小尺寸折叠面板的内容区域。</div>
            </JvCollapse>
            <JvCollapse title="第二项">
              <div style="padding: 16px;">适合紧凑布局和信息密度较高的页面。</div>
            </JvCollapse>
            <JvCollapse title="第三项">
              <div style="padding: 16px;">在移动设备上表现良好。</div>
            </JvCollapse>
          </JvCollapseGroup>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px;">中等尺寸折叠面板组（默认）</h3>
          <JvCollapseGroup size="medium" rounded elevated>
            <JvCollapse title="第一项">
              <div style="padding: 16px;">中等尺寸折叠面板的内容区域。</div>
            </JvCollapse>
            <JvCollapse title="第二项">
              <div style="padding: 16px;">适合大多数通用场景使用。</div>
            </JvCollapse>
            <JvCollapse title="第三项">
              <div style="padding: 16px;">提供良好的可读性和易用性。</div>
            </JvCollapse>
          </JvCollapseGroup>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px;">大尺寸折叠面板组</h3>
          <JvCollapseGroup size="large" rounded elevated>
            <JvCollapse title="第一项">
              <div style="padding: 16px;">大尺寸折叠面板的内容区域。</div>
            </JvCollapse>
            <JvCollapse title="第二项">
              <div style="padding: 16px;">适合重要信息展示和触摸屏设备。</div>
            </JvCollapse>
            <JvCollapse title="第三项">
              <div style="padding: 16px;">提供更大的点击区域和更明显的视觉层次。</div>
            </JvCollapse>
          </JvCollapseGroup>
        </div>
      </div>
    `,
  }),
}

// 自定义图标
export const CustomIcons: Story = {
  render: () => ({
    components: { JvCollapse },
    template: `
      <div style="width: 800px; max-width: 100%; display: flex; flex-direction: column; gap: 24px;">
        <JvCollapse title="使用加号/减号图标" collapseIcon="$plus" expandIcon="$minus" width="300px">
          <div style="padding: 16px;">
            这个折叠面板使用加号(+)表示可展开，减号(-)表示可折叠。
            <p>适合用于FAQ页面或帮助文档。</p>
          </div>
        </JvCollapse>
        
        <JvCollapse title="使用箭头图标" collapseIcon="mdi:arrow-right" expandIcon="mdi:arrow-down" width="300px">
          <div style="padding: 16px;">
            这个折叠面板使用向右箭头表示可展开，向下箭头表示可折叠。
            <p>这种模式在树型菜单中很常见。</p>
          </div>
        </JvCollapse>
        
        <JvCollapse title="使用自定义图标" collapseIcon="mdi:chevron-down-circle" expandIcon="mdi:chevron-up-circle" width="300px">
          <div style="padding: 16px;">
            这个折叠面板使用空心圆表示可展开，填充圆表示可折叠。
            <p>可以使用各种图标来适应不同的设计风格。</p>
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 展示不同变体样式
export const Variants: Story = {
  render: () => ({
    components: { JvCollapse },
    template: `
      <div style="width: 800px; max-width: 100%; display: flex; flex-direction: column; gap: 24px;">
        <h3 style="margin-bottom: 8px; color: #333;">Elevated 变体（默认）</h3>
        <JvCollapse title="Elevated 变体" variant="elevated">
          <div style="padding: 16px;">
            Elevated 变体使用阴影效果提升视觉层次，适合需要强调的内容。
            <p>这是默认的变体样式，具有较强的视觉层次感。</p>
          </div>
        </JvCollapse>
        
        <h3 style="margin: 16px 0 8px; color: #333;">Flat 变体</h3>
        <JvCollapse title="Flat 变体" variant="flat">
          <div style="padding: 16px;">
            Flat 变体没有阴影和边框，适合轻量级界面或嵌入到其他元素中。
            <p>这种风格更加简洁，不会在视觉上产生过多的层次感。</p>
          </div>
        </JvCollapse>
        
        <h3 style="margin: 16px 0 8px; color: #333;">Outlined 变体</h3>
        <JvCollapse title="Outlined 变体" variant="outlined">
          <div style="padding: 16px;">
            Outlined 变体使用边框代替阴影，适合需要明确边界的场景。
            <p>这种风格在扁平化设计中很常见，提供了清晰的视觉边界。</p>
          </div>
        </JvCollapse>
        
        <h3 style="margin: 16px 0 8px; color: #333;">Default 变体</h3>
        <JvCollapse title="Default 变体" variant="default">
          <div style="padding: 16px;">
            Default 变体是基础样式，提供标准的阴影效果。
            <p>这种样式适合大多数通用场景。</p>
          </div>
        </JvCollapse>
      </div>
    `,
  }),
}

// 折叠面板组中的变体
export const GroupVariants: Story = {
  render: () => ({
    components: { JvCollapse, JvCollapseGroup },
    template: `
      <div style="width: 800px; max-width: 100%; display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h3 style="margin-bottom: 16px; color: #333;">Elevated 折叠面板组（默认）</h3>
          <JvCollapseGroup variant="elevated" rounded>
            <JvCollapse title="第一项">
              <div style="padding: 16px;">
                Elevated 变体使用较强的阴影提升视觉层次。
              </div>
            </JvCollapse>
            <JvCollapse title="第二项">
              <div style="padding: 16px;">
                这种样式适合需要强调的内容区域。
              </div>
            </JvCollapse>
            <JvCollapse title="第三项">
              <div style="padding: 16px;">
                所有子折叠面板继承父组的变体样式。
              </div>
            </JvCollapse>
          </JvCollapseGroup>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; color: #333;">Flat 折叠面板组</h3>
          <JvCollapseGroup variant="flat" rounded divider>
            <JvCollapse title="第一项">
              <div style="padding: 16px;">
                Flat 变体没有阴影和边框。
              </div>
            </JvCollapse>
            <JvCollapse title="第二项">
              <div style="padding: 16px;">
                这种样式适合轻量级界面。
              </div>
            </JvCollapse>
            <JvCollapse title="第三项">
              <div style="padding: 16px;">
                使用分割线区分各个面板。
              </div>
            </JvCollapse>
          </JvCollapseGroup>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; color: #333;">Outlined 折叠面板组</h3>
          <JvCollapseGroup variant="outlined" rounded>
            <JvCollapse title="第一项">
              <div style="padding: 16px;">
                Outlined 变体使用边框代替阴影。
              </div>
            </JvCollapse>
            <JvCollapse title="第二项">
              <div style="padding: 16px;">
                这种样式在扁平化设计中很常见。
              </div>
            </JvCollapse>
            <JvCollapse title="第三项">
              <div style="padding: 16px;">
                提供了清晰的视觉边界。
              </div>
            </JvCollapse>
          </JvCollapseGroup>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; color: #333;">混合使用变体</h3>
          <JvCollapseGroup rounded>
            <JvCollapse title="Elevated 变体" variant="elevated">
              <div style="padding: 16px;">自定义为 Elevated 变体</div>
            </JvCollapse>
            <JvCollapse title="Flat 变体" variant="flat">
              <div style="padding: 16px;">自定义为 Flat 变体</div>
            </JvCollapse>
            <JvCollapse title="Outlined 变体" variant="outlined">
              <div style="padding: 16px;">自定义为 Outlined 变体</div>
            </JvCollapse>
          </JvCollapseGroup>
        </div>
      </div>
    `,
  }),
}
