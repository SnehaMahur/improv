import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Home from './pages/Home'
import StartStory from './pages/StartStory'
import ContinueStory from './pages/ContinueStory'
import StoryView from './pages/StoryView'
import Archive from './pages/Archive'
import NotFound from './pages/NotFound'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* On larger screens, cap the app to a fixed 900-wide rectangle, centered both
          ways, height matched to the Continue-a-Story page's natural content height
          — instead of stretching full browser width/height. Taller pages scroll
          inside the box rather than growing it. */}
      {/* min-h-[100dvh], not min-h-screen: on mobile Chrome, 100vh includes the area
          behind the collapsible address bar that isn't actually visible until the
          user scrolls — sizing to it pushes content (like the homepage footer) below
          the fold from the very first paint. dvh tracks the real visible viewport. */}
      <div className="min-h-[100dvh] w-full flex md:items-center justify-center" style={{ backgroundColor: '#e9ddd2' }}>
        {/* The transform turns this box into the containing block for any descendant
            `position: fixed` elements (sticky composer, full-screen overlays), so they
            stay confined to the box instead of the real browser viewport. flex flex-col
            lets Home/Shell fill it via flex-1 instead of percentage height chains
            (which need every ancestor to have a definite height). */}
        <div
          className="w-full max-w-[900px] md:h-[763px] flex flex-col md:overflow-y-auto"
          style={{ backgroundColor: '#f5ede8', transform: 'translateZ(0)' }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Shell><StartStory /></Shell>} />
            <Route path="/continue" element={<Shell><ContinueStory /></Shell>} />
            <Route path="/story/:id" element={<Shell><StoryView /></Shell>} />
            <Route path="/archive" element={<Shell><Archive /></Shell>} />
            <Route path="*" element={<Shell><NotFound /></Shell>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
