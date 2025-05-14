import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvCollapse from '../src/JvCollapse.vue'

describe('jvCollapse', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvCollapse)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
