import React from 'react';
import Highlight from 'react-highlight';

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
            { showCode ? 'View Example' : 'View Source'}
          </a>
        </div>
        { showCode ? <Highlight className="javascript">{code}</Highlight> :
          <div className="p1 bg-darken-1">
            { children }
          </div>
        }
      </div>
    );
  }

  showCode = show => () => {
    this.setState({ showCode: show });
  }
}

export default CodeTabs;
