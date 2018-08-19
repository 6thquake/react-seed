import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

function loadComponent(importComponent) {
  return Loadable({
    loader: () => importComponent(),
    loading: Loading,
  });
}

export { loadComponent };
