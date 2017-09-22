import IndexRoute from './IndexRoute';

export default (store) => ({
  path: 'joblist',
  indexRoute: IndexRoute(store)
});
