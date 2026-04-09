import PluginHeader from './PluginHeader'
import SoundVisualisation from './SoundVisualisation'
import RightPanel from './RightPanel'
import EffectsStrip from './EffectsStrip'
import KeyboardModule from './KeyboardModule'

export default function PluginPanel() {
  return (
    <div className="
      bg-white dark:bg-[#1c1c1c]
      border border-plug-border dark:border-white/[0.07]
      rounded-xl flex flex-col flex-1
      min-h-[680px] max-h-[680px]
      overflow-hidden shadow-sm
      transition-colors duration-300
    ">
      <PluginHeader />

      <div className="flex flex-col flex-1 gap-1.5 px-2 pb-2 min-h-0">
        {/* Middle row */}
        <div className="flex gap-1.5 flex-1 min-h-0">
          <SoundVisualisation />
          <RightPanel />
        </div>

        {/* Effects strip */}
        <EffectsStrip />

        {/* Keyboard */}
        <KeyboardModule />
      </div>
    </div>
  )
}
