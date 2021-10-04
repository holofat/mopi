import { render, screen } from '@testing-library/react';
import App from './App';
import {store, persistor} from './store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import {act} from 'react-dom/test-utils'

describe('parent page', () => {
  let component
  beforeEach(() => {
    const history = createMemoryHistory()
    component = act(async () =>  render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <App/>
          </Router>
        </PersistGate>
      </Provider>)
    )
  })

  test("render navbar", () => {
    expect(screen.getByText(/Home/i)).toBeInTheDocument()
  })
})
