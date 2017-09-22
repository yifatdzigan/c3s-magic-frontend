import IndexRoute from './IndexRoute';

export default (store) => ({
  path: 'account',
  indexRoute: IndexRoute(store)
});
