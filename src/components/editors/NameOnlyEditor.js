import React from 'react';
import {
    Create,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    NumberInput,
    required
} from 'react-admin';
import NoDeleteEditorToolbar from '~/components/NoDeleteEditorToolbar';

const EditorTitle = ({record}) => <span>Редактировать {record.name}</span>;

export const NameOnlyCreate = props => (
    <Create {...props} title={props.title} mutationMode="pessimistic">
        <SimpleForm redirect="list">
            <TextInput source="name" validate={required('обязательное поле')}/>
        </SimpleForm>
    </Create>
);

export const NameOnlyEdit = props => (
    <Edit {...props} title={<EditorTitle/>} mutationMode="pessimistic">
        <SimpleForm toolbar={<NoDeleteEditorToolbar/>}>
            <TextInput source="name" validate={required('обязательное поле')}/>
        </SimpleForm>
    </Edit>
);