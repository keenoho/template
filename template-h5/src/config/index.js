import Keenoho from '@keenoho/sdk';

const conf = Keenoho.config.getConfig();

export default {
  ...conf,
  ...conf.appConf,
};
