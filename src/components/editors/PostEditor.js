import React from 'react';
import {
    Create,
    Edit,
    TabbedForm,
    FormTab,
    SelectInput,
    SelectArrayInput,
    ReferenceArrayInput,
    TextInput,
    ImageInput,
    FormDataConsumer,
    required
} from 'react-admin';
import ImageField from '~/components/fields/ImageField';

const typeChoices = [
    {
        name: 'Сетка новостей',
        value: 'feed'
    },
    {
        name: 'Баннер',
        value: 'banner'
    }
]

const sizeChoices = [
    {
        name: "Маленький",
        value: "small"
    },
    {
        name: "Средний",
        value: "medium"
    },
    {
        name: "Большой",
        value: "big"
    }
]

const staticPageChoices = [
    { name: 'Главная', _id: 'main' },
    { name: 'Поиск', _id: 'search' }
]

const EditorTitle = ({record}) => <span>Редактировать {record.name}</span>;

const { API_URL } = process.env;

function getImagesByName(names) {
    return fetch(`${API_URL}/images?name=${names.join(',')}`)
        .then(res => res.json())
        .catch(err => err);
}

function checkPostNameUnique(name) {
    return fetch(`${API_URL}/posts/${name}?isSlug=true`)
        .then(res => res.json())
        .then(res => {
            console.log(!res, res);
            return !res;
        })
        .catch(err => err);
}

async function validatePost({ 
    name,
    slug
}) {
    try {
        if ( !name ) return { name: 'Обязательное поле.' };

        const errors = {};
        const newSlug = name.toLowerCase().replace(/\s/g, '_')
        const nameIsUnique = newSlug === slug || await checkPostNameUnique(newSlug);

        if ( !nameIsUnique ) errors.name = 'Пост с данным названием уже существует';

        return errors;
    } catch (error) {
        console.error(error);
    }
}

async function validateImages (images, max) {
    if ( images.length > max) return `Максимальное число изображений - ${max}`;

    if ( images.length > 0 ) {
        const files = images.filter(image => {
            console.log('el', image);
            return !!image?.rawFile;
        });

        if ( files.length == 0 ) return undefined;

        const fileNames = files.map(file => file.rawFile.name.split('.')[0] + '.jpeg');

        for (let i = 0; i < fileNames.length; i++) {
            if ( fileNames.indexOf(fileNames[i]) !== i ) return 'Некоторые файлы повторяются или имеют одинаковое название.';
        };

        const records = await getImagesByName(fileNames);
        
        if ( records.length > 0 ) {

            return 'Изображения с данным именем уже были загружены ранее: ' +
                records.map(rec => rec.name.split('.')[0]).join(', ') + ';' +
                '\nПереименуйте эти изображения или выберите другие.';
        }
    }

    return undefined;
}

const ReferenceArraySelect = ({additionalChoices = [], choices, ...rest}) => (
    <SelectArrayInput choices={choices.concat(additionalChoices)} optionText="name" optionValue="_id" {...rest}/>
);

export const PostCreate = props => (
    <Create {...props} title="Создать пост">
        <TabbedForm redirect="list" validate={validatePost}>
            <FormTab label="Основное">
                <ImageInput 
                    source="image" 
                    label="Изображение" 
                    labelSingle="Выберите одно изображение"
                    validate={v => validateImages([v], 1)}
                    maxSize={4000000}
                    accept="image/jpg,image/jpeg,image/png"
                >
                    <ImageField/>
                </ImageInput>

                <TextInput source="name" label="Заголовок" validate={required('Обязательное поле')}/>

                <SelectInput 
                    source="type" 
                    choices={typeChoices}
                    optionText="name"
                    optionValue="value"
                    label="Тип отображения"
                    validate={required('Обязательное поле')}
                />

                <FormDataConsumer>
                    {
                        ({formData, ...rest}) => formData.type === 'feed' ?
                            <SelectInput 
                                source="size" 
                                choices={sizeChoices}
                                optionText="name"
                                optionValue="value"
                                {...rest}
                                label="Размер в сетке"
                            /> :
                            <ReferenceArrayInput source="page" reference="cats" label="Страницы">
                                <ReferenceArraySelect additionalChoices={staticPageChoices} validate={required('Обязательное поле')}/>
                            </ReferenceArrayInput>
                    }
                </FormDataConsumer>

                <TextInput source="link" label="Ссылка на кнопке"/>
            </FormTab>

            <FormTab label="Текст">
                <TextInput fullWidth={true} source="shortDesc" label="Краткое соержание" multiline />            
                <TextInput fullWidth={true} source="content" label="Содержание" validate={required('Обязательное поле')} multiline />            
            </FormTab>
        </TabbedForm>
    </Create>
);

export const PostEdit = props => (
    <Edit {...props} title={<EditorTitle/>}>
        <TabbedForm validate={validatePost}>
            <FormTab label="Основное">
                <ImageInput 
                    source="image" 
                    label="Изображение" 
                    labelSingle="Выберите одно изображение"
                    validate={v => validateImages([v], 1)}
                    maxSize={4000000}
                    accept="image/jpg,image/jpeg,image/png"
                >
                    <ImageField/>
                </ImageInput>

                <TextInput source="name" label="Заголовок" validate={required('Обязательное поле')}/>

                <SelectInput 
                    source="type" 
                    choices={typeChoices}
                    optionText="name"
                    optionValue="value"
                    label="Тип отображения"
                    validate={required('Обязательное поле')}
                />

                <FormDataConsumer>
                    {
                        ({formData, ...rest}) => formData.type === 'feed' ?
                            <SelectInput 
                                source="size" 
                                choices={sizeChoices}
                                optionText="name"
                                optionValue="value"
                                {...rest}
                                label="Размер в сетке"
                                validate={required('Обязательное поле')}
                            /> :
                            <ReferenceArrayInput source="page" reference="cats" label="Страницы">
                                <ReferenceArraySelect additionalChoices={staticPageChoices} validate={required('Обязательное поле')}/>
                            </ReferenceArrayInput>
                    }
                </FormDataConsumer>

                <TextInput source="link" label="Ссылка на кнопке"/>
            </FormTab>

            <FormTab label="Текст">
                <TextInput fullWidth={true} source="shortDesc" label="Краткое соержание" multiline />            
                <TextInput fullWidth={true} source="content" label="Содержание" validate={required('Обязательное поле')} multiline />
            </FormTab>
        </TabbedForm>
    </Edit>
);