import React from 'react';
import {
    Create,
    Edit,
    TabbedForm,
    FormTab,
    ReferenceInput,
    ReferenceArrayInput,
    SelectInput,
    TextInput,
    NumberInput,
    ArrayInput,
    SimpleFormIterator,
    AutocompleteInput,
    ImageInput,
    ImageField,
    SelectArrayInput
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

const forChoices = [
    {
        name: "Унисекс",
        value: "unisex"
    },
    {
        name: "Для мужчин",
        value: "male"
    },
    {
        name: "Для женщин",
        value: "female"
    }
]

const EditTitle = ({record}) => <span>Редактировать {record.sku}</span>;

export const ProductEdit = props => (
    <Edit {...props} title={<EditTitle/>}>
        <TabbedForm>
            <FormTab label="Основное">
                <ImageInput source="images" label="Общие изображения" labelMultiple="Выберите до 3-х изображений" multiple>
                    <ImageField source="src" title="name"/>
                </ImageInput>

                <TextInput source="name" label="Название"/>
                <TextInput source="sku" label="Артикул"/>

                <ReferenceInput source="cat" reference="cats" label="Категория">
                    <SelectInput optionText="name" optionValue="_id"/>
                </ReferenceInput>

                <SelectInput 
                    source="for" 
                    choices={forChoices}
                    optionText="name"
                    optionValue="value"
                    label="Для"
                />

                <ReferenceArrayInput  source="materials" reference="materials" label="Материалы">
                    <SelectArrayInput optionText="name" optionValue="_id"/>
                </ReferenceArrayInput >
            </FormTab>

            <FormTab label="Описание">
                <RichTextInput source="desc" label="Описание"/>
            </FormTab>

            <FormTab label="Вариации/наличие">
                <ArrayInput source="variants" label="">
                    <SimpleFormIterator>
                        <ImageInput source="images" label="Изображения вариации" labelMultiple="Выберите до 2-х изображений" multiple>
                            <ImageField source="src" title="name"/>
                        </ImageInput>

                        <ReferenceInput source="attributes.color" reference="colors" label="Цвет">  
                            <SelectInput optionText="name" optionValue="_id"/>
                        </ReferenceInput>

                        <ReferenceInput source="attributes.brand" reference="brands" label="Бренд">  
                            <AutocompleteInput optionText="name" optionValue="_id"/>
                        </ReferenceInput>

                        <NumberInput source="stock" label="Наличие"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>

            {/* TODO добавить возможность добавления товара с одним атрибутом */}
            <FormTab label="Спецификации">
                <ArrayInput source="specs" label="">
                    <SimpleFormIterator>
                        <TextInput source="[0]" label="Название"/>
                        <TextInput source="[1]" label="Значение"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>

            {/* TODO проверить валидацию минимального кол-ва */}
            <FormTab label="Цены">
                <ArrayInput source="prices" label="">
                    <SimpleFormIterator>
                        <TextInput source="minQty" label="Мин. необходимое кол-во"/>
                        <TextInput source="amount" label="Цена за штуку"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>

            {/* TODO перевести все выходные занчения во float */}
            <FormTab label="Вес/габариты">
                <NumberInput 
                    source="shippingDetails.dimensions.w" 
                    label="Ширина"
                />
                <NumberInput 
                    source="shippingDetails.dimensions.l"
                    label="Длина"
                />
                <NumberInput 
                    source="shippingDetails.dimensions.h"
                    label="Высота"
                />
                <NumberInput 
                    source="shippingDetails.weight"
                    label="Вес"

                />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const ProductCreate = props => (
    <Create {...props} title="Создать товар">
        <TabbedForm>
            <FormTab label="Основное">
                <ImageInput source="images" label="Общие изображения" labelMultiple="Выберите до 3-х изображений" multiple>
                    <ImageField source="src" title="name"/>
                </ImageInput>

                <TextInput source="name" label="Название"/>
                <TextInput source="sku" label="Артикул"/>

                <ReferenceInput source="cat" reference="cats" label="Категория">
                    <SelectInput optionText="name" optionValue="_id"/>
                </ReferenceInput>

                <SelectInput 
                    source="for" 
                    choices={forChoices}
                    optionText="name"
                    optionValue="value"
                    label="Для"
                />

                <ReferenceInput source="materials" reference="materials" label="Материалы">
                    <SelectArrayInput optionText="name" optionValue="_id"/>
                </ReferenceInput>
            </FormTab>

            <FormTab label="Описание">
                <RichTextInput source="desc" label="Описание"/>
            </FormTab>

            <FormTab label="Вариации/наличие">
                <ArrayInput source="variants" label="">
                    <SimpleFormIterator>
                        <ImageInput source="images" label="Изображения вариации" labelMultiple="Выберите до 2-х изображений" multiple>
                            <ImageField source="src" title="name"/>
                        </ImageInput>

                        <ReferenceInput source="attributes.color" reference="colors" label="Цвет">  
                            <SelectInput optionText="name" optionValue="_id"/>
                        </ReferenceInput>

                        <ReferenceInput source="attributes.brand" reference="brands" label="Бренд">  
                            <AutocompleteInput optionText="name" optionValue="_id"/>
                        </ReferenceInput>

                        <NumberInput source="stock" label="Наличие"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>

            {/* TODO добавить возможность добавления товара с одним атрибутом */}
            <FormTab label="Спецификации">
                <ArrayInput source="specs" label="">
                    <SimpleFormIterator>
                        <TextInput source="[0]" label="Название"/>
                        <TextInput source="[1]" label="Значение"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>

            {/* TODO проверить валидацию минимального кол-ва */}
            <FormTab label="Цены">
                <ArrayInput source="prices" label="">
                    <SimpleFormIterator>
                        <TextInput source="minQty" label="Мин. необходимое кол-во"/>
                        <TextInput source="amount" label="Цена за штуку"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>

            {/* TODO перевести все выходные занчения во float */}
            <FormTab label="Вес/габариты">
                <NumberInput 
                    source="shippingDetails.dimensions.w" 
                    label="Ширина"
                />
                <NumberInput 
                    source="shippingDetails.dimensions.l"
                    label="Длина"
                />
                <NumberInput 
                    source="shippingDetails.dimensions.h"
                    label="Высота"
                />
                <NumberInput 
                    source="shippingDetails.weight"
                    label="Вес"

                />
            </FormTab>
        </TabbedForm>
    </Create>
);