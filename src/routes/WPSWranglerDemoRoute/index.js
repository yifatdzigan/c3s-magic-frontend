import IndexRoute from './IndexRoute';

export default (store) => ({
  path: 'demo',
  title: 'demo',
  indexRoute: IndexRoute(store)
});
