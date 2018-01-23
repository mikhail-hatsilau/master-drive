import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash/fp';
import uuid from 'uuid/v1';

import MistakesList from './MistakesList';
import EditMistake from './EditMistake';

class Mistakes extends Component {
    static propTypes = {
        mistakes: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            rowNumber: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
        })),
        onCreateMistake: PropTypes.func,
        onDeleteMistake: PropTypes.func,
        onEditMistake: PropTypes.func,
    };

    static defaultProps = {
        onCreateMistake: noop,
        onEditMistake: noop,
        onDeleteMistake: noop,
    };

    state = {
        editMode: false,
    };

    handleCreateMistake = () => {
        this.setState({
            editMode: true,
        });
    };

    handleSaveMistake = (mistake) => {
        const { onCreateMistake, onEditMistake } = this.props;
        this.setState({
            editMode: false,
            mistake: undefined,
        });

        if (mistake.id) {
            onEditMistake(mistake);
            return;
        }

        onCreateMistake({
            id: uuid(),
            ...mistake,
        });
    };

    handleBackToList = () => {
        this.setState({
            editMode: false,
            mistake: undefined,
        });
    };

    handleEditMistake = (mistake) => {
        this.setState({
            editMode: true,
            mistake,
        });
    };

    renderMistakesList() {
        const { mistakes, onDeleteMistake } = this.props;
        return (
            <MistakesList
                mistakes={mistakes}
                onCreateMistake={this.handleCreateMistake}
                onClickDelete={onDeleteMistake}
                onClickEdit={this.handleEditMistake}
            />
        );
    }

    renderEditMistake() {
        return (
            <EditMistake
                onSaveMistake={this.handleSaveMistake}
                onBackToList={this.handleBackToList}
                mistake={this.state.mistake}
            />
        );
    }

    render() {
        const { editMode } = this.state;
        return editMode ? this.renderEditMistake() : this.renderMistakesList();
    }
}

export default Mistakes;
