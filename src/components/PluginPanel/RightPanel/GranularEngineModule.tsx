import { useSynth } from '../../../hooks/useSynth'
import KnobControl from '../../shared/KnobControl'
import type { GranularParams } from '../../../types/synth'

const PARAMS: { key: keyof GranularParams; label: string }[] = [
  { key: 'size',  label: 'Size' },
  { key: 'dens',  label: 'Dens' },
  { key: 'pos',   label: 'Pos' },
  { key: 'pitch', label: 'Pitch' },
]

export default function GranularEngineModule() {
  const { state, dispatch } = useSynth()

  return (
    <div className="flex flex-col gap-2.5 px-3 py-3 border-t border-plug-border dark:border-white/[0.07]">
      <p className="font-sans text-[9px] font-semibold uppercase tracking-wider text-plug-text dark:text-white/70">
        Granular Engine
      </p>
      <div className="grid grid-cols-4 gap-1 w-full">
        {PARAMS.map(({ key, label }) => (
          <KnobControl
            key={key}
            label={label}
            value={state.granularParams[key]}
            onChange={(val) =>
              dispatch({ type: 'SET_GRANULAR_PARAM', key, value: val })
            }
            size="small"
          />
        ))}
      </div>
    </div>
  )
}
