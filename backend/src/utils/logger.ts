const chalkImport = import("chalk");

export const logger = {
    error: async (...args: any[]) => {
        const chalk = await chalkImport;
        console.error(chalk.default.red("[ERROR]"), ...args);
    },
    warn: async (...args: any[]) => {
        const chalk = await chalkImport;
        console.warn(chalk.default.yellow("[WARNING]"), ...args);
    },
    info: async (...args: any[]) => {
        const chalk = await chalkImport;
        console.info(chalk.default.blue("[INFO]"), ...args);
    },
    success: async (...args: any[]) => {
        const chalk = await chalkImport;
        console.log(chalk.default.green("[SUCCESS]"), ...args);
    },
};

export default logger;
