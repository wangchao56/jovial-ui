import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvDropdown from '../src/JvDropdown.vue'

describe('jvDropdown', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvDropdown)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
