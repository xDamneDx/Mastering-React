import * as Sentry from '@sentry/browser';

function init() {
    Sentry.init({dsn: "https://150facba32614b99a8f93962d0d25146@o387410.ingest.sentry.io/5222580"});
}

function log(error) {
    Sentry.captureException(error);
}

export default { init, log };
