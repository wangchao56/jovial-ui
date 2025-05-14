import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvPopper from '../src/JvPopper.vue'

describe('jvPopper', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvPopper)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
