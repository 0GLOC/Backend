import minimist from "minimist";

const {
    MODE,
    PORT,
    DEBUG
} = minimist(process.argv.slice(2), {alias: {m: "MODE", p: "PORT", d: "DEBUG"}, default: {m: "PROD", p: 8080, d: false}});

const configMinimist = {
    mode: MODE,
    port: PORT,
    debug: DEBUG,
}

export default configMinimist;