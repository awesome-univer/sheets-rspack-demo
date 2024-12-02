/// <reference types="@rspack/core/module" />

import type { FUniver } from '@univerjs/presets'

declare global {
  interface Window {
    univerAPI: FUniver
  }
}

export {}
