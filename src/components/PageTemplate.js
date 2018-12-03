import React from 'react';
import '../styles/PageTemplate.scss';

const PageTemplate = ({children}) => {
  return (
    <div className="page-template">
      <div className="contents">
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;