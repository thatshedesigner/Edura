import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Award, Target, Info, CheckCircle, 
  Share2, Bookmark, Plus, Star, MapPin, Globe, Clock 
} from 'lucide-react';
import { OPPORTUNITIES } from '../data/opportunities';
import { useApp } from '../context/AppContext';
import OpportunityCard from '../components/OpportunityCard';
import './OpportunityDetail.css';

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  
  const item = OPPORTUNITIES.find(o => o.id === id);
  
  if (!item) {
    return (
      <div className="detail-page container empty">
        <h1>Opportunity not found</h1>
        <button className="btn-primary" onClick={() => navigate('/discovery')}>Go back to Discovery</button>
      </div>
    );
  }

  const isBookmarked = state.bookmarks.some(b => b.id === item.id);
  const isInCompare = state.compareList.some(c => c.id === item.id);

  const related = OPPORTUNITIES.filter(o => o.category === item.category && o.id !== item.id).slice(0, 3);

  return (
    <div className="detail-page fade-in">
      {/* Detail Hero */}
      <section className="detail-hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${item.image})` }}></div>
        <div className="hero-overlay"></div>
        
        <div className="container hero-content">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} /> Back to Search
          </button>
          
          <div className="hero-grid">
            <div className="hero-info">
              <span className={`badge badge-large ${item.category.toLowerCase()}`}>{item.category}</span>
              <h1 className="detail-title">{item.title}</h1>
              <div className="title-meta">
                <div className="rating">
                  <Star fill="#fbbf24" color="#fbbf24" size={16} />
                  <span>{item.rating}</span>
                </div>
                <span>•</span>
                <span>{item.stream}</span>
                <span>•</span>
                <span className="deadline-badge">
                  <Clock size={14} /> Deadline: {item.deadline}
                </span>
              </div>
            </div>
            
            <div className="hero-actions-container">
              <div className="glass-card action-card">
                <div className="price-tag">
                  <span className="price-label">Registration Cost</span>
                  <span className="price-value">{item.cost}</span>
                </div>
                <div className="action-buttons">
                  <button className="btn-primary full-width">Apply Now</button>
                  <div className="secondary-actions">
                    <button 
                      className={`btn-icon glass ${isBookmarked ? 'active' : ''}`}
                      onClick={() => dispatch({ type: 'TOGGLE_BOOKMARK', payload: item })}
                    >
                      <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                    <button 
                      className={`btn-icon glass ${isInCompare ? 'active' : ''}`}
                      onClick={() => dispatch({ type: 'TOGGLE_COMPARE', payload: item })}
                    >
                      <Plus size={20} />
                    </button>
                    <button className="btn-icon glass">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container detail-content-grid">
        <main className="main-info">
          <section className="info-block">
            <h2 className="block-title"><Info size={24} /> Overview</h2>
            <p className="description-text">{item.description}</p>
          </section>

          <section className="info-block">
            <h2 className="block-title"><Target size={24} /> Eligibility</h2>
            <div className="eligibility-box glass">
              <CheckCircle size={20} className="check-icon" />
              <p>{item.eligibility}</p>
            </div>
          </section>

          <section className="info-block">
            <h2 className="block-title"><Award size={24} /> Outcomes & Benefits</h2>
            <p className="outcomes-text">{item.outcomes}</p>
          </section>

          <section className="info-block">
            <h2 className="block-title">Key Tags</h2>
            <div className="tag-cloud">
              {item.tags.map(tag => (
                <span key={tag} className="tag-pill glass">{tag}</span>
              ))}
            </div>
          </section>
        </main>

        <aside className="sidebar-info">
          <div className="glass-card timeline-card">
            <h3>Timeline & Location</h3>
            <div className="sidebar-link">
              <Calendar size={18} />
              <div>
                <strong>Deadline</strong>
                <span>{item.deadline}</span>
              </div>
            </div>
            <div className="sidebar-link">
              <Globe size={18} />
              <div>
                <strong>Location</strong>
                <span>National (India)</span>
              </div>
            </div>
            <div className="sidebar-link">
              <MapPin size={18} />
              <div>
                <strong>Mode</strong>
                <span>Online / Offline</span>
              </div>
            </div>
          </div>

          <div className="glass-card help-card">
            <h3>Need Help?</h3>
            <p>Unsure if this fits your profile? Ask our AI assistant.</p>
            <button className="btn-secondary glass full-width">Ask Edura AI</button>
          </div>
        </aside>
      </div>

      {/* Related Opportunities */}
      <section className="related-section container">
        <h2 className="section-title">Related Opportunities</h2>
        <div className="opportunity-grid">
          {related.map(rel => (
            <OpportunityCard key={rel.id} item={rel} />
          ))}
        </div>
      </section>
    </div>
  );
}
