module.exports.init = function () {
    GFetch(syncConst.GSYNC_REPO_MANIFEST_VERSION, { method: 'get' }).then(res => res.json()).then(data => {
        logger.log('INFO', `Current version: ${data.binary.version}`);
        logger.log('INFO', `Current revision: ${data.revision}`);
        logger.log('INFO', `Current binary: ${data.binary.name}`);
        logger.log('INFO', "Author: NebraskyTheWolf");

        if (syncConfig.required.version !== data.binary.version) {
            logger.log('WARN', 'Update available... syncing data... Please wait.');
            // TO DO: Updating code.
        } else {
            logger.log('INFO', 'The binary is up to date.');
        }
    });
}