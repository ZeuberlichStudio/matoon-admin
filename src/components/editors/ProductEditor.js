import React from 'react';
import {
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
    SelectArrayInput,
    BooleanInput,
    required,

    useReferenceArrayInputContext
} from 'react-admin';
import ImageField from '~/components/fields/ImageField';

const MyComp = ({input, ...props}) => {

    React.useEffect(() => {console.log({input, ...props})}, [])

    return (
        <>
            <span>{input.value._id}</span>
            <AutocompleteInput {...props} input={input}/>
        </>
    );
}

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

function validateProduct ({
    name,
    sku,
    variants,
    prices
}) {
    const errors = {};

    if ( !name ) errors.name = 'Обязательное поле';
    if ( !sku ) errors.sku = 'Обязательное поле';
    if ( variants?.length < 1 ) errors.variants = 'Укажите минимум одну вариацию товара';
    if ( prices?.length < 1 ) errors.prices = 'Укажите минимум одну оптовую цену';

    return errors;
}

function validatePriceQty (value, {prices}, input) {
    const priceIndex = input.name.match(/\d/)[0];
    if ( priceIndex == 0 && value != 1 ) return 'Мин. кол-во заказанного товара для первой цены должно быть 1';
    if ( value < prices[priceIndex - 1]?.minQty ) return 'Мин. кол-во заказанного товара должно быть больше, чем для предыдущей цены';
    else return undefined;
}

export default function ProductEdit(props) {
    return (
        <Edit {...props} title={<EditTitle/>}>
            <TabbedForm validate={validateProduct}>
                <FormTab label="Основное">
                    <ImageInput 
                        source="images" 
                        label="Общие изображения товара" 
                        labelMultiple="Выберите до 3-х изображений" 
                        multiple
                    >
                        <ImageField/>
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

                    <BooleanInput source='isPublished'/>
                </FormTab>

                <FormTab label="Описание">
                    <TextInput fullWidth={true} source="shortDesc" label="Краткое описание"/>
                    <TextInput fullWidth={true} source="desc" label="Описание"/>
                </FormTab>

                <FormTab label="Вариации/наличие">
                    <ArrayInput source="variants" label="">
                        <SimpleFormIterator>
                            <ImageInput source="images" label="Изображения вариации" labelMultiple="Выберите до 2-х изображений" multiple>
                                <ImageField/>
                            </ImageInput>

                            <ReferenceInput 
                                source="attributes.color._id" 
                                reference="colors" 
                                label="Цвет" 
                                validate={required('Обязательное поле')}
                            >  
                                <AutocompleteInput optionText="name" optionValue="_id" />
                            </ReferenceInput>

                            <ReferenceInput 
                                source="attributes.brand._id" 
                                reference="brands" 
                                label="Бренд" 
                                validate={required('Обязательное поле')}
                            >  
                                <AutocompleteInput optionText="name" optionValue="_id" />
                            </ReferenceInput>

                            <NumberInput source="stock" label="Наличие" validate={required('Обязательное поле')}/>
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
                            <TextInput source="minQty" label="Мин. необходимое кол-во" validate={validatePriceQty}/>
                            <TextInput source="amount" label="Цена за штуку" validate={required('Обязательное поле')}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>

                {/* TODO перевести все выходные занчения во float */}
                <FormTab label="Вес/габариты">
                    <NumberInput 
                        source="shippingDetails.dimensions.w" 
                        label="Ширина (мм)"
                    />
                    <NumberInput 
                        source="shippingDetails.dimensions.l"
                        label="Длина (мм)"
                    />
                    <NumberInput 
                        source="shippingDetails.dimensions.h"
                        label="Высота (мм)"
                    />
                    <NumberInput 
                        source="shippingDetails.weight"
                        label="Вес (г)"

                    />
                </FormTab>
            </TabbedForm>
        </Edit>
    )
};