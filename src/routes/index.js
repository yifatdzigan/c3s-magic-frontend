// We only need to import the modules necessary for initial render
import BaseLayout from '../layouts/BaseLayout';
import HomeRoute from './HomeRoute';
import WPSWranglerDemoRoute from './WPSWranglerDemoRoute';
import BasketRoute from './BasketRoute';
import UploadFileRoute from './UploadFileRoute';
import JobListRoute from './JobListRoute';
import AccountRoute from './AccountRoute';
import KNMIClimpExpCorrelateRoute from './KNMIClimpExpCorrelateRoute';
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: BaseLayout,
  indexRoute: HomeRoute(store),
  childRoutes: [
    WPSWranglerDemoRoute(),
    KNMIClimpExpCorrelateRoute(),
    UploadFileRoute(store),
    BasketRoute(),
    JobListRoute(),
    AccountRoute()
  ]
});

export default createRoutes;
