import chalk from 'chalk';

export const logger = {
  error: (...args: any[]) => {
    console.error(chalk.red('[ERROR]'), ...args);
  },
  warn: (...args: any[]) => {
    console.warn(chalk.yellow('[WARNING]'), ...args);
  },
  info: (...args: any[]) => {
    console.info(chalk.blue('[INFO]'), ...args);
  },
  success: (...args: any[]) => {
    console.log(chalk.green('[SUCCESS]'), ...args);
  },
};
