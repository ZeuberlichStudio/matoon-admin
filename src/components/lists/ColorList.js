import React from 'react';
import { List, Datagrid, ReferenceField, TextField, NumberField } from 'react-admin';
import { ColorField } from 'react-admin-color-input';
import ListToolbar from '~/components/ListToolbar';
import Pagination from '~/components/lists/Pagination';

const ColorList = props => (
    <List bulkActionButtons={false} pagination={<Pagination/>} {...props} title="Цвета" actions={<ListToolbar/>} sort={{ field: 'name', order: 'ASC' }}  perPage={50}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название"/>
            <ColorField source="code" label="Цвет"/>
        </Datagrid>
    </List>
);

export default ColorList;