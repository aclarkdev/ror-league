import React from 'react';
import { render } from 'react-dom';
import Provider from '../components/Provider';
import League from '../components/League';

render(
  <Provider>
    <League />
  </Provider>,
  document.querySelector('#root')
);
