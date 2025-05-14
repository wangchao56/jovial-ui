import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/vue3'
import { beforeAll, expect } from 'vitest'
import * as projectAnnotations from './preview'

// 暴露Vitest的expect断言方法到全局
const project = setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])

globalThis.expect = expect

beforeAll(project.beforeAll)
