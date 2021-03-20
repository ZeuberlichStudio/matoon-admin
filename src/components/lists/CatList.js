import React from 'react';
import { List, Datagrid, ReferenceField, TextField, NumberField } from 'react-admin';

const CatList = props => (
    <List {...props} title="Категории">
        <Datagrid rowClick="edit">
            <ReferenceField source="parent" reference="cats" label="Родительская категория">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="name" label="Название"/>
            <NumberField source="productCount" label="Кол-во товаров"/>
        </Datagrid>
    </List>
);

export default CatList;