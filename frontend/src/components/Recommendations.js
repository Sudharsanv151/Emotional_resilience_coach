import React from 'react';
import './Recommendations.css';

function Recommendations({ recommendation }) {
  return (
    <section id="recommendations" className="recommendations">
      <h2></h2>
      <div className="recommendation-output">
        {recommendation && <p>{recommendation}</p>}
      </div>
    </section>
  );
}

export default Recommendations;
