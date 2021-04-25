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

export const PostEdit = props => (
    <Edit {...props} title={<EditorTitle/>}>
        <TabbedForm>
            <FormTab label="Основное">
                <ImageInput source="image" label="Изображение" labelSingle="Выберите одно изображение">
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

            {/* TODO почему не обновляется текст? */}
            <FormTab label="Текст">
                <TextInput fullWidth={true} source="content" label="Содержание" validate={required('Обязательное поле')}/>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props} title="Создать пост">
        <TabbedForm>
            <FormTab label="Основное">
                <ImageInput source="image" label="Изображение" labelSingle="Выберите одно изображение">
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

            {/* TODO почему не обновляется текст? */}
            <FormTab label="Текст">
                <TextInput fullWidth={true} source="content" label="Содержание" validate={required('Обязательное поле')}/>            
            </FormTab>
        </TabbedForm>
    </Create>
);

const ReferenceArraySelect = ({additionalChoices = [], choices, ...rest}) => (
    <SelectArrayInput choices={choices.concat(additionalChoices)} optionText="name" optionValue="_id" {...rest}/>
);
