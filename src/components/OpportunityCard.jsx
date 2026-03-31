import { Link } from 'react-router-dom';
import { Star, Calendar, ArrowRight, Bookmark, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './OpportunityCard.css';

export default function OpportunityCard({ item }) {
  const { state, dispatch } = useApp();
  
  const isBookmarked = state.bookmarks.some(b => b.id === item.id);
  const isInCompare = state.compareList.some(c => c.id === item.id);

  const toggleBookmark = (e) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: item });
  };

  const toggleCompare = (e) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_COMPARE', payload: item });
  };

  const getBadgeClass = (category) => {
    switch(category) {
      case 'Exams': return 'badge-rose';
      case 'Courses': return 'badge-blue';
      case 'Internships': return 'badge-emerald';
      case 'Scholarships': return 'badge-purple';
      default: return 'badge-blue';
    }
  };

  return (
    <div className="card-container glass-card">
      <Link to={`/opportunity/${item.id}`} className="card-link">
        <div className="card-image-wrapper">
          <img src={item.image} alt={item.title} className="card-image" />
          <div className="card-overlay">
            <span className={`badge ${getBadgeClass(item.category)}`}>{item.category}</span>
            <div className="card-actions">
              <button 
                className={`action-btn ${isBookmarked ? 'active' : ''}`} 
                onClick={toggleBookmark}
                title="Bookmark"
              >
                <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
              </button>
              <button 
                className={`action-btn ${isInCompare ? 'active' : ''}`} 
                onClick={toggleCompare}
                title="Add to Compare"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">{item.title}</h3>
            <div className="card-rating">
              <Star size={14} fill="#fbbf24" color="#fbbf24" />
              <span>{item.rating}</span>
            </div>
          </div>
          
          <p className="card-description">{item.description.substring(0, 80)}...</p>
          
          <div className="card-meta">
            <div className="meta-item">
              <Calendar size={14} />
              <span>Ends: {item.deadline}</span>
            </div>
            <div className="meta-cost">{item.cost}</div>
          </div>

          <div className="card-footer">
            <span className="card-stream">{item.stream}</span>
            <span className="view-more">
              Details <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
