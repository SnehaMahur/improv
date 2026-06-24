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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Shell><StartStory /></Shell>} />
        <Route path="/continue" element={<Shell><ContinueStory /></Shell>} />
        <Route path="/story/:id" element={<Shell><StoryView /></Shell>} />
        <Route path="/archive" element={<Shell><Archive /></Shell>} />
        <Route path="*" element={<Shell><NotFound /></Shell>} />
      </Routes>
    </BrowserRouter>
  )
}
