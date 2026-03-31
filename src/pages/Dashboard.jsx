import { useApp } from '../context/AppContext';
import { 
  Bookmark, Calendar, TrendingUp, CheckCircle, 
  Clock, ArrowRight, User, Settings, LogOut 
} from 'lucide-react';
import OpportunityCard from '../components/OpportunityCard';
import './Dashboard.css';

export default function Dashboard() {
  const { state } = useApp();
  const { bookmarks } = state;

  // Mock stats
  const stats = [
    { label: 'Saved', value: bookmarks.length, icon: <Bookmark size={20} />, color: 'blue' },
    { label: 'Applications', value: 2, icon: <CheckCircle size={20} />, color: 'emerald' },
    { label: 'Upcoming', value: bookmarks.length, icon: <Clock size={20} />, color: 'rose' },
    { label: 'Growth Score', value: '850', icon: <TrendingUp size={20} />, color: 'purple' }
  ];

  return (
    <div className="dashboard-page container fade-in">
      <header className="dashboard-header">
        <div className="user-profile">
          <div className="avatar glass">
            <User size={32} />
          </div>
          <div className="user-info">
            <h1>Welcome back, Student</h1>
            <p>You have {bookmarks.length} opportunities on your path.</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-icon glass"><Settings size={20} /></button>
          <button className="btn-icon glass"><LogOut size={20} /></button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card glass-card">
            <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
            <div className="stat-details">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </section>

      <div className="dashboard-content-grid">
        {/* Bookmarks Section */}
        <main className="bookmarks-section">
          <div className="section-header">
            <h2><Bookmark size={24} className="blue-text" /> Bookmarked Path</h2>
            <button className="btn-secondary glass">View All</button>
          </div>

          {bookmarks.length > 0 ? (
            <div className="opportunity-grid">
              {bookmarks.map(item => (
                <OpportunityCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="empty-dashboard glass-card">
              <Bookmark size={48} />
              <h3>Your path is empty</h3>
              <p>Explore opportunities and bookmark them to track your growth journey here.</p>
              <button className="btn-primary">Explore Now</button>
            </div>
          )}
        </main>

        {/* Timeline Sidebar */}
        <aside className="timeline-sidebar">
          <div className="glass-card timeline-card">
            <div className="card-header">
              <h3><Calendar size={20} /> Upcoming Deadlines</h3>
            </div>
            <div className="timeline-items">
              {bookmarks.length > 0 ? (
                bookmarks.sort((a,b) => new Date(a.deadline) - new Date(b.deadline)).map(item => (
                  <div key={item.id} className="timeline-item">
                    <div className="timeline-date">
                      <span className="day">{new Date(item.deadline).getDate()}</span>
                      <span className="month">{new Date(item.deadline).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div className="timeline-info">
                      <strong>{item.title}</strong>
                      <span>{item.category} • {item.deadline}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-timeline">No upcoming deadlines.</p>
              )}
            </div>
            {bookmarks.length > 0 && (
              <button className="btn-secondary glass full-width">Add to Google Calendar</button>
            )}
          </div>

          <div className="glass-card resource-card">
            <h3>Recommended Resources</h3>
            <div className="resource-item">
              <div className="res-icon glass"><TrendingUp size={16} /></div>
              <span>How to crack IIT JEE: 2024 Guide</span>
            </div>
            <div className="resource-item">
              <div className="res-icon glass"><TrendingUp size={16} /></div>
              <span>Preparing for NEET: Biology Checklist</span>
            </div>
            <button className="btn-link">View all resources <ArrowRight size={14} /></button>
          </div>
        </aside>
      </div>
    </div>
  );
}
