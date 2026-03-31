import { X, ArrowRight, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './CompareDrawer.css';

export default function CompareDrawer() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  
  if (state.compareList.length === 0) return null;

  const handleRemove = (item) => {
    dispatch({ type: 'TOGGLE_COMPARE', payload: item });
  };

  const handleCompare = () => {
    navigate('/compare');
  };

  return (
    <div className="compare-drawer-overlay">
      <div className="compare-drawer container glass">
        <div className="drawer-info">
          <div className="drawer-icon">
            <BarChart2 size={24} />
          </div>
          <div className="drawer-text">
            <h3>Compare Opportunities</h3>
            <p>{state.compareList.length} of 3 items selected</p>
          </div>
        </div>

        <div className="drawer-items">
          {state.compareList.map(item => (
            <div key={item.id} className="drawer-item glass-card">
              <img src={item.image} alt="" />
              <span className="item-title">{item.title}</span>
              <button className="remove-item" onClick={() => handleRemove(item)}>
                <X size={14} />
              </button>
            </div>
          ))}
          
          {state.compareList.length < 3 && (
            <div className="drawer-item-placeholder glass">
              <span>Select another...</span>
            </div>
          )}
        </div>

        <div className="drawer-actions">
          <button className="btn-secondary glass" onClick={() => dispatch({ type: 'CLEAR_COMPARE' })}>
            Clear All
          </button>
          <button 
            className="btn-primary" 
            disabled={state.compareList.length < 2}
            onClick={handleCompare}
          >
            Compare Now <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
