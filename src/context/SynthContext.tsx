import { createContext, useContext, useReducer, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { SynthState, SynthAction, EffectName } from '../types/synth'

const ALL_EFFECTS: EffectName[] = [
  'Reverb', 'Delay', 'Distortion', 'Chorus', 'Phaser', 'Flanger',
  'Compressor', 'EQ', 'Filter', 'Bitcrush', 'Tremolo', 'Saturation',
]

const defaultEffectParams = Object.fromEntries(
  ALL_EFFECTS.map((e) => [e, { amount: 50, wetDry: 50 }])
) as Record<EffectName, { amount: number; wetDry: number }>

const initialState: SynthState = {
  sonicVibes: ['Warm'],
  sourceSamples: ['Piano', 'Strings', 'Woodwinds'],
  activeEffects: ['Reverb', 'Delay', 'Chorus'],
  granularParams: { size: 50, dens: 50, pos: 50, pitch: 50 },
  effectParams: {
    ...defaultEffectParams,
    Reverb: { amount: 40, wetDry: 30 },
    Delay: { amount: 35, wetDry: 45 },
    Chorus: { amount: 60, wetDry: 40 },
  },
  darkMode: false,
  activeNotes: [],
}

function synthReducer(state: SynthState, action: SynthAction): SynthState {
  switch (action.type) {
    case 'TOGGLE_VIBE': {
      const has = state.sonicVibes.includes(action.vibe)
      if (has && state.sonicVibes.length === 1) return state // keep at least 1
      return {
        ...state,
        sonicVibes: has
          ? state.sonicVibes.filter((v) => v !== action.vibe)
          : [...state.sonicVibes, action.vibe],
      }
    }
    case 'TOGGLE_SAMPLE': {
      const has = state.sourceSamples.includes(action.sample)
      if (!has && state.sourceSamples.length >= 3) return state // max 3
      if (has && state.sourceSamples.length <= 1) return state // min 1
      return {
        ...state,
        sourceSamples: has
          ? state.sourceSamples.filter((s) => s !== action.sample)
          : [...state.sourceSamples, action.sample],
      }
    }
    case 'SWAP_SAMPLE':
      return {
        ...state,
        sourceSamples: state.sourceSamples.map((s) =>
          s === action.from ? action.to : s
        ),
      }
    case 'TOGGLE_EFFECT': {
      const has = state.activeEffects.includes(action.effect)
      return {
        ...state,
        activeEffects: has
          ? state.activeEffects.filter((e) => e !== action.effect)
          : [...state.activeEffects, action.effect],
      }
    }
    case 'SET_GRANULAR_PARAM':
      return {
        ...state,
        granularParams: { ...state.granularParams, [action.key]: action.value },
      }
    case 'SET_EFFECT_PARAM':
      return {
        ...state,
        effectParams: {
          ...state.effectParams,
          [action.effect]: {
            ...state.effectParams[action.effect],
            [action.key]: action.value,
          },
        },
      }
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode }
    case 'SET_ACTIVE_NOTES':
      return { ...state, activeNotes: action.notes }
    default:
      return state
  }
}

interface SynthContextValue {
  state: SynthState
  dispatch: React.Dispatch<SynthAction>
}

const SynthContext = createContext<SynthContextValue | null>(null)

export function SynthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(synthReducer, initialState)

  // Sync dark mode class on root
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [state.darkMode])

  return (
    <SynthContext.Provider value={{ state, dispatch }}>
      {children}
    </SynthContext.Provider>
  )
}

export function useSynth() {
  const ctx = useContext(SynthContext)
  if (!ctx) throw new Error('useSynth must be used inside SynthProvider')
  return ctx
}
