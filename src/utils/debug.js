// TODO: Enable and disable based on env
const enabled = true;

const debug = {
    log: (log) => {
        if(enabled){
            console.log(log);
        }
    },
    warn: (warn) => {
        if(enabled){
            console.warn(warn);
        }
    },
    error: (error) => {
        if(enabled){
            console.error(log);
        }
    }
}

export default debug;