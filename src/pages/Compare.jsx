import { useApp } from '../context/AppContext';
import { X, Check, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Compare.css';

export default function Compare() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { compareList } = state;

  const removeItem = (item) => {
    dispatch({ type: 'TOGGLE_COMPARE', payload: item });
  };

  if (compareList.length === 0) {
    return (
      <div className="compare-page container empty fade-in">
        <AlertCircle size={64} color="var(--text-dim)" />
        <h1>No opportunities to compare</h1>
        <p>Go to the discovery page and add at least two opportunities to see them side-by-side.</p>
        <Link to="/discovery" className="btn-primary">Explore Opportunities</Link>
      </div>
    );
  }

  const features = [
    { label: 'Category', key: 'category' },
    { label: 'Stream', key: 'stream' },
    { label: 'Difficulty', key: 'difficulty' },
    { label: 'Cost', key: 'cost' },
    { label: 'Deadline', key: 'deadline' },
    { label: 'Eligibility', key: 'eligibility' },
    { label: 'Outcomes', key: 'outcomes' }
  ];

  return (
    <div className="compare-page container fade-in">
      <header className="compare-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={20} /> Back
        </button>
        <h1>Compare Opportunities</h1>
        <p>Side-by-side breakdown to help you decide.</p>
      </header>

      <div className="compare-table-wrapper glass-card">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="feature-col">Feature</th>
              {compareList.map(item => (
                <th key={item.id} className="item-col">
                  <div className="item-header">
                    <button className="remove-btn" onClick={() => removeItem(item)}>
                      <X size={16} />
                    </button>
                    <img src={item.image} alt="" className="item-thumb" />
                    <h3>{item.title}</h3>
                    <Link to={`/opportunity/${item.id}`} className="view-link">View Details</Link>
                  </div>
                </th>
              ))}
              {compareList.length < 3 && (
                <th className="add-more-col">
                  <Link to="/discovery" className="add-more glass">
                    <span>+ Add More</span>
                  </Link>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {features.map(feature => (
              <tr key={feature.key}>
                <td className="feature-label">{feature.label}</td>
                {compareList.map(item => (
                  <td key={`${item.id}-${feature.key}`} className="feature-value">
                    {feature.key === 'difficulty' ? (
                      <span className={`diff-badge ${item[feature.key].toLowerCase()}`}>
                        {item[feature.key]}
                      </span>
                    ) : (
                      item[feature.key]
                    )}
                  </td>
                ))}
                {compareList.length < 3 && <td className="empty-cell"></td>}
              </tr>
            ))}
            <tr>
              <td className="feature-label">Bookmarked</td>
              {compareList.map(item => (
                <td key={`${item.id}-bookmarked`} className="feature-value">
                  {state.bookmarks.some(b => b.id === item.id) ? (
                    <Check color="var(--primary)" />
                  ) : (
                    <span className="text-dim">—</span>
                  )}
                </td>
              ))}
              {compareList.length < 3 && <td className="empty-cell"></td>}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
