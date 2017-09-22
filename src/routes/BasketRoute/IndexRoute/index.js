import { connect } from 'react-redux';
import TitleComponent from '../../../components/TitleComponent';
import BasketContainer from '../../../containers/BasketContainer';
import basketActions from '../../../actions/basketActions';
import userActions from '../../../actions/userActions';
import wpsActions from '../../../actions/WPSActions';

const mapStateToBasketProps = (state) => {
  return { ...state.basketState, ...state.userState, ...state.WPSState };
};

const mapDispatchToBasketProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: basketActions,
    wpsActions: wpsActions
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
  title: 'Basket',
  components : {
    header: connect(mapStateToTitleProps, mapDispatchToTitleProps)(TitleComponent),
    mainContent: connect(mapStateToBasketProps, mapDispatchToBasketProps)(BasketContainer)
  }
});
