import IndexRoute from './IndexRoute';

export default (store) => ({
  path: 'upload',
  indexRoute: IndexRoute(store)
});
