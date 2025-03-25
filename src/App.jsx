import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-gradient-to-r from-pokemon-red to-pokemon-blue text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                  <img src="/pokeball.png" alt="Pokéball" className="w-8 h-8 animate-bounce-slow" />
                  <h1 className="text-2xl font-bold">Pokédex</h1>
                </Link>
              </div>
            </div>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokemon/:name" element={<Detail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App
