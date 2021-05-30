import React, { useContext } from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from '~/providers/extendedProvider';
import authProvider from '~/providers/authProvider';

import CatList from '~/components/lists/CatList.js'
import ProductList from '~/components/lists/ProductList.js'
import PostList from '~/components/lists/PostList.js'
import NameOnlyList from './components/lists/NameOnlyList';
import ColorList from './components/lists/ColorList';

import { CatEdit, CatCreate } from '~/components/editors/CatEditor.js';
import { ProductEdit, ProductCreate } from '~/components/editors/ProductEditor.js';
import { PostEdit, PostCreate } from '~/components/editors/PostEditor.js';
import { NameOnlyEdit, NameOnlyCreate } from '~/components/editors/NameOnlyEditor.js';
import { ColorCreate, ColorEdit } from '~/components/editors/ColorEditor.js';

import ProductIcon from '@material-ui/icons/LocalMall';
import CategoryIcon from '@material-ui/icons/Category';
import MaterialIcon from '@material-ui/icons/Loyalty';
import BrandIcon from '@material-ui/icons/Apple';
import PostIcon from '@material-ui/icons/Book';
import BrushIcon from '@material-ui/icons/Brush';

function App() {
    return (
        <Admin 
            title="Matoon Store" 
            dataProvider={dataProvider} 
            authProvider={authProvider}
        >
            <Resource 
                name="products" 
                list={ProductList} 
                edit={ProductEdit} 
                create={ProductCreate} 
                options={{ label: 'Товары' }}
                icon={ProductIcon}
            />
            <Resource 
                name="cats" 
                list={CatList} 
                edit={CatEdit} 
                create={CatCreate} 
                options={{ label: 'Категории' }} 
                icon={CategoryIcon}
            />
            <Resource 
                name="brands" 
                list={props => <NameOnlyList title="Бренды" {...props}/>} 
                edit={NameOnlyEdit} 
                create={props => <NameOnlyCreate title="Создать бренд" {...props}/>} 
                options={{ label: 'Бренды' }}
                icon={BrandIcon}
            />
            <Resource 
                name="materials" 
                list={props => <NameOnlyList title="Материалы" {...props}/>} 
                edit={NameOnlyEdit} 
                create={props => <NameOnlyCreate title="Создать материал" {...props}/>} 
                options={{ label: 'Материалы' }}
                icon={MaterialIcon}
            />
            <Resource 
                name="posts" 
                list={PostList} 
                edit={PostEdit} 
                create={PostCreate} 
                options={{ label: 'Посты' }}
                icon={PostIcon}
            />
            <Resource 
                name="colors" 
                list={ColorList} 
                edit={ColorEdit} 
                create={ColorCreate} 
                options={{ label: 'Цвета' }}
                icon={BrushIcon}
            />
            <Resource name="images" />
        </Admin>
    );
}

export default App;