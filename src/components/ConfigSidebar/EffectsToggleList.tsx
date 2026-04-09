import { useSynth } from '../../hooks/useSynth'
import type { EffectName } from '../../types/synth'

const ALL_EFFECTS: EffectName[] = [
  'Reverb', 'Delay', 'Distortion', 'Chorus',
  'Phaser', 'Flanger', 'Compressor', 'EQ',
  'Filter', 'Bitcrush', 'Tremolo', 'Saturation',
]

export default function EffectsToggleList() {
  const { state, dispatch } = useSynth()

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[9px] text-plug-label dark:text-white/40 tracking-widest uppercase">
          Effects
        </p>
        <span className="font-mono text-[9px] text-plug-label dark:text-white/40">
          {state.activeEffects.length} active
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ALL_EFFECTS.map((effect) => {
          const active = state.activeEffects.includes(effect)
          return (
            <button
              key={effect}
              onClick={() => dispatch({ type: 'TOGGLE_EFFECT', effect })}
              className={`
                px-2.5 py-[7px] rounded-md text-[9px] font-semibold uppercase tracking-wide
                transition-colors duration-150
                ${active
                  ? 'bg-plug-text dark:bg-white text-white dark:text-plug-text'
                  : 'bg-plug-surface dark:bg-white/10 text-plug-text dark:text-white/60 hover:bg-plug-muted dark:hover:bg-white/20'
                }
              `}
            >
              {effect}
            </button>
          )
        })}
      </div>
    </div>
  )
}
