import React from 'react';
import Markdown from 'react-markdown';

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
        { showCode ? <Markdown source={processCode(code)} /> :
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

const processCode = code => '```js\n' + code + '```';

export default CodeTabs;
