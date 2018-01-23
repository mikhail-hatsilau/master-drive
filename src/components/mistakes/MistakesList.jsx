import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash/fp';

import styles from './MistakesList.scss';

const renderMistakesList = (mistakes, onClickEdit, onClickDelete) =>
    mistakes.map(mistake => (
        <li key={mistake.id}>
            <div className={styles.title}>
                { mistake.title }
                <div className={styles.actions}>
                    <button onClick={() => onClickEdit(mistake)}>
                        <span className="fa fa-pencil-square-o" />
                    </button>
                    <button onClick={() => onClickDelete(mistake)}>
                        <span className="fa fa-trash-o" />
                    </button>
                </div>
            </div>
            <div>{ mistake.description }</div>
        </li>
    ));

const MistakesList = ({
    mistakes,
    onClickDelete = noop,
    onClickEdit = noop,
    onCreateMistake = noop,
}) => (
    <div>
        <div className={styles.createMistake}>
            <button onClick={onCreateMistake}>Create mistake</button>
        </div>
        <ul className={styles.list}>
            {renderMistakesList(mistakes, onClickEdit, onClickDelete)}
        </ul>
    </div>
);

export default MistakesList;

MistakesList.propTypes = {
    mistakes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        rowNumber: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
    })),
    onCreateMistake: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
};
