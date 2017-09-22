import IndexRoute from './IndexRoute';

export default (store) => ({
  path: 'basket',
  indexRoute: IndexRoute(store)
});
