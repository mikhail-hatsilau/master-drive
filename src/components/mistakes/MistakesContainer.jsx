import React, { Component, Fragment } from 'react';
import { findIndex } from 'lodash/fp';

import { loadListOfMistakes, addMistake, deleteMistake, editMistake } from '../../api';

import Mistakes from './Mistakes';
import Loader from '../loader/Loader';

class MistakesContainer extends Component {
    state = {
        mistakes: [],
        loading: false,
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });
        const mistakes = await loadListOfMistakes();
        this.setState({
            mistakes,
            loading: false,
        });
    }

    handleCreateMistake = async (mistake) => {
        this.setState({
            loading: true,
        });
        await addMistake(mistake);
        this.setState(prevState => ({
            mistakes: [mistake, ...prevState.mistakes],
            loading: false,
        }));
    };

    handleDeleteMistake = async (mistake) => {
        const { mistakes } = this.state;
        this.setState({
            loading: true,
        });
        await deleteMistake(mistake);
        const indexOfDeletedMistake = findIndex(item => item.id === mistake.id, mistakes);
        this.setState({
            mistakes: [
                ...mistakes.slice(0, indexOfDeletedMistake),
                ...mistakes.slice(indexOfDeletedMistake + 1),
            ],
            loading: false,
        });
    };

    handleEditMistake = async (mistake) => {
        const { mistakes } = this.state;
        this.setState({
            loading: true,
        });
        await editMistake(mistake);
        const indexOfDeletedMistake = findIndex(item => item.id === mistake.id, mistakes);
        this.setState({
            mistakes: [
                ...mistakes.slice(0, indexOfDeletedMistake),
                mistake,
                ...mistakes.slice(indexOfDeletedMistake + 1),
            ],
            loading: false,
        });
    };

    render() {
        return (
            <Fragment>
                <h1>Mistakes</h1>
                {this.state.loading ? <Loader /> : (
                    <Mistakes
                        mistakes={this.state.mistakes}
                        onCreateMistake={this.handleCreateMistake}
                        onDeleteMistake={this.handleDeleteMistake}
                        onEditMistake={this.handleEditMistake}
                    />
                )}
            </Fragment>
        );
    }
}

export default MistakesContainer;
