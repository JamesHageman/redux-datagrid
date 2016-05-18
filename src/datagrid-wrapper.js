import React from 'react';

const { func, object, string, arrayOf } = React.PropTypes;

export default class DatagridWrapper extends React.Component {
  static propTypes = {
    Component: func,
    initDatagrid: func,
    data: arrayOf(object.isRequired).isRequired,
    defaultSortBy: string,
    defaultGroupBy: string,
  }

  componentDidMount() {
    if (!this.props.Component) {
      this.props.initDatagrid();
    }
  }

  render() {
    const {
      Component,
      ...otherProps,
    } = this.props;

    if (!Component) {
      return null;
    }

    return <Component {...otherProps}/>;
  }
}
