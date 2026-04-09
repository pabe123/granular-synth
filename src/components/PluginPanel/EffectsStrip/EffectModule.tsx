import { useSynth } from '../../../hooks/useSynth'
import KnobControl from '../../shared/KnobControl'
import type { EffectName } from '../../../types/synth'

interface EffectModuleProps {
  effect: EffectName
}

export default function EffectModule({ effect }: EffectModuleProps) {
  const { state, dispatch } = useSynth()
  const params = state.effectParams[effect]

  return (
    <div className="flex flex-col gap-2.5 px-4 py-3 border-r border-b border-plug-border dark:border-white/10 w-1/6 shrink-0 -mr-px -mb-px">
      <p className="font-sans text-[9px] font-semibold uppercase tracking-wider text-plug-text dark:text-white/80">
        {effect}
      </p>
      <div className="flex items-end gap-4">
        <KnobControl
          label="Amt"
          value={params.amount}
          onChange={(val) =>
            dispatch({ type: 'SET_EFFECT_PARAM', effect, key: 'amount', value: val })
          }
          size="xsmall"
        />
        <KnobControl
          label="W/D"
          value={params.wetDry}
          onChange={(val) =>
            dispatch({ type: 'SET_EFFECT_PARAM', effect, key: 'wetDry', value: val })
          }
          size="xsmall"
        />
      </div>
    </div>
  )
}
