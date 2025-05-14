import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvImage from '../src/JvImage.vue'

describe('jvImage', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'test-image.jpg',
      },
    })

    expect(wrapper.find('.jv-image').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('test-image.jpg')
    expect(wrapper.find('img').attributes('alt')).toBe('')
  })

  it('applies width and height styles correctly', () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'test-image.jpg',
        width: '200px',
        height: '100px',
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('style')).toContain('width: 200px')
    expect(img.attributes('style')).toContain('height: 100px')
  })

  it('applies number width and height as pixels', () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'test-image.jpg',
        width: 200,
        height: 100,
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('style')).toContain('width: 200px')
    expect(img.attributes('style')).toContain('height: 100px')
  })

  it('applies aspectRatio style correctly', () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'test-image.jpg',
        aspectRatio: '16/9',
      },
    })

    expect(wrapper.find('img').attributes('style')).toContain('aspect-ratio: 16/9')
  })

  it('applies fit style correctly', () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'test-image.jpg',
        fit: 'cover',
      },
    })

    expect(wrapper.find('img').attributes('style')).toContain('object-fit: cover')
  })

  it('applies round style correctly', () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'test-image.jpg',
        round: true,
      },
    })

    expect(wrapper.find('img').attributes('style')).toContain('border-radius: 50%')
  })

  it('applies radius style correctly', () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'test-image.jpg',
        radius: '10px',
      },
    })

    expect(wrapper.find('img').attributes('style')).toContain('border-radius: 10px')
  })

  it('applies number radius as pixels', () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'test-image.jpg',
        radius: 10,
      },
    })

    expect(wrapper.find('img').attributes('style')).toContain('border-radius: 10px')
  })

  it('emits load event when image loads', async () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'test-image.jpg',
      },
    })

    await wrapper.find('img').trigger('load')
    expect(wrapper.emitted('load')).toBeTruthy()
  })

  it('emits error event when image fails to load', async () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'invalid-image.jpg',
      },
    })

    await wrapper.find('img').trigger('error')
    expect(wrapper.emitted('error')).toBeTruthy()
  })

  it('uses errorImg when load fails', async () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'invalid-image.jpg',
        errorImg: 'error-image.jpg',
      },
    })

    await wrapper.find('img').trigger('error')
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('error-image.jpg')
  })

  it('renders overlay slot when provided', () => {
    const wrapper = mount(JvImage, {
      props: {
        src: 'test-image.jpg',
      },
      global: {
        stubs: {
          JvOverlay: {
            template: '<div class="jv-overlay"><slot /></div>',
            props: ['target'],
          },
        },
      },
      slots: {
        overlay: '<div class="test-overlay">Overlay Content</div>',
      },
    })

    expect(wrapper.find('.jv-overlay').exists()).toBe(true)
    expect(wrapper.find('.test-overlay').exists()).toBe(true)
    expect(wrapper.find('.test-overlay').text()).toBe('Overlay Content')
  })
})
