import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './Section.scss';

const Section = ({ title, rows, className }) => (
  <div className={`section-container ${className}`}>
    <section>{title}</section>
    <div className="section-row-containers">
      {
        rows.map(({ icon, label, component }, index) => (
          <div key={`section-${index.toString()}`} className="section-row">
            {icon && <Icon path={icon} />}
            <div>
              {label && <span>{label}</span>}
              {component}
            </div>
          </div>
        ))
      }
    </div>
  </div>
);

Section.defaultProps = {
  className: ''
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string,
    component: PropTypes.node
  })).isRequired
};

export default Section;
