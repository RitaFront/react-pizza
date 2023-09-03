import React, { lazy, Suspense } from 'react';
import './scss/app.scss';
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import MainLayouts from './layouts/MainLayouts';

const Cart = lazy(
  () => import(/* webpackChunkName: "Cart" */ './pages/Cart')
);
const FullPizza = lazy(
  () =>
    import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza')
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayouts />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Пицца загружается...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
