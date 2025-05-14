import type { Meta, StoryObj } from '@storybook/vue3'
import JvLink from '../src/JvLink.vue'
import JvParagraph from '../src/JvParagraph.vue'
import JvText from '../src/JvText.vue'
import JvTitle from '../src/JvTitle.vue'
import JvTypography from '../src/JvTypography.vue'
import readme from './README.md?raw'

// 更多信息: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '通用组件/Typography 排版',
  component: JvTypography,
  subcomponents: { JvText, JvTitle, JvParagraph, JvLink },
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof JvTypography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { JvTypography, JvTitle, JvText, JvParagraph, JvLink },
    template: `
      <JvTypography>
        <JvTitle level="1">Typography 排版</JvTitle>
        <JvParagraph>Jovial UI 提供了丰富的排版组件，基于Material Design规范设计，包括标题、文本、段落和链接。</JvParagraph>
      </JvTypography>
    `,
  }),
}

export const TitleExample: Story = {
  name: '标题 Title',
  render: () => ({
    components: { JvTypography, JvTitle },
    template: `
      <JvTypography>
        <JvTitle level="1">H1 标题 (96px)</JvTitle>
        <JvTitle level="2">H2 标题 (60px)</JvTitle>
        <JvTitle level="3">H3 标题 (48px)</JvTitle>
        <JvTitle level="4">H4 标题 (34px)</JvTitle>
        <JvTitle level="5">H5 标题 (24px)</JvTitle>
        <JvTitle level="6">H6 标题 (20px)</JvTitle>
      </JvTypography>
    `,
  }),
}

export const TextExample: Story = {
  name: '文本 Text',
  render: () => ({
    components: { JvTypography, JvText },
    template: `
      <JvTypography>
        <div style="margin-bottom: 24px;">
          <h3>Material Design 文本变体</h3>
          <div style="margin-bottom: 16px;">
            <JvText mdVariant="subtitle1">Subtitle1 - 副标题，中等粗细 (16px)</JvText>
          </div>
          <div style="margin-bottom: 16px;">
            <JvText mdVariant="subtitle2">Subtitle2 - 副标题，加粗 (14px)</JvText>
          </div>
          <div style="margin-bottom: 16px;">
            <JvText mdVariant="body1">Body1 - 常规正文 (16px) - 这是一段示例文本，展示了Body1的样式。使用于主要内容和段落文本。</JvText>
          </div>
          <div style="margin-bottom: 16px;">
            <JvText mdVariant="body2">Body2 - 辅助正文 (14px) - 这是一段示例文本，展示了Body2的样式。使用于辅助说明和次要内容。</JvText>
          </div>
          <div style="margin-bottom: 16px;">
            <JvText mdVariant="button">BUTTON - 按钮文本 (14px)</JvText>
          </div>
          <div style="margin-bottom: 16px;">
            <JvText mdVariant="caption">Caption - 小字说明 (12px) - 用于辅助说明和注释</JvText>
          </div>
          <div style="margin-bottom: 16px;">
            <JvText mdVariant="overline">OVERLINE - 标签或分类标识 (10px)</JvText>
          </div>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3>文本颜色</h3>
          <div style="margin-bottom: 8px;"><JvText color="primary">主要颜色文本</JvText></div>
          <div style="margin-bottom: 8px;"><JvText color="secondary">次要颜色文本</JvText></div>
          <div style="margin-bottom: 8px;"><JvText color="success">成功颜色文本</JvText></div>
          <div style="margin-bottom: 8px;"><JvText color="warning">警告颜色文本</JvText></div>
          <div style="margin-bottom: 8px;"><JvText color="danger">危险颜色文本</JvText></div>
          <div style="margin-bottom: 8px;"><JvText color="info">信息颜色文本</JvText></div>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3>文本截断</h3>
          <div style="width: 300px; margin-bottom: 16px;">
            <JvText truncate>这是一段很长的文本，当内容超出容器宽度时会自动截断并显示省略号，这样可以保持布局的整洁性。</JvText>
          </div>
          <div style="width: 300px;">
            <JvText :ellipsis="2">这是一段很长的多行文本示例，当内容超出指定的行数时会自动显示省略号。这里设置为最多显示2行，超出部分将被截断。这对于卡片、列表等有限空间的展示非常有用。</JvText>
          </div>
        </div>
      </JvTypography>
    `,
  }),
}

