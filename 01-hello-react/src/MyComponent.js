// import React from 'react';
import PropTypes from 'prop-types';

import React, { Component } from 'react';

class MyComponent extends Component {
  static defaultProps = {
    name: '안영미',
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  render() {
    const {name, children} = this.props;
    return (
      <div>
        {name}, {children}!
      </div>
    );
  }
}

export default MyComponent;


// export default MyComponent;