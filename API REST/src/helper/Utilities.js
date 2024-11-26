import FS from 'fs';

/**
 * @typedef {{ [key: string]: string | undefined }} env
 */
export class Utilities {
    /**
     * load the environment variables from the given path
     * @param {string} path the path to the environment variables file
     * @param {boolean} setEnv whether to set the environment variables
     * @returns {env} the environment variables
     * @throws an error if the environment variables file does not exist
     * @throws an error if the environment variables file is not a file
     */
    static loadEnv(path, setEnv = true) {
        console.log(`loading environment variables from [${path}]`);
        /** @type { env}  */
        const result = {};
        if (!FS.existsSync(path))
            throw new Error(`the environment variables file [${path}] does not exist`);
        const env = FS.readFileSync(path, 'utf-8');
        const lines = env.split('\n');
        for (const line of lines) {
            const [key, ...value] = line.split('=');
            if (!key || !value)
                continue;
            if (key.trim().startsWith('#'))
                continue;
            result[key] = value.join('=').trim();
            if (setEnv)
                process.env[key] = value.join('=').trim();
        }
        console.log(`environment variables loaded from [${path}]`);
        return result;
    }
}
export default Utilities;