import React from 'react';
import '../styles/PageTemplate.scss';

const PageTemplate = ({children}) => {
  return (
    <div className="page-template">
      <h1 className="uk-heading-primary uk-margin-medium-bottom">일 정 관 리</h1>
      <div className="uk-container">
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;