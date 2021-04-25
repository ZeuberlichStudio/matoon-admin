import React from 'react';
import {
    Create,
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    required
} from 'react-admin';
import { ColorInput } from 'react-admin-color-input';

const EditTitle = ({record}) => <span>Редактировать {record.name}</span>;

export const ColorCreate = (props) => (
    <Create {...props} title="Создать цвет">
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required('обязательное поле')}/>
            <ColorInput source="code" label="Цвет" validate={required('обязательное поле')}/>
        </SimpleForm>
    </Create>
)

export const ColorEdit = (props) => (
    <Edit {...props} title={<EditTitle/>}>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required('обязательное поле')}/>
            <ColorInput source="code" label="Цвет" validate={required('обязательное поле')}/>
        </SimpleForm>
    </Edit>
)