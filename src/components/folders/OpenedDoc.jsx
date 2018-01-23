import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { findIndex, noop } from 'lodash/fp';

import { loadListOfMistakes } from '../../api';

import Loader from '../loader/Loader';

import styles from './OpenedDoc.scss';

class OpenedDoc extends Component {
    static propTypes = {
        onSave: PropTypes.func,
    };

    static defaultProps = {
        onSave: noop,
    }

    state = {
        mistakes: [],
        checkedMistakes: [],
        shouldBeSaved: false,
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

    handleSave = () => {
        this.props.onSave(this.state.checkedMistakes);
    }

    handleCheck = mistake => (event) => {
        const { checked } = event.target;
        const { checkedMistakes } = this.state;

        let newCheckedMistakes = [...checkedMistakes, mistake];

        if (!checked) {
            const uncheckedItemIndex = findIndex(item => item.id === mistake.id, checkedMistakes);
            if (uncheckedItemIndex !== -1) {
                newCheckedMistakes = [
                    ...checkedMistakes.slice(0, uncheckedItemIndex),
                    ...checkedMistakes.slice(uncheckedItemIndex + 1),
                ];
            }
        }

        this.setState({
            shouldBeSaved: true,
            checkedMistakes: newCheckedMistakes,
        });
    }

    renderMistake = (mistake) => {
        const { id, title } = mistake;
        return (
            <li key={id}>
                <input id={id} type="checkbox" onChange={this.handleCheck(mistake)} />
                <label htmlFor={id}>{ title }</label>
            </li>
        );
    }

    render() {
        const { shouldBeSaved, mistakes, loading } = this.state;

        return (
            <Fragment>
                {shouldBeSaved ? (
                    <div className={styles.saveButton}>
                        <button onClick={this.handleSave}>Save</button>
                    </div>
                ) : null}
                {loading ? <Loader /> : (
                    <ul className={styles.list}>
                        {mistakes.map(this.renderMistake)}
                    </ul>
                )}
            </Fragment>
        );
    }
}

export default OpenedDoc;
