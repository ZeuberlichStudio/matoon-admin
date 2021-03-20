import React from 'react';
import { List, Datagrid, ReferenceField, TextField, NumberField } from 'react-admin';

const BrandList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название"/>
        </Datagrid>
    </List>
);

export default BrandList;