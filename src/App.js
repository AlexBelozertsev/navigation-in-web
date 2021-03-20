import React from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import './styles/base.scss';

import TodosView from './views/TodosView';
import ArticlesView from './views/ArticlesView';
import HomeView from './views/HomeView';
import AuthorsView from './views/AuthorsView';
import BooksView from './views/BooksView';
import NotFound from './views/NotFound';

// inline styles (bad practice)
const LinkStyle = {
  base: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'teal',
  },
  active: {
    color: 'tomato'
  },
}


const App = () => (
  <>
    <ul>
      <li>
        <NavLink exact to='/' style={LinkStyle.base} activeStyle={LinkStyle.active} >Home</NavLink>
      </li>
      <li>
        <NavLink to='/authors' className='NavLink' activeClassName='NavLink_active' >Authors</NavLink>
      </li>
      <li>
        <NavLink to='/books' className='NavLink' activeClassName='NavLink_active' >Books</NavLink>
      </li>
    </ul>
    <Switch>
      <Route exact path='/' component={HomeView} />
      <Route path='/authors' component={AuthorsView} />
      <Route path='/books' component={BooksView} />
      <Route component={NotFound} />
    </Switch>

    <ul>
      <li>
        <Link to="/todos">Заметки</Link>
      </li>
      <li>
        <Link to="/articles">Статьи</Link>
      </li>
    </ul>

    <Switch>
      <Route path="/todos">
        <TodosView />
      </Route>

      <Route path="/articles">
        <ArticlesView />
      </Route>
    </Switch>
  </>
);

export default App;
