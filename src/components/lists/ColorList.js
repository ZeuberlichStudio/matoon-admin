import React from 'react';
import { List, Datagrid, ReferenceField, TextField, NumberField } from 'react-admin';
import { ColorField } from 'react-admin-color-input';
import ListToolbar from '~/components/ListToolbar';

const ColorList = props => (
    <List {...props} title="Цвета" actions={<ListToolbar/>} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название"/>
            <ColorField source="code" label="Цвет"/>
        </Datagrid>
    </List>
);

export default ColorList;