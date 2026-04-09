import { Moon, Sun, Flame } from 'lucide-react'
import { useSynth } from '../../../hooks/useSynth'
import type { VibeType } from '../../../types/synth'

const ALL_VIBES: VibeType[] = ['Dark', 'Bright', 'Warm']

const VIBE_ICONS: Record<VibeType, () => JSX.Element> = {
  Dark:   () => <Moon  size={20} strokeWidth={1.5} />,
  Bright: () => <Sun   size={20} strokeWidth={1.5} />,
  Warm:   () => <Flame size={20} strokeWidth={1.5} />,
}

export default function SonicVibesModule() {
  const { state, dispatch } = useSynth()

  const toggle = (vibe: VibeType) => {
    const has = state.sonicVibes.includes(vibe)
    if (has && state.sonicVibes.length <= 1) return
    dispatch({ type: 'TOGGLE_VIBE', vibe })
  }

  return (
    <div className="flex flex-col gap-2 px-3 py-3 flex-1 min-h-0 border-t border-plug-border dark:border-white/[0.07]">
      <p className="font-sans text-[9px] font-semibold uppercase tracking-wider text-plug-text dark:text-white/70 shrink-0">
        Sonic Vibes
      </p>
      <div className="flex gap-1.5 flex-1 min-h-0">
        {ALL_VIBES.map((vibe) => {
          const selected = state.sonicVibes.includes(vibe)
          const Icon = VIBE_ICONS[vibe]
          return (
            <button
              key={vibe}
              onClick={() => toggle(vibe)}
              className={`
                flex-1 flex flex-col items-center justify-center gap-1.5
                rounded-md transition-colors duration-150 cursor-pointer
                ${selected
                  ? 'bg-plug-text dark:bg-white text-white dark:text-plug-text'
                  : 'bg-white dark:bg-black/20 text-plug-text/30 dark:text-white/20 hover:bg-plug-surface dark:hover:bg-white/10'
                }
              `}
            >
              <Icon />
              <span className="font-mono text-[7px] font-medium uppercase tracking-wide leading-none">
                {vibe}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
