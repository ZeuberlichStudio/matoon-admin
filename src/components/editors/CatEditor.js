import React from 'react';
import {
    Create,
    Edit,
    SimpleForm,
    ReferenceInput,
    TextInput,
    required,
    AutocompleteInput
} from 'react-admin';

const EditorTitle = ({record}) => <span>Редактировать {record.name}</span>;

export const CatEdit = props => (
    <Edit {...props} title={<EditorTitle/>}>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required('обязательное поле')}/>

            <ReferenceInput 
                source="parent" 
                reference="cats" 
                label="Родительская категория" 
                sort={{ field: 'name', order: 'ASC' }}
                filter={{ parent: null }}
                allowEmpty
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const CatCreate = props => (
    <Create {...props} title="Создать категорию">
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required('обязательное поле')}/>

            <ReferenceInput 
                source="parent" 
                reference="cats" 
                label="Родительская категория" 
                sort={{ field: 'name', order: 'ASC' }} 
                filter={{ parent: null }}
                allowEmpty
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);