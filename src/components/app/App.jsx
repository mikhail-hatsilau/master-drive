import React, { Component } from 'react';

import Header from '../header/Header';
import Navigation from '../navigation/Navigation';
import { routes } from '../../constants';

import FoldersContainer from '../folders/FoldersContainer';
import MistakesContainer from '../mistakes/MistakesContainer';

import styles from './App.scss';

const routesMap = {
    [routes.FOLDERS]: FoldersContainer,
    [routes.MISTAKES]: MistakesContainer,
};

class App extends Component {
    state = {
        route: routes.FOLDERS,
    };

    handleNavigationChanged = (route) => {
        this.setState({
            route,
        });
    };

    renderMainContent() {
        const { route } = this.state;
        const ContentComponent = routesMap[route];
        return <ContentComponent />;
    }

    render() {
        const { route } = this.state;

        return (
            <main>
                <Header />
                <div className={styles.content}>
                    <div className={styles.routeContent}>
                        { this.renderMainContent() }
                    </div>
                    <div className={styles.navigation}>
                        <Navigation
                            activeRoute={route}
                            onNavigationChanged={this.handleNavigationChanged}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
