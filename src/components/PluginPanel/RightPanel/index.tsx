import SourceSamplesModule from './SourceSamplesModule'
import GranularEngineModule from './GranularEngineModule'
import SonicVibesModule from './SonicVibesModule'

export default function RightPanel() {
  return (
    <div
      className="bg-plug-surface dark:bg-white/5 rounded-lg w-[260px] shrink-0 flex flex-col overflow-hidden"
      style={{ alignSelf: 'stretch' }}
    >
      <SourceSamplesModule />
      <GranularEngineModule />
      <SonicVibesModule />
    </div>
  )
}
