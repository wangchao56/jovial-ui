// Utilities
import { warn } from 'vue'

export function consoleWarn(message: string): void {
  warn(`Jovial: ${message}`)
}

export function consoleError(message: string): void {
  warn(`Jovial error: ${message}`)
}
