import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JvEditer from '../src/JvEditer.vue'

describe('jv-editer', () => {
  it('ed-01-基础渲染', () => {
    const wrapper = mount(JvEditer)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('ed-02-工具区渲染', () => {
    const wrapper = mount(JvEditer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
