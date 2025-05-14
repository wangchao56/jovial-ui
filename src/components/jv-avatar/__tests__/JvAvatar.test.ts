import type { JvBadgeProps } from '@/components/jv-badge'
import JvImage from '@/components/jv-image/src/JvImage.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvAvatar from '../src/JvAvatar.vue'

describe('jvAvatar', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvAvatar)
    expect(wrapper.classes()).toContain('jv-avatar')
    expect(wrapper.classes()).toContain('jv-avatar--shape-circle')
    expect(wrapper.classes()).toContain('jv-avatar--medium')
    expect(wrapper.classes()).toContain('jv-avatar--variant-filled')
    expect(wrapper.classes()).toContain('jv-avatar--is-elevated')
  })

  it('renders image avatar when image prop is provided as string', () => {
    const wrapper = mount(JvAvatar, {
      props: {
        image: 'https://example.com/avatar.jpg',
      },
    })
    expect(wrapper.find('.jv-avatar__image').exists()).toBe(true)
    expect(wrapper.findComponent(JvImage).props().src).toBe('https://example.com/avatar.jpg')
  })

  it('renders image avatar when image prop is provided as object', () => {
    const wrapper = mount(JvAvatar, {
      props: {
        image: {
          src: 'https://example.com/avatar.jpg',
          fit: 'contain',
        },
      },
    })
    expect(wrapper.find('.jv-avatar__image').exists()).toBe(true)
    expect(wrapper.findComponent(JvImage).props().src).toBe('https://example.com/avatar.jpg')
    expect(wrapper.findComponent(JvImage).props().fit).toBe('contain')
  })

  it('renders text avatar when text prop is provided', () => {
    const wrapper = mount(JvAvatar, {
      props: {
        text: 'AB',
      },
    })
    expect(wrapper.find('.jv-avatar__text').exists()).toBe(true)
  })

  it('renders icon avatar when icon prop is provided', () => {
    const wrapper = mount(JvAvatar, {
      props: {
        icon: 'user',
      },
    })
    expect(wrapper.find('.jv-avatar__icon').exists()).toBe(true)
  })

  it('applies correct size class for predefined sizes', () => {
    const sizes = ['tiny', 'small', 'medium', 'large', 'xlarge']
    sizes.forEach((size) => {
      const wrapper = mount(JvAvatar, {
        props: {
          size,
        },
      })
      expect(wrapper.classes()).toContain(`jv-avatar--${size}`)
    })
  })

  it('handles custom numeric size correctly', () => {
    const wrapper = mount(JvAvatar, {
      props: {
        size: 100,
      },
    })
    // 由于computedSize是私有的，我们可以检查样式变量
    const style = window.getComputedStyle(wrapper.element)
    expect(style.getPropertyValue('--jv-avatar-size') || wrapper.element.style.getPropertyValue('--jv-avatar-size')).toBeTruthy()
  })

  it('handles custom string size correctly', () => {
    const wrapper = mount(JvAvatar, {
      props: {
        size: '150px',
      },
    })
    // 由于computedSize是私有的，我们可以检查样式变量
    const style = window.getComputedStyle(wrapper.element)
    expect(style.getPropertyValue('--jv-avatar-size') || wrapper.element.style.getPropertyValue('--jv-avatar-size')).toBeTruthy()
  })

  it('applies correct shape class', () => {
    const shapes: Array<'circle' | 'square' | 'rounded'> = ['circle', 'square', 'rounded']
    shapes.forEach((shape) => {
      const wrapper = mount(JvAvatar, {
        props: {
          shape,
        },
      })
      expect(wrapper.classes()).toContain(`jv-avatar--shape-${shape}`)
    })
  })

  it('applies correct variant class', () => {
    const variants: Array<'filled' | 'outlined'> = ['filled', 'outlined']
    variants.forEach((variant) => {
      const wrapper = mount(JvAvatar, {
        props: {
          variant,
        },
      })
      expect(wrapper.classes()).toContain(`jv-avatar--variant-${variant}`)
    })
  })

  it('applies disabled class when disabled prop is true', () => {
    const wrapper = mount(JvAvatar, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-avatar--disabled')
  })

  it('applies elevated class when elevated prop is true', () => {
    const wrapper = mount(JvAvatar, {
      props: {
        elevated: true,
      },
    })
    expect(wrapper.classes()).toContain('jv-avatar--is-elevated')
  })

  it('does not apply elevated class when elevated prop is false', () => {
    const wrapper = mount(JvAvatar, {
      props: {
        elevated: false,
      },
    })
    expect(wrapper.classes()).not.toContain('jv-avatar--is-elevated')
  })

  it('applies custom class when class prop is provided', () => {
    const wrapper = mount(JvAvatar, {
      props: {
        class: 'my-custom-class',
      },
    })
    expect(wrapper.classes()).toContain('my-custom-class')
  })

  it('applies custom style when style prop is provided', () => {
    const customStyle = { color: 'red', backgroundColor: 'blue' }
    const wrapper = mount(JvAvatar, {
      props: {
        style: customStyle,
      },
    })
    expect(wrapper.attributes('style')).toContain('color: red')
    expect(wrapper.attributes('style')).toContain('background-color: blue')
  })

  it('emits click event when avatar is clicked', async () => {
    const wrapper = mount(JvAvatar)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0][0]).toBeInstanceOf(Event)
  })

  it('does not emit click event when disabled prop is true', async () => {
    const wrapper = mount(JvAvatar, {
      props: {
        disabled: true,
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('renders custom content through default slot', () => {
    const wrapper = mount(JvAvatar, {
      slots: {
        default: '<span data-test="custom-content">Custom Content</span>',
      },
    })
    expect(wrapper.find('[data-test="custom-content"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="custom-content"]').text()).toBe('Custom Content')
  })

  it('renders badge when badge prop is true', () => {
    const wrapper = mount(JvAvatar, {
      props: {
        badge: true,
      },
    })
    expect(wrapper.findComponent({ name: 'JvBadge' }).exists()).toBe(true)
  })

  it('passes badge props correctly when badge prop is an object', () => {
    const badgeProps: JvBadgeProps = {
      value: '99+',
      dot: false,
      placement: 'top-right',
      color: 'error',
    }
    const wrapper = mount(JvAvatar, {
      props: {
        badge: badgeProps,
      },
    })
    const badge = wrapper.findComponent({ name: 'JvBadge' })
    expect(badge.exists()).toBe(true)
    expect(badge.props().value).toBe('99+')
    expect(badge.props().placement).toBe('top-right')
  })

  it('emits load event when image is loaded', async () => {
    const wrapper = mount(JvAvatar, {
      props: {
        image: 'https://example.com/avatar.jpg',
      },
    })

    // 模拟图片加载事件
    await wrapper.findComponent(JvImage).vm.$emit('load', new Event('load'))
    expect(wrapper.emitted('load')).toBeTruthy()
  })

  it('emits error event when image fails to load', async () => {
    const wrapper = mount(JvAvatar, {
      props: {
        image: 'https://example.com/avatar.jpg',
      },
    })

    // 模拟图片加载失败事件
    await wrapper.findComponent(JvImage).vm.$emit('error', new Event('error'))
    expect(wrapper.emitted('error')).toBeTruthy()
    expect(wrapper.emitted('error')?.[0][0]).toBeInstanceOf(Error)
  })
})
