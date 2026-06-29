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
    <div className="min-h-full flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* On larger screens, cap the app to a fixed 800×600 (min) rectangle, centered,
          instead of stretching full browser width — keeps the phone-app feel on desktop. */}
      <div className="min-h-screen w-full flex justify-center" style={{ backgroundColor: '#e9ddd2' }}>
        {/* The transform turns this box into the containing block for any descendant
            `position: fixed` elements (sticky composer, full-screen overlays), so they
            stay confined to the 800×600 box instead of the real browser viewport. */}
        <div className="w-full max-w-[800px] min-h-[600px]" style={{ backgroundColor: '#f5ede8', transform: 'translateZ(0)' }}>
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
