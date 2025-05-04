import { setProjectAnnotations } from '@storybook/vue3'
import { beforeAll, expect } from 'vitest'
import * as projectAnnotations from './preview'

// 暴露Vitest的expect断言方法到全局
const project = setProjectAnnotations([projectAnnotations])

globalThis.expect = expect

beforeAll(project.beforeAll)
