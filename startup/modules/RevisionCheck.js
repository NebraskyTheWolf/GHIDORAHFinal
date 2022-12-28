module.exports.init = function (url) {
    GFetch(url, { method: 'get' }).then(res => res.json()).then(data => {
        logger.log('WARN', `Fetching data from "${url}"`);
        logger.log('WARN', '---');

        if (data.revision !== syncConfig.required.revision) {
            logger.log("WARN", `Revision is not marchin the online data. (L:'${data.revision}', O:'${syncConfig.revision}')`)
            logger.log("WARN", `Please check the local revision before starting GSYNC.`);
            logger.log("ERROR", "Aborting sync process...");
        }
    });
}