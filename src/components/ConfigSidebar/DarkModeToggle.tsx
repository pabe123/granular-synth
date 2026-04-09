import { useSynth } from '../../hooks/useSynth'

export default function DarkModeToggle() {
  const { state, dispatch } = useSynth()
  const on = state.darkMode

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
      className="bg-plug-surface dark:bg-white/10 rounded-lg px-3 py-2.5 flex items-center justify-between w-full h-[38px] transition-colors"
    >
      <span className="text-[9px] font-semibold uppercase text-plug-text dark:text-white/80">
        Dark mode
      </span>
      {/* Toggle */}
      <div
        className={`
          w-[30px] h-[18px] rounded-full transition-colors flex items-center px-[3px]
          ${on ? 'bg-plug-text' : 'bg-plug-label/30'}
        `}
      >
        <div
          className={`
            w-3 h-3 rounded-full bg-white shadow-sm transition-transform
            ${on ? 'translate-x-3' : 'translate-x-0'}
          `}
        />
      </div>
    </button>
  )
}
