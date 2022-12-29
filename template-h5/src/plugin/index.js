import loading from './loading';
import message from './message';

export default function installPlugins(app) {
  app.use(loading)
  app.use(message)
}
