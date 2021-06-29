import React, { useContext } from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import LoginContext from '../context/login/loginContext';

interface Props extends RouteProps {
  component: any
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
    const { isLoggedIn, loading } = useContext(LoginContext);

    return (
        <Route exact {...rest} render={props => !isLoggedIn && !loading ?
            (
                <Redirect to='/login' />
            )
            :
            (
                <Component {...props} />
            )} 
        />
    )
}

export default PrivateRoute;