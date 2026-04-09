export type VibeType = 'Dark' | 'Bright' | 'Warm'

export type SampleName = 'Piano' | 'Strings' | 'Woodwinds' | 'Choir' | 'Organ'

export type EffectName =
  | 'Reverb'
  | 'Delay'
  | 'Distortion'
  | 'Chorus'
  | 'Phaser'
  | 'Flanger'
  | 'Compressor'
  | 'EQ'
  | 'Filter'
  | 'Bitcrush'
  | 'Tremolo'
  | 'Saturation'

export interface GranularParams {
  size: number
  dens: number
  pos: number
  pitch: number
}

export interface EffectParams {
  amount: number
  wetDry: number
}

export interface SynthState {
  sonicVibes: VibeType[]
  sourceSamples: SampleName[]
  activeEffects: EffectName[]
  granularParams: GranularParams
  effectParams: Record<EffectName, EffectParams>
  darkMode: boolean
  activeNotes: number[]
}

export type SynthAction =
  | { type: 'TOGGLE_VIBE'; vibe: VibeType }
  | { type: 'TOGGLE_SAMPLE'; sample: SampleName }
  | { type: 'SWAP_SAMPLE'; from: SampleName; to: SampleName }
  | { type: 'TOGGLE_EFFECT'; effect: EffectName }
  | { type: 'SET_GRANULAR_PARAM'; key: keyof GranularParams; value: number }
  | { type: 'SET_EFFECT_PARAM'; effect: EffectName; key: keyof EffectParams; value: number }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_ACTIVE_NOTES'; notes: number[] }
