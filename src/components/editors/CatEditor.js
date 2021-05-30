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

const {API_URL} = process.env;

function checkCatNameUnique(name) {
    return fetch(`${API_URL}/cats/${name}?isSlug=true`)
        .then(res => res.json())
        .then(res => {
            console.log(!res, res);
            return !res;
        })
        .catch(err => err);
}

function checkIfHasChildren(id) {
    if ( !id ) return false;

    return fetch(`${API_URL}/cats?parent=${id}`)
        .then(res => res.json())
        .then(res => res.length > 0)
        .catch(err => err);
}

async function validateCat({ 
    name,
    slug,
    _id,
    parent
}) {
    try {
        if ( !name ) return { name: 'Обязательное поле.' };

        const errors = {};
        const newSlug = name.toLowerCase().replace(/\s/g, '_')
        const nameIsUnique = newSlug === slug || await checkCatNameUnique(newSlug);

        if ( !nameIsUnique ) errors.name = 'Категория с данным названием уже существует';

        const hasChildren = await checkIfHasChildren(_id);

        if ( parent && hasChildren ) errors.parent = 'Роительская категория не может быть выставлена, так как у текущей категории есть подкатегории.';

        return errors;
    } catch (error) {
        console.error(error);
    }
}

export const CatCreate = props => (
    <Create {...props} title="Создать категорию" mutationMode="pessimistic">
        <SimpleForm redirect="list" validate={validateCat}>
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

export const CatEdit = props => (
    <Edit {...props} title={<EditorTitle/>} mutationMode="pessimistic">
        <SimpleForm validate={validateCat}>
            <TextInput source="name" label="Название" validate={required('обязательное поле')}/>

            <ReferenceInput 
                source="parent" 
                reference="cats" 
                label="Родительская категория" 
                sort={{ field: 'name', order: 'ASC' }}
                filter={{ parent: null, exc: props.id }}
                allowEmpty
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);