import React from 'react';
import { bool } from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthLayout from "../layouts/Auth";


const propTypes = {
    isAuth: bool
};

function ProtectedAuthRoute(props) {

    const { isAuth, component: Component, ...rest } = props;
    return (
        <div>
            {
                isAuth ? <Redirect to='/' /> :
                <Route
                    render={() => (
                        <AuthLayout>
                          <Component />
                        </AuthLayout>
                      )}
                    {...rest}
                />
            }
        </div>
    );
}


const mapStateToProps = () =>{
    return (state)=>{
        return {
            isAuth: state.local.isAuthenticated,
        }
    }
}


ProtectedAuthRoute.propTypes = propTypes;


export default connect(mapStateToProps, null)(ProtectedAuthRoute);