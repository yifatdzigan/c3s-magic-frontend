import wrangleReducer from './wrangleReducer';
import sinon from 'sinon';
import actions from '../actions/countActions';
describe('(Store) wrangleReducer', () => {
  let _globalState;
  let _dispatchSpy;
  let _getStateSpy;
  beforeEach(() => {
    _globalState = wrangleReducer();
    _dispatchSpy = sinon.spy((action) => {
      _globalState = {
        ..._globalState,
        ...wrangleReducer(_globalState, action)
      };
    });
    _getStateSpy = sinon.spy(() => {
      return _globalState;
    });
  });
  it('starts with a count of 0', () => {
    expect(_globalState).to.exist();
    expect(_globalState).to.have.property('count');
    expect(_globalState.count).to.equal(0);
  });

  it('will increment when the increment action is called', () => {
    _dispatchSpy(actions.incrementCounter());
    const incrementedState = _getStateSpy();
    expect(incrementedState).to.exist();
    expect(incrementedState).to.have.property('count');
    expect(incrementedState.count).to.equal(1);
  });
});
