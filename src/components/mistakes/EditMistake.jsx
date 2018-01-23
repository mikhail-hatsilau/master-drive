import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, flow, keys, pick, filter, indexOf, isEmpty } from 'lodash/fp';
import classnames from 'classnames';

import styles from './EditMistake.scss';

class EditMistake extends Component {
    static propTypes = {
        onSaveMistake: PropTypes.func,
        onBackToList: PropTypes.func,
        mistake: PropTypes.shape({
            id: PropTypes.string,
            rowNumber: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
        }),
    };

    static defaultProps = {
        onSaveMistake: noop,
        onBackToList: noop,
        mistake: {},
    };

    constructor(...args) {
        super(...args);
        const { mistake } = this.props;
        this.state = {
            title: mistake.title || '',
            description: mistake.description || '',
        };
    }

    getErrorClass(field) {
        const { errorFields } = this.state;
        return classnames({
            [styles.error]: indexOf(field, errorFields) !== -1,
        });
    }

    handleSave = () => {
        const { title, description } = this.state;
        const { onSaveMistake, mistake } = this.props;
        if (title && description) {
            onSaveMistake({
                ...mistake,
                title,
                description,
            });
            return;
        }
        this.setState({
            errorFields: this.validateState(),
            errorMessage: 'Fill required fields!',
        });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    validateState() {
        return flow(
            pick(['title', 'description']),
            keys,
            filter(key => !this.state[key]),
        )(this.state);
    }

    render() {
        const { onBackToList } = this.props;
        const { errorMessage, title, description } = this.state;
        return (
            <div>
                <div className={styles.backAction}>
                    <button onClick={onBackToList}>
                        <span className="fa fa-arrow-left" />
                    </button>
                </div>
                <div className={styles.fields}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className={this.getErrorClass('title')}
                            onChange={this.handleChange}
                            value={title}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            onChange={this.handleChange}
                            className={this.getErrorClass('description')}
                            value={description}
                        />
                    </div>
                    <div className={styles.errorMessage}>
                        {errorMessage}
                    </div>
                    <div className={styles.saveAction}>
                        <button onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditMistake;
