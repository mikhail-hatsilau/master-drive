const execGoogleQuery = (methodName, ...params) =>
    new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)[methodName](...params);
    });

export const loadCurrentUserEmail = async () =>
    execGoogleQuery('getCurrentUserEmail');

export const loadListOfMistakes = async () =>
    execGoogleQuery('getMistakesList');

export const addMistake = async mistake =>
    execGoogleQuery('addMistake', mistake);

export const deleteMistake = async mistake =>
    execGoogleQuery('deleteMistake', mistake);

export const editMistake = async mistake =>
    execGoogleQuery('editMistake', mistake);

export const loadFoldersAndFiles = async fileInfo =>
    execGoogleQuery('getFoldersAndFiles', fileInfo);

export const saveMistakesToDoc = async (docId, mistakes) =>
    execGoogleQuery('saveMistakesToDoc', docId, mistakes);
