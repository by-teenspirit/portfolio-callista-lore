import { createContext } from 'react'
import { type DarkModeCtx } from './darkModeConstant'

export const DarkModeContext = createContext<DarkModeCtx | null>(null)
