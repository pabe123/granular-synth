import { Piano, Guitar, Wind, Mic, Music } from 'lucide-react'
import { useSynth } from '../../../hooks/useSynth'
import type { SampleName } from '../../../types/synth'

const ALL_SAMPLES: SampleName[] = ['Piano', 'Strings', 'Woodwinds', 'Choir', 'Organ']

const SAMPLE_ICONS: Record<SampleName, () => JSX.Element> = {
  Piano:     () => <Piano     size={20} strokeWidth={1.5} />,
  Strings:   () => <Guitar    size={20} strokeWidth={1.5} />,
  Woodwinds: () => <Wind      size={20} strokeWidth={1.5} />,
  Choir:     () => <Mic       size={20} strokeWidth={1.5} />,
  Organ:     () => <Music     size={20} strokeWidth={1.5} />,
}

export default function SourceSamplesModule() {
  const { state, dispatch } = useSynth()

  const cycleSample = (sample: SampleName) => {
    const unselected = ALL_SAMPLES.filter(s => !state.sourceSamples.includes(s))
    if (unselected.length === 0) return
    const idx = ALL_SAMPLES.indexOf(sample)
    let next = unselected[0]
    for (const u of unselected) {
      if (ALL_SAMPLES.indexOf(u) > idx) { next = u; break }
    }
    dispatch({ type: 'SWAP_SAMPLE', from: sample, to: next })
  }

  return (
    <div className="flex flex-col gap-2 px-3 py-3 flex-1 min-h-0">
      <p className="font-sans text-[9px] font-semibold uppercase tracking-wider text-plug-text dark:text-white/70 shrink-0">
        Source Samples
      </p>
      <div className="flex gap-1.5 flex-1 min-h-0">
        {state.sourceSamples.map((sample) => {
          const Icon = SAMPLE_ICONS[sample]
          return (
            <button
              key={sample}
              onClick={() => cycleSample(sample)}
              className="flex-1 flex flex-col items-center justify-center gap-1.5 rounded-md cursor-pointer transition-colors duration-150 bg-plug-text dark:bg-white text-white dark:text-plug-text"
            >
              <Icon />
              <span className="font-mono text-[7px] font-medium uppercase tracking-wide leading-none">
                {sample}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
