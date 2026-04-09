import { useSynth } from '../../hooks/useSynth'
import type { SampleName } from '../../types/synth'

const ALL_SAMPLES: SampleName[] = ['Piano', 'Strings', 'Woodwinds', 'Choir', 'Organ']

export default function SourceSampleSelector() {
  const { state, dispatch } = useSynth()

  const toggle = (sample: SampleName) => {
    const selected = state.sourceSamples.includes(sample)
    if (!selected && state.sourceSamples.length >= 3) return  // max 3
    if (selected && state.sourceSamples.length <= 1) return   // min 1
    dispatch({ type: 'TOGGLE_SAMPLE', sample })
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[9px] text-plug-label dark:text-white/40 tracking-widest uppercase">
          Source Samples
        </p>
        <span className={`font-mono text-[9px] dark:text-white/40 ${state.sourceSamples.length === 3 ? 'text-plug-label' : 'text-amber-500'}`}>
          {state.sourceSamples.length}/3
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ALL_SAMPLES.map((sample) => {
          const selected = state.sourceSamples.includes(sample)
          const maxReached = state.sourceSamples.length >= 3 && !selected
          return (
            <button
              key={sample}
              onClick={() => toggle(sample)}
              disabled={maxReached}
              className={`
                px-2.5 py-[7px] rounded-md text-[9px] font-semibold uppercase tracking-wide
                transition-colors duration-150
                ${selected
                  ? 'bg-plug-text dark:bg-white text-white dark:text-plug-text'
                  : 'bg-plug-surface dark:bg-white/10 text-plug-text dark:text-white/60 hover:bg-plug-muted dark:hover:bg-white/20'
                }
                ${maxReached ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {sample}
            </button>
          )
        })}
      </div>
    </div>
  )
}
