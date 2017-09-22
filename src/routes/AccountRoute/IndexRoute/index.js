// Sync route definition
import { connect } from 'react-redux';
import TitleComponent from '../../../components/TitleComponent';
import AccountComponent from '../../../components/AccountComponent';
import actions from '../../../actions/userActions';

const mapStateToTitleProps = (state) => {
  return { ...state.userState };
};

const mapDispatchToTitleProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: actions
  });
};

export default () => ({
  title: 'Data Science Platform',
  components: {
    header: connect(mapStateToTitleProps, mapDispatchToTitleProps)(TitleComponent),
    mainContent: connect(mapStateToTitleProps, mapDispatchToTitleProps)(AccountComponent)
  }
});
