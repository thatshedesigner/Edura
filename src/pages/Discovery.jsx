import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid, List as ListIcon, X, ChevronRight } from 'lucide-react';
import { OPPORTUNITIES, CATEGORIES, STREAMS } from '../data/opportunities';
import OpportunityCard from '../components/OpportunityCard';
import './Discovery.jsx.css';

export default function Discovery() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStream, setActiveStream] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [viewType, setViewType] = useState('grid'); // grid or list

  const filteredOpportunities = useMemo(() => {
    return OPPORTUNITIES.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchStream = activeStream === 'All' || item.stream === activeStream || item.stream === 'All Streams';
      return matchSearch && matchCategory && matchStream;
    });
  }, [search, activeCategory, activeStream]);

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('All');
    setActiveStream('All');
  };

  return (
    <div className="discovery-page container fade-in">
      {/* Header & Search */}
      <header className="discovery-header">
        <div className="header-text">
          <h1>Find Your Next Step</h1>
          <p>Explore {OPPORTUNITIES.length} opportunities curated for your growth.</p>
        </div>
        
        <div className="discovery-controls">
          <div className="search-box glass">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by title, skills, or tags..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <X size={18} className="clear-search" onClick={() => setSearch('')} />}
          </div>
          
          <div className="view-toggle glass">
            <button 
              className={viewType === 'grid' ? 'active' : ''} 
              onClick={() => setViewType('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={viewType === 'list' ? 'active' : ''} 
              onClick={() => setViewType('list')}
            >
              <ListIcon size={18} />
            </button>
          </div>

          <button 
            className={`filter-toggle btn-primary ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>
      </header>

      <div className="discovery-content">
        {/* Sidebar Filters */}
        <aside className={`filter-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filter-group">
            <h3>Category</h3>
            <div className="filter-options">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Stream</h3>
            <div className="filter-options">
              {STREAMS.map(stream => (
                <button 
                  key={stream} 
                  className={`filter-pill ${activeStream === stream ? 'active' : ''}`}
                  onClick={() => setActiveStream(stream)}
                >
                  {stream}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Deadline</h3>
            <div className="filter-options">
              <label className="checkbox-item">
                <input type="checkbox" />
                <span>Closing Soon (&lt; 7 days)</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" />
                <span>Apply Anytime</span>
              </label>
            </div>
          </div>

          <button className="clear-all" onClick={clearFilters}>Clear All Filters</button>
        </aside>

        {/* Results Area */}
        <main className="results-area">
          <div className="results-header">
            <span>Showing <strong>{filteredOpportunities.length}</strong> results</span>
            <div className="sort-control">
              <span>Sort by:</span>
              <select className="glass">
                <option>Newest First</option>
                <option>Deadline</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          {filteredOpportunities.length > 0 ? (
            <div className={`opportunity-${viewType}`}>
              {filteredOpportunities.map(item => (
                <OpportunityCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="empty-results glass-card">
              <Search size={48} />
              <h2>No results found</h2>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
              <button className="btn-primary" onClick={clearFilters}>Reset All Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
