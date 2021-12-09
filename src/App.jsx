import {Switch,Route,Redirect,BrowserRouter} from 'react-router-dom'
import Auth from './components/auth'
import Home from './components/home'
import ListView from './components/listView'
export default function App() {
    const user=localStorage.getItem('user')
    return (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact>
                {user? <Home/>: <Auth/>}
            </Route>
            <Route path='/auth'>
                <Auth/>
            </Route>
            <Route path='/listView/:id/:listName'>
                <ListView/>
            </Route>
            <Redirect to='/'/>
        </Switch>
     </BrowserRouter>
    )
}
