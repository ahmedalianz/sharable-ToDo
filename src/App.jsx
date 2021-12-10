import {Switch,Route,Redirect,BrowserRouter} from 'react-router-dom'
import Auth from './pages/auth'
import Home from './pages/home'
import ListView from './pages/listView'
export default function App() {
    const user=localStorage.getItem('user')
    return (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact>
                {user? <Home/>: <Auth/>} //simple authintication so every user has his own lists
            </Route>
            <Route path='/auth'>
                <Auth/>
            </Route>
            <Route path='/listView/:id/:listName'> //shared list view for any one
                <ListView/>
            </Route>
            <Redirect to='/'/>
        </Switch>
     </BrowserRouter>
    )
}
