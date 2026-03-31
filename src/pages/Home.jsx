import { useState } from 'react';
import { Search, ArrowRight, TrendingUp, Sparkles, BookOpen, Target, Award } from 'lucide-react';
import { OPPORTUNITIES, CATEGORIES } from '../data/opportunities';
import OpportunityCard from '../components/OpportunityCard';
import './Home.css';

export default function Home() {
  const [selectedInterest, setSelectedInterest] = useState('All');
  
  const interests = ['All', 'Engineering', 'Medical', 'Data Science', 'Design', 'Computer Science'];
  
  const recommended = OPPORTUNITIES.slice(0, 3);
  const trending = OPPORTUNITIES.slice(3, 7);

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-badge animate-fade">
            <Sparkles size={16} />
            <span>Discover your future today</span>
          </div>
          <h1 className="hero-title animate-fade">
            Your bridge from <span className="text-grad">confusion</span> to <span className="text-grad">clarity</span>.
          </h1>
          <p className="hero-subtitle animate-fade">
            Explore, compare, and track the best exams, internships, and courses tailored for your growth journey.
          </p>

          <div className="hero-search glass animate-fade">
            <Search className="search-icon" />
            <input type="text" placeholder="Search for 'JEE Advanced', 'Google UI/UX', 'Scholarships'..." />
            <button className="btn-primary">Search</button>
          </div>

          <div className="hero-stats animate-fade">
            <div className="stat-item">
              <span className="stat-value">500+</span>
              <span className="stat-label">Opportunities</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">50K+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">100+</span>
              <span className="stat-label">Educators</span>
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </section>

      {/* Interests / Categories */}
      <section className="category-section container">
        <div className="section-header">
          <h2 className="section-title">Explore by Interest</h2>
          <p className="section-subtitle">Tailor your discovery based on what drives you.</p>
        </div>
        <div className="interest-chips">
          {interests.map(interest => (
            <button 
              key={interest}
              className={`interest-chip ${selectedInterest === interest ? 'active' : ''}`}
              onClick={() => setSelectedInterest(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="recommendation-section container">
        <div className="section-header">
          <div className="header-left">
            <h2 className="section-title">Recommended for You</h2>
            <p className="section-subtitle">Based on your interests in {selectedInterest}.</p>
          </div>
          <button className="view-all">
            View All <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="opportunity-grid">
          {recommended.map(item => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="category-grid-section container">
        <div className="category-grid">
          <div className="category-card glass-card">
            <BookOpen className="cat-icon rose" />
            <h3>Entrance Exams</h3>
            <p>National & state-level competitive exams.</p>
            <span className="count">120+ Listed</span>
          </div>
          <div className="category-card glass-card">
            <Target className="cat-icon blue" />
            <h3>Internships</h3>
            <p>Gather industry experience early.</p>
            <span className="count">85+ Active</span>
          </div>
          <div className="category-card glass-card">
            <Award className="cat-icon purple" />
            <h3>Scholarships</h3>
            <p>Financial support for bright minds.</p>
            <span className="count">40+ Available</span>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="trending-section container">
        <div className="section-header">
          <div className="header-left">
            <h2 className="section-title"><TrendingUp size={24} className="icon-grad" /> Trending Now</h2>
            <p className="section-subtitle">Opportunities with deadlines approaching soon.</p>
          </div>
        </div>
        
        <div className="opportunity-grid">
          {trending.map(item => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="cta-section container">
        <div className="glass-card cta-content">
          <h2>Ready to track your growth?</h2>
          <p>Join 50,000+ students who use Edura to stay ahead of deadlines and compare their best options.</p>
          <div className="cta-buttons">
            <button className="btn-primary">Get Started for Free</button>
            <button className="btn-secondary glass">Browse Educators</button>
          </div>
        </div>
      </section>
    </div>
  );
}
