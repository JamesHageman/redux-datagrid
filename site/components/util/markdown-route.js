import React from 'react';
import Markdown from 'react-markdown';

const markdownRoute = ({ markdown }) => () => <div>
  <Markdown source={markdown} />
</div>;

export default markdownRoute;
