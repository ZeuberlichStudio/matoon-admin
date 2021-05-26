import React from 'react';
import { List, Datagrid, ReferenceField, TextField, NumberField } from 'react-admin';
import ListToolbar from '~/components/ListToolbar';
import Pagination from '~/components/lists/Pagination';

const NameOnlyList = props => (
    <List bulkActionButtons={false} pagination={<Pagination/>} {...props} actions={<ListToolbar/>} sort={{ field: 'name', order: 'ASC' }}  perPage={50}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название"/>
        </Datagrid>
    </List>
);

export default NameOnlyList;