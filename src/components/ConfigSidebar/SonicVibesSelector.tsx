import { useSynth } from '../../hooks/useSynth'
import type { VibeType } from '../../types/synth'

const VIBES: VibeType[] = ['Dark', 'Bright', 'Warm']

export default function SonicVibesSelector() {
  const { state, dispatch } = useSynth()

  return (
    <div className="flex flex-col gap-2.5">
      <p className="font-mono text-[9px] text-plug-label dark:text-white/40 tracking-widest uppercase">
        Sonic Vibes
      </p>
      <div className="flex gap-1.5">
        {VIBES.map((vibe) => {
          const active = state.sonicVibes.includes(vibe)
          return (
            <button
              key={vibe}
              onClick={() => dispatch({ type: 'TOGGLE_VIBE', vibe })}
              className={`
                px-2.5 py-[7px] rounded-md text-[9px] font-semibold uppercase tracking-wide
                transition-colors duration-150
                ${active
                  ? 'bg-plug-text dark:bg-white text-white dark:text-plug-text'
                  : 'bg-plug-surface dark:bg-white/10 text-plug-text dark:text-white/60 hover:bg-plug-muted dark:hover:bg-white/20'
                }
              `}
            >
              {vibe}
            </button>
          )
        })}
      </div>
    </div>
  )
}
