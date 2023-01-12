/* eslint-disable */
window.global ||= window;

import { Buffer } from "buffer";
window.Buffer = Buffer;

import process from 'process';
window.process = process;

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

);
