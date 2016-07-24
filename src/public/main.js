import React from 'react';
import {render} from 'react-dom';

import './framework.less';
import './typo.less';

import App from './app.jsx';

render(React.createElement(App), document.getElementById('app'));
