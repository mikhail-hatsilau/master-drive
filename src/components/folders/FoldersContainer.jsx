import React, { Component, Fragment } from 'react';
import { flow, keys, last, reverse, tail, reduce, debounce } from 'lodash/fp';

import FoldersList from './FoldersList';
import OpenedDoc from './OpenedDoc';
import Loader from '../loader/Loader';
import { loadFoldersAndFiles, saveMistakesToDoc } from '../../api';
import { fileTypes } from '../../constants';

import styles from './Folders.scss';

class FoldersContainer extends Component {
    state = {
        folders: {
            root: [],
        },
        loading: false,
    };

    getLastOpenedFolderFiles() {
        const { folders } = this.state;
        return flow(
            keys,
            last,
            key => folders[key],
        )(folders);
    }

    handleSearch = (event) => {
        event.persist();
        this.delayedHandleSearch(event);
    };

    handleFolderClick = (folder) => {
        const { id } = folder;
        this.loadFiles({
            id,
        });
    }

    handleDocClick = (doc) => {
        this.setState({
            openedDoc: doc,
        });
    }

    handleBack = () => {
        const { folders, openedDoc } = this.state;
        const newFolders = openedDoc ? folders : flow(
            keys,
            reverse,
            tail,
            reduce((result, key) => ({ [key]: folders[key] }), {}),
        )(folders);
        this.setState({
            folders: newFolders,
            openedDoc: null,
        });
    }

    handleListItemClick = (folder) => {
        const { type } = folder;
        const actions = {
            [fileTypes.FOLDER]: this.handleFolderClick,
            [fileTypes.DOC]: this.handleDocClick,
        };
        actions[type](folder);
    }

    handleSaveDoc = async (mistakesList) => {
        await saveMistakesToDoc(this.state.openedDoc.id, mistakesList);
        this.setState({
            openedDoc: null,
        });
    }

    delayedHandleSearch = debounce(500, (event) => {
        this.loadFiles({ name: event.target.value });
    });

    async loadFiles(fileInfo) {
        this.setState({
            loading: true,
        });
        const foldersAndFiles = await loadFoldersAndFiles(fileInfo);
        this.setState(({ folders }) => ({
            folders: {
                ...folders,
                [fileInfo.id || 'root']: foldersAndFiles,
            },
            loading: false,
        }));
    }

    renderBack() {
        const { folders, openedDoc } = this.state;
        return keys(folders).length > 1 || openedDoc ? (
            <div className={styles.backButton}>
                <button onClick={this.handleBack}>
                    <span className="fa fa-level-up" />
                </button>
            </div>
        ) : null;
    }

    renderFolderList() {
        return this.state.loading ? <Loader /> : (
            <FoldersList
                folders={this.getLastOpenedFolderFiles()}
                onClick={this.handleListItemClick}
            />
        );
    }

    render() {
        const { openedDoc } = this.state;
        return (
            <Fragment>
                <h1>Folders and files</h1>
                <div className={styles.searchBar}>
                    <label htmlFor="search">Search folders and docs</label>
                    <span className={styles.searchInput}>
                        <input id="search" type="text" onChange={this.handleSearch} />
                    </span>
                </div>
                {this.renderBack()}
                {openedDoc ? (
                    <OpenedDoc onSave={this.handleSaveDoc} />
                ) : this.renderFolderList()}
            </Fragment>
        );
    }
}

export default FoldersContainer;
