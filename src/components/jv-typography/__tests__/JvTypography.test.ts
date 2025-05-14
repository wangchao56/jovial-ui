import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvTypography from '../src/JvTypography.vue'

describe('jvTypography', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvTypography)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
