import { connect } from 'react-redux';
import WPSWranglerDemo from '../../../components/WPSWranglerDemo';
import TitleComponent from '../../../components/TitleComponent';
import userActions from '../../../actions/userActions';
import wpsActions from '../../../actions/WPSActions';

const mapStateToWranglerProps = (state) => {
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
    mainContent: connect(mapStateToWranglerProps, mapDispatchToWPSProps)(WPSWranglerDemo)
  }
});
