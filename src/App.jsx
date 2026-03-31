import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Discovery from './pages/Discovery';
import Compare from './pages/Compare';
import OpportunityDetail from './pages/OpportunityDetail';
import Dashboard from './pages/Dashboard';
import Educators from './pages/Educators';

// Components
import Navbar from './components/Navbar';
import CompareDrawer from './components/CompareDrawer';
import AIChat from './components/AIChat';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-shell">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discovery" element={<Discovery />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/opportunity/:id" element={<OpportunityDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/educators" element={<Educators />} />
            </Routes>
          </main>
          <CompareDrawer />
          <AIChat />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
