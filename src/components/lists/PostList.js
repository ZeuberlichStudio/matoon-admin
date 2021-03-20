import React from 'react';
import { 
    List, Datagrid, TextField, DateField, ChipField, FunctionField, ReferenceArrayField
} from 'react-admin';

const postTypes = {
    banner: 'Баннер',
    feed: 'Сетка новостей'
}

const PostList = props => (
    <List {...props} title="Посты">
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название" />

            <FunctionField label="Тип отображения" render={record => <i>{postTypes[record.type]}</i>}/>

            <DateField source="meta.createdAt" label="Создан" />
            <DateField source="meta.updatedAt" label="Обновлён" />
        </Datagrid>
    </List>
);

export default PostList;