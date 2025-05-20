import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvBreadcrumbs from '../src/JvBreadcrumbs.vue'

describe('jvBreadcrumbs', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JvBreadcrumbs)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
