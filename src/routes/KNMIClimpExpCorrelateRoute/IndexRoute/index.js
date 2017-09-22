import { connect } from 'react-redux';
import KNMIClimpExpCorrelate from '../../../components/KNMIClimpExpCorrelate';
import TitleComponent from '../../../components/TitleComponent';
import userActions from '../../../actions/userActions';
import wpsActions from '../../../actions/WPSActions';

const mapStateToKNMIClimpExpCorrelateProps = (state) => {
  return { ...state.WPSState, ...state.userState };
};

const mapDispatchToWPSProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: wpsActions
  });
};

const mapStateToTitleProps = (state) => {
  return { ...state.userState };
};

const mapDispatchToTitleProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: userActions
  });
};

// Sync route definition
export default () => ({
  title: 'Counter',
  components : {
    header: connect(mapStateToTitleProps, mapDispatchToTitleProps)(TitleComponent),
    mainContent: connect(mapStateToKNMIClimpExpCorrelateProps, mapDispatchToWPSProps)(KNMIClimpExpCorrelate)
  }
});
