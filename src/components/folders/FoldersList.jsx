import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash/fp';
import classnames from 'classnames';

import { fileTypes } from '../../constants';

import styles from './FoldersList.scss';

const renderFolder = (folders, onClick) =>
    folders.map((folder, index) => {
        const classNames = classnames(styles.icon, 'fa', {
            'fa-folder': folder.type === fileTypes.FOLDER,
            'fa-file-word-o': folder.type === fileTypes.DOC,
        });
        return (
            <li key={index} onClick={() => onClick(folder)}>
                <span className={classNames} />
                {folder.title}
            </li>
        );
    });

const FoldersList = ({ folders, onClick }) => (
    <Fragment>
        {folders.length ? (
            <ul className={styles.list}>
                {renderFolder(folders, onClick)}
            </ul>
        ) : <div className={styles.emptyContainer}>No files selected</div>}
    </Fragment>
);

FoldersList.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        type: PropTypes.oneOf([fileTypes.FOLDER, fileTypes.DOC]),
    })),
    onClick: PropTypes.func,
};

FoldersList.defaultProps = {
    onClick: noop,
};

export default FoldersList;
