import IndexRoute from './IndexRoute';

export default (store) => ({
  path: 'knmi_climexp_correlate',
  title: 'knmi_climexp_correlate',
  indexRoute: IndexRoute(store)
});