export const ParagraphExample: Story = {
  name: '段落 Paragraph',
  render: () => ({
    components: { JvTypography, JvParagraph, JvTitle },
    template: `
      <JvTypography>
        <JvTitle level="4">段落示例</JvTitle>
        
        <JvParagraph mdVariant="body1">
          这是一个使用body1样式的段落示例。Material Design的排版系统提供了清晰的层次结构，
          帮助用户快速理解内容的重要性。正文文本应该易于阅读，使用适当的行高和字母间距。
        </JvParagraph>
        
        <JvParagraph mdVariant="body2">
          这是一个使用body2样式的段落示例。使用较小的字体大小，适合辅助说明和次要内容。
          在信息密集的界面中，合理使用不同大小的文本可以创建视觉层次，引导用户关注最重要的内容。
        </JvParagraph>
        
        <JvTitle level="5">多行文本省略</JvTitle>
        <div style="width: 500px;">
          <JvParagraph :ellipsis="3">
            这是一个展示多行文本省略功能的段落。当文本内容超过指定的行数时，会自动截断并显示省略号。
            这对于需要在有限空间内展示大量文本的场景非常有用，如卡片、列表项等。用户可以通过点击查看更多或展开按钮来查看完整内容。
            这里设置为最多显示3行文本，超出部分将被隐藏。Material Design建议在移动设备上使用更紧凑的布局，
            而在桌面设备上可以显示更多内容。合理使用文本省略可以保持界面的整洁和一致性。
          </JvParagraph>
        </div>
      </JvTypography>
    `,
  }),
}

export const LinkExample: Story = {
  name: '链接 Link',
  render: () => ({
    components: { JvTypography, JvLink, JvParagraph },
    template: `
      <JvTypography>
        <JvParagraph>
          Jovial UI 提供了链接组件，可以轻松创建内部或外部链接。
          这里有一个<JvLink href="https://material.io/design/typography/the-type-system.html" target="_blank">Material Design排版系统</JvLink>的链接示例。
        </JvParagraph>
        
        <div style="margin-top: 24px;">
          <div style="margin-bottom: 16px;"><JvLink>默认链接</JvLink></div>
          <div style="margin-bottom: 16px;"><JvLink underline>带下划线的链接</JvLink></div>
          <div style="margin-bottom: 16px;"><JvLink type="primary">主要颜色链接</JvLink></div>
          <div style="margin-bottom: 16px;"><JvLink type="secondary">次要颜色链接</JvLink></div>
          <div style="margin-bottom: 16px;"><JvLink type="success">成功颜色链接</JvLink></div>
          <div style="margin-bottom: 16px;"><JvLink type="warning">警告颜色链接</JvLink></div>
          <div style="margin-bottom: 16px;"><JvLink type="danger">危险颜色链接</JvLink></div>
          <div style="margin-bottom: 16px;"><JvLink disabled>禁用的链接</JvLink></div>
          <div style="margin-bottom: 16px;"><JvLink size="small">小号链接</JvLink></div>
          <div style="margin-bottom: 16px;"><JvLink size="large">大号链接</JvLink></div>
        </div>
      </JvTypography>
    `,
  }),
}

export const CompleteExample: Story = {
  name: '完整排版示例',
  render: () => ({
    components: { JvTypography, JvTitle, JvText, JvParagraph, JvLink },
    template: `
      <JvTypography>
        <JvTitle level="1">Material Design 排版系统</JvTitle>
        <JvText mdVariant="subtitle1">基于清晰、简洁和可读性的原则设计</JvText>
        
        <JvTitle level="2">设计原则</JvTitle>
        <JvParagraph>
          Material Design 的排版系统旨在平衡内容的层次结构和可读性。通过使用不同的字体大小、粗细和间距，
          创建清晰的视觉层次结构，帮助用户快速理解和浏览内容。
        </JvParagraph>
        
        <JvTitle level="3">标题系统</JvTitle>
        <JvParagraph>
          标题从H1到H6提供了六个级别的层次结构，可以用于组织内容并指示重要性。
          H1用于主标题，H2用于分节标题，依此类推。合理使用标题可以改善内容的可扫描性和理解度。
        </JvParagraph>
        
        <JvTitle level="3">文本样式</JvTitle>
        <JvParagraph>
          正文文本分为Body1和Body2两种样式，前者用于主要内容，后者用于次要内容。
          此外，还有Subtitle、Button、Caption和Overline等特殊文本样式，用于不同的场景需求。
        </JvParagraph>
        
        <JvTitle level="4">可访问性考虑</JvTitle>
        <JvParagraph>
          设计排版系统时，需要考虑文本的可读性和可访问性。合适的对比度、字体大小和行间距有助于提高可读性。
          Material Design建议正文文本至少使用14sp的字体大小，并保持适当的对比度。
        </JvParagraph>
        
        <JvTitle level="4">响应式排版</JvTitle>
        <JvParagraph>
          在不同设备上，排版系统需要适应不同的屏幕尺寸。Material Design提供了响应式排版指南，
          帮助设计师在不同屏幕尺寸上维持一致的阅读体验。
        </JvParagraph>
        
        <JvParagraph>
          了解更多信息，请访问<JvLink href="https://material.io/design/typography/the-type-system.html" target="_blank">Material Design官方文档</JvLink>。
        </JvParagraph>
      </JvTypography>
    `,
  }),
}
