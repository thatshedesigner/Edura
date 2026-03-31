import { EDUCATORS } from '../data/educators';
import { Star, MessageSquare, BookOpen, Search, ArrowRight } from 'lucide-react';
import './Educators.css';

export default function Educators() {
  return (
    <div className="educators-page container fade-in">
      <header className="page-header">
        <div className="header-text">
          <h1>Discover Mentors</h1>
          <p>Learn from the best educators and industry experts who shape the future.</p>
        </div>
        
        <div className="search-bar glass">
          <Search size={22} className="search-icon" />
          <input type="text" placeholder="Search educators, subjects, or expertise..." />
          <button className="btn-primary">Search</button>
        </div>
      </header>

      <section className="educators-grid">
        {EDUCATORS.map(edu => (
          <div key={edu.id} className="educator-card glass-card">
            <div className="card-top">
              <img src={edu.image} alt={edu.name} className="edu-avatar" />
              <div className="edu-meta">
                <h3>{edu.name}</h3>
                <span className="edu-spec">{edu.specialization}</span>
                <div className="edu-rating">
                  <Star fill="#fbbf24" color="#fbbf24" size={14} />
                  <span>{edu.rating}</span>
                </div>
              </div>
            </div>
            
            <p className="edu-desc">{edu.description}</p>
            
            <div className="edu-subjects">
              {edu.subjects.map(sub => (
                <span key={sub} className="sub-pill glass">{sub}</span>
              ))}
            </div>

            <div className="edu-stats">
              <div className="edu-stat">
                <BookOpen size={16} />
                <span>{edu.coursesCount} Courses</span>
              </div>
              <div className="edu-stat">
                <MessageSquare size={16} />
                <span>24/7 Support</span>
              </div>
            </div>

            <div className="edu-actions">
              <button className="btn-secondary glass full-width">View Profile</button>
              <button className="btn-primary full-width">Connect Now</button>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Resources Section */}
      <section className="featured-resources">
        <div className="section-header">
          <h2>Popular Resources</h2>
          <button className="btn-link">Browse All Resources <ArrowRight size={16} /></button>
        </div>
        
        <div className="resource-grid">
          <div className="resource-item glass-card">
            <div className="res-image-placeholder glass">
              <BookOpen size={32} />
            </div>
            <div className="res-content">
              <h4>JEE Main 2024 Strategy</h4>
              <p>By Alakh Pandey • 1.2M Views</p>
            </div>
          </div>
          <div className="resource-item glass-card">
            <div className="res-image-placeholder glass">
              <BookOpen size={32} />
            </div>
            <div className="res-content">
              <h4>Mastering React & Vite</h4>
              <p>By Angela Yu • 450K Views</p>
            </div>
          </div>
          <div className="resource-item glass-card">
            <div className="res-image-placeholder glass">
              <BookOpen size={32} />
            </div>
            <div className="res-content">
              <h4>Data Science Roadmap</h4>
              <p>By Andrew Ng • 890K Views</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mentorship-cta glass-card">
        <div className="cta-head">
          <h2>Become a Mentor</h2>
          <p>Share your knowledge and help students navigate their educational journey.</p>
        </div>
        <button className="btn-primary">Apply as Educator</button>
      </section>
    </div>
  );
}
