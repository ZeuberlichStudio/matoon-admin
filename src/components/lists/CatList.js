import React from 'react';
import { 
    List, 
    Datagrid, 
    ReferenceField, 
    TextField, 
    NumberField
} from 'react-admin';
import ListToolbar from '~/components/ListToolbar';
import Pagination from '~/components/lists/Pagination';

const CatList = props => (
    <List {...props} title="Категории" pagination={<Pagination/>} actions={<ListToolbar/>} sort={{ field: 'parent', order: 'ASC' }} perPage={50}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название"/>
            <ReferenceField source="parent" reference="cats" label="Родительская категория">
                <TextField source="name" />
            </ReferenceField>
            {/* <NumberField source="productCount" label="Кол-во товаров"/> */}
        </Datagrid>
    </List>
);

export default CatList;