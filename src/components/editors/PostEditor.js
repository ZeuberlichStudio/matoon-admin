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
    ImageField,
    FormDataConsumer
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

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
                    <ImageField source="src" title="name"/>
                </ImageInput>

                <TextInput source="name" label="Название"/>

                <SelectInput 
                    source="type" 
                    choices={typeChoices}
                    optionText="name"
                    optionValue="value"
                    label="Тип отображения"
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
                                <ReferenceArraySelect additionalChoices={staticPageChoices}/>
                            </ReferenceArrayInput>
                    }
                </FormDataConsumer>

                <TextInput source="link" label="Ссылка на кнопке"/>
            </FormTab>

            {/* TODO почему не обновляется текст? */}
            <FormTab label="Текст">
                <RichTextInput source="content" label="Содержание"/>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props} title="Создать пост">
        <TabbedForm>
            <FormTab label="Основное">
                <ImageInput source="image" label="Изображение" labelSingle="Выберите одно изображение">
                    <ImageField source="src" title="name"/>
                </ImageInput>

                <TextInput source="name" label="Название"/>

                <SelectInput 
                    source="type" 
                    choices={typeChoices}
                    optionText="name"
                    optionValue="value"
                    label="Тип отображения"
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
                                <ReferenceArraySelect additionalChoices={staticPageChoices}/>
                            </ReferenceArrayInput>
                    }
                </FormDataConsumer>

                <TextInput source="link" label="Ссылка на кнопке"/>
            </FormTab>

            {/* TODO почему не обновляется текст? */}
            <FormTab label="Текст">
                <RichTextInput source="content" label="Содержание"/>
            </FormTab>
        </TabbedForm>
    </Create>
);

const ReferenceArraySelect = ({additionalChoices = [], choices, ...rest}) => (
    <SelectArrayInput choices={choices.concat(additionalChoices)} optionText="name" optionValue="_id" {...rest}/>
);
