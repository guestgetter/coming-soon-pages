import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import theme from './theme'
import LoadingSpinner from './components/LoadingSpinner'
import PerformanceMonitor from './components/PerformanceMonitor'
import PerformanceOptimizer from './components/PerformanceOptimizer'
import ScrollToTop from './components/ScrollToTop'
import FloatingActionButton from './components/FloatingActionButton'

// Lazy load pages for better performance
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'))
const CuisinePage = lazy(() => import('./pages/CuisinePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const HistoricHospitalityPage = lazy(() => import('./pages/HistoricHospitalityPage'))

function App() {
  return (
    <ChakraProvider theme={theme}>
      <PerformanceMonitor />
      <PerformanceOptimizer />
      <Router>
        <ScrollToTop />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<ComingSoonPage />} />
            <Route path="/menu" element={<CuisinePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/historic-hospitality" element={<HistoricHospitalityPage />} />
          </Routes>
        </Suspense>
        
        {/* GLOBAL FAB - Appears on ALL pages */}
        <FloatingActionButton />
      </Router>
    </ChakraProvider>
  )
}

export default App
