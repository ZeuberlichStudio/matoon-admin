import React from 'react';
import {
    Create,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    NumberInput
} from 'react-admin';

const EditorTitle = ({record}) => <span>Редактировать {record.name}</span>;

export const CatEdit = props => (
    <Edit {...props} title={<EditorTitle/>}>
        <SimpleForm>
            <TextInput source="name" label="Название"/>

            <ReferenceInput source="parent" reference="cats" label="Родительская категория" filter={{ parent: { $exists: false } }}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const CatCreate = props => (
    <Create {...props} title="Создать категорию">
        <SimpleForm>
            <TextInput source="name" label="Название"/>

            <ReferenceInput source="parent" reference="cats" label="Родительская категория"  filter={{ parent: { $exists: false } }}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);