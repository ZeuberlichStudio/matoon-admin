import React from 'react';
import { List, Datagrid, ReferenceField, TextField, NumberField } from 'react-admin';
import ListToolbar from '~/components/ListToolbar';

const NameOnlyList = props => (
    <List {...props} actions={<ListToolbar/>} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название"/>
        </Datagrid>
    </List>
);

export default NameOnlyList;