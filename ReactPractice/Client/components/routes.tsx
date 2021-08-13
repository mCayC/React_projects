import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './Layout';
import { ProductRouteComponent } from './ProductComponent';
import { ProductsComponent } from './ProductsComponent';
import { OrdersComponent } from './OrdersComponent';

export const routes = <Layout>
    <Route exact path='/'component={ ProductsComponent } />
    <Route exact path='/products/:id' component={ ProductRouteComponent } />
    <Route exact path='/orders' component={ OrdersComponent } />
</Layout>;
