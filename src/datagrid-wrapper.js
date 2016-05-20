import React from 'react';

const { func, string, any, object } = React.PropTypes;

export default class DatagridWrapper extends React.Component {
  static propTypes = {
    Component: func,
    initDatagrid: func,
    searchText: string,
    handleSearchTextChange: func,
    filteredData: any, // should be array like (i.e. Immutable.List)
    fullData: any, // ditto
    groupedData: object,
  }

  componentDidMount() {
    if (!this.props.Component) {
      this.props.initDatagrid();
    }
  }

  render() {
    const {
      Component,
      initDatagrid, // eslint-disable-line no-unused-vars
      searchText,
      handleSearchTextChange,
      filteredData,
      fullData,
      groupedData,
      ...otherProps,
    } = this.props;

    if (!Component) {
      return null;
    }

    const datagridProps = {
      data: fullData,
      filtered: filteredData,
      grouped: groupedData,
      controls: {
        search: {
          value: searchText,
          onChange: handleSearchTextChange,
        },
      },
    };

    return <Component datagrid={datagridProps} {...otherProps}/>;
  }
}
