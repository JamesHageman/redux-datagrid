import React from 'react';

class CodeTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      showCode: false,
    };
  }

  render() {
    const { code, children } = this.props;
    const { showCode } = this.state;
    return (
      <div>
        <div className="border-bottom clearfix">
          <a className="col-right" style={{cursor: 'pointer'}}
            onClick={this.showCode(!showCode)}>
            { showCode ? 'Example' : 'Code'}
          </a>
        </div>
        <div className="p1 bg-darken-1">
          { showCode ? <pre>{code}</pre> : children}
        </div>
      </div>
    );
  }

  showCode = show => () => {
    this.setState({ showCode: show });
  }
}

export default CodeTabs;
