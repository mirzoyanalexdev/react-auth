import { RouteComponentProps } from 'react-router';
import { Route as ReactRoute, Redirect} from 'react-router-dom';

import { Routes, StorageKey } from '../../consts';

interface RouteProps {
    exact?: boolean;
    guarded?: boolean;
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const Route = ({exact = false, guarded = false, path, component, ...rest}: RouteProps) => {
    const isLoggedIn = localStorage.getItem(StorageKey.Token); 
    
    if(guarded) {
        if(isLoggedIn) {
            return <ReactRoute  
                exact={exact}
                path={path}
                component={component}
                {...rest}
            />
        }

        return <Redirect to={Routes.Login} />
    }


    return (
        <ReactRoute  
            exact={exact}
            path={path}
            component={component}
            {...rest}
        />
    )
}