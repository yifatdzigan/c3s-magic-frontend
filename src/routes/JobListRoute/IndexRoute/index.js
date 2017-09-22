import { connect } from 'react-redux';
import TitleComponent from '../../../components/TitleComponent';
import JobListComponent from '../../../components/JobListComponent';
import userActions from '../../../actions/userActions';
import jobListActions from '../../../actions/jobListActions';

const mapStateToJobListProps = (state) => {
  return { ...state.jobListState, ...state.userState };
};

const mapDispatchToJobListProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: jobListActions
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
  title: 'JobList',
  components : {
    header: connect(mapStateToTitleProps, mapDispatchToTitleProps)(TitleComponent),
    mainContent: connect(mapStateToJobListProps, mapDispatchToJobListProps)(JobListComponent)
  }
});
