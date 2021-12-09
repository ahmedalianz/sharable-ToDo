import {Switch,Route,Redirect,BrowserRouter} from 'react-router-dom'
import Home from './components/home'
export default function App() {
    return (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact>
                <Home/>
            </Route>
            <Redirect to='/'/>
        </Switch>
     </BrowserRouter>
    )
}
