export default class MediaHandler {
    getPermissions() {
        return new Promise((resolve, rej) => {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    resolve(stream);
                })
                .catch(err => {
                    throw new Error(`Unable to fetch stream ${err}`);
                })
        })
    }
}