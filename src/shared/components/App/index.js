// @flow
import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Logo from '../Logo';
import css from './App.module.css';

const App = () => (
    <div className={css.wrapper}>
        <Helmet defaultTitle="React SSR Starter" titleTemplate="%s – React SSR Starter" />

        <h1>
            <Logo /> App
        </h1>
    </div>
);

export default App;
