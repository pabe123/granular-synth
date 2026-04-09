import { useSynth } from './hooks/useSynth'
import ConfigSidebar from './components/ConfigSidebar'
import PluginPanel from './components/PluginPanel'

function App() {
  const { state } = useSynth()

  return (
    <div className={`flex gap-5 items-start w-full max-w-[1100px] transition-colors duration-300 ${state.darkMode ? 'dark' : ''}`}>
      <ConfigSidebar />
      <PluginPanel />
    </div>
  )
}

export default App
