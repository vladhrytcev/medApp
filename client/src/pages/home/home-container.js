import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authLogOut } from '../../redux/actions/auth';
import { specialistSearchRequest, sendForm } from '../../redux/actions/homepage';

const mapStateToProps = state => ({
  local: state.local,
  specialities: { ...state.homepage.specialities }
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ authLogOut, specialistSearchRequest, sendForm }, dispatch)
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps);
