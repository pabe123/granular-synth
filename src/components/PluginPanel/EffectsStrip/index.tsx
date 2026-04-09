import { useSynth } from '../../../hooks/useSynth'
import EffectModule from './EffectModule'

export default function EffectsStrip() {
  const { state } = useSynth()
  const { activeEffects } = state

  return (
    <div className="bg-plug-surface dark:bg-white/5 rounded-lg shrink-0 w-full overflow-hidden">
      {activeEffects.length === 0 ? (
        <div className="h-[100px] flex items-center justify-center">
          <p className="font-mono text-[8px] text-plug-label dark:text-white/30 tracking-widest">
            — No effects active —
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap overflow-hidden">
          {activeEffects.map((effect) => (
            <EffectModule key={effect} effect={effect} />
          ))}
        </div>
      )}
    </div>
  )
}
