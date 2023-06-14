// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Product from './product/product';

export function App() {
  return (
    <Container>
      <div>
        <Routes>
          <Route path="/" Component={Product} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
