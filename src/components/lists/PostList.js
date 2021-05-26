import React from 'react';
import { 
    List, Datagrid, TextField, DateField, ChipField, FunctionField, ReferenceArrayField
} from 'react-admin';
import ListToolbar from '~/components/ListToolbar';
import Pagination from '~/components/lists/Pagination';

const postTypes = {
    banner: 'Баннер',
    feed: 'Сетка новостей'
}

const PostList = props => (
    <List {...props} title="Посты" pagination={<Pagination/>} actions={<ListToolbar/>} sort={{ field: 'meta.createdAt', order: 'DESC' }} perPage={50}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название" />
            <FunctionField label="Тип отображения" source="type" render={record => <i>{postTypes[record.type]}</i>}/>
            
            <DateField source="meta.createdAt" label="Создан" />
            <DateField source="meta.updatedAt" label="Обновлён" />
        </Datagrid>
    </List>
);

export default PostList;