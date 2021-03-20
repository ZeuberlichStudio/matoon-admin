import React from 'react';
import { List, Datagrid, ImageField } from 'react-admin';

const ImageList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <ImageField source="src" />
        </Datagrid>
    </List>
);

export default ImageList;