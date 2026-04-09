import SonicVibesSelector from './SonicVibesSelector'
import SourceSampleSelector from './SourceSampleSelector'
import EffectsToggleList from './EffectsToggleList'
import DarkModeToggle from './DarkModeToggle'

export default function ConfigSidebar() {
  return (
    <aside className="
      bg-white dark:bg-[#1c1c1c]
      rounded-xl p-3 w-[220px] shrink-0
      min-h-[680px] max-h-[680px]
      flex flex-col
      shadow-sm transition-colors duration-300
      overflow-hidden
    ">
      {/* Scrollable content */}
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto scrollbar-none pr-0.5">
        <p className="font-mono text-[9px] text-plug-label dark:text-white/40 tracking-widest uppercase">
          GS-01 CONFIG
        </p>
        <div className="h-px bg-plug-label opacity-20 w-full shrink-0" />
        <SonicVibesSelector />
        <SourceSampleSelector />
        <EffectsToggleList />
        {/* spacer so toggle is always at bottom */}
        <div className="flex-1 min-h-4" />
      </div>

      {/* Always-visible dark mode toggle */}
      <div className="pt-2 shrink-0">
        <DarkModeToggle />
      </div>
    </aside>
  )
}
