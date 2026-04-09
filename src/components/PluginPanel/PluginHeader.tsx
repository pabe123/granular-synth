import { useSynth } from '../../hooks/useSynth'

export default function PluginHeader() {
  const { state } = useSynth()

  return (
    <div className="flex items-center justify-between px-2 py-3 shrink-0">
      <p className="font-mono text-[9px] text-plug-label dark:text-white/40 tracking-widest uppercase">
        Granular-Synth
      </p>
      {/* Active vibes indicators */}
      <div className="flex gap-1">
        {state.sonicVibes.map((vibe) => (
          <span
            key={vibe}
            className="font-mono text-[8px] text-plug-label dark:text-white/40 uppercase tracking-widest"
          >
            {vibe}
          </span>
        ))}
      </div>
    </div>
  )
}
