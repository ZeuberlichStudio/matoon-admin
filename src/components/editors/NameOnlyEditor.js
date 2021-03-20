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

export const NameOnlyEdit = props => (
    <Edit {...props} title={<EditorTitle/>}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const NameOnlyCreate = props => (
    <Create {...props} title={props.title}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);