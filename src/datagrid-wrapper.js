import React from 'react';

const { func, string, any, array, object } = React.PropTypes;

export default class DatagridWrapper extends React.Component {
  static propTypes = {
    Component: func,
    initDatagrid: func,
    columns: array,
    name: string,
    searchText: string,
    sortBy: string,
    groupBy: string,
    handleSearchTextChange: func,
    handleGroupByChange: func,
    handleSortByChange: func,
    filteredData: any, // should be array or array like (i.e. Immutable.List)
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
      columns,
      name,
      searchText,
      sortBy,
      groupBy,
      handleSearchTextChange,
      handleGroupByChange,
      handleSortByChange,
      filteredData,
      fullData,
      groupedData,
      ...otherProps,
    } = this.props;

    if (!Component) {
      return null;
    }

    const datagridProps = {
      name: name,
      columns: columns,
      data: fullData,
      filtered: filteredData,
      grouped: groupedData,
      controls: {
        search: {
          value: searchText,
          onChange: handleSearchTextChange,
        },
        sortBy: {
          value: sortBy,
          onChange: handleSortByChange,
        },
        groupBy: {
          value: groupBy,
          onChange: handleGroupByChange,
        },
      },
    };

    return <Component datagrid={datagridProps} {...otherProps}/>;
  }
}
