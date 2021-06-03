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
    AutocompleteArrayInput,
    BooleanInput,
    required,
    useInput
} from 'react-admin';
import CustomImageField from '~/components/fields/ImageField';
import slugify from '../../helpers/slugify';

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

const defaultValues = {
    images: [],
    variants: [
        {
            images: [],
            attributes: {
                color: null,
                brand: null
            }
        }
    ],
    prices: [
        {
            minQty: 1,
            amount: null
        }
    ]
};

const { API_URL } = process.env;

function checkProductSkuUnique(sku) {
    return fetch(`${API_URL}/products/${sku}?isSlug=true`)
        .then(res => res.json())
        .then(res => !res)
        .catch(err => err);
}

function getImagesByName(names) {
    return fetch(`${API_URL}/images?name=${names.join(',')}`)
        .then(res => res.json())
        .catch(err => err);
}

async function validateProduct ({
    name,
    sku,
    variants,
    prices,
    slug
}) {
    try {
        const errors = {};
        
        if ( !name ) errors.name = 'Обязательное поле';
        if ( !sku ) errors.sku = 'Обязательное поле';
        if ( variants?.length < 1 ) errors.variants = 'Укажите минимум одну вариацию товара';
        if ( prices?.length < 1 ) errors.prices = 'Укажите минимум одну оптовую цену';

        if ( !sku ) return errors;
    
        const newSlug = slugify(sku);
        const skuIsUnique = slug === newSlug || await checkProductSkuUnique(newSlug);
        if ( !skuIsUnique ) errors.sku = 'Товар с данным артикулом уже существует';
    
        return errors;   
    } catch (error) {
        console.error(error);
    }
}

function validatePriceQty (value, {prices}, input) {
    const priceIndex = input.name.match(/\d/)[0];
    if ( priceIndex == 0 && value != 1 ) return 'Мин. кол-во заказанного товара для первой цены должно быть 1';
    if ( Number.parseInt(value) < Number.parseInt(prices[priceIndex - 1]?.minQty) ) return 'Мин. кол-во заказанного товара должно быть больше, чем для предыдущей цены';
    else return undefined;
}

async function validateImages (images, max) {
    if ( images?.length > max) return `Максимальное число изображений - ${max}`;

    if ( images?.length > 0 ) {
        const files = images.filter(image => !!image.rawFile);

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

const EditTitle = ({record}) => <span>Редактировать {record.sku}</span>;

export function ProductEdit(props) {
    return (
        <Edit {...props} title={<EditTitle/>} mutationMode="pessimistic">
            <TabbedForm validate={values => validateProduct(values, props.id)}>
                <FormTab label="Основное">
                    <ImageInput 
                        source="images" 
                        label="Общие изображения товара" 
                        labelMultiple="Выберите до 3-х изображений" 
                        multiple
                        validate={v => validateImages(v, 3)}
                        maxSize={4000000}
                        accept="image/jpg,image/jpeg,image/png"
                    >
                        <CustomImageField/>
                    </ImageInput>

                    <TextInput source="name" label="Название"/>
                    <TextInput source="sku" label="Артикул"/>

                    <ReferenceInput 
                        source="cat" 
                        reference="cats" 
                        label="Категория"
                        sort={{ field: 'name', order: 'ASC' }}
                        perPage={100}
                    >
                        <SelectInput optionText="name" optionValue="_id"/>
                    </ReferenceInput>

                    <SelectInput 
                        source="for" 
                        choices={forChoices}
                        optionText="name"
                        optionValue="value"
                        label="Для"
                    />

                    <ReferenceArrayInput source="materials" reference="materials" label="Материалы">
                        <AutocompleteArrayInput optionText="name" optionValue="_id" perPage={200}/>
                    </ReferenceArrayInput>

                    <BooleanInput source='isPublished'/>
                </FormTab>

                <FormTab label="Описание">
                    <TextInput fullWidth={true} source="shortDesc" label="Краткое описание" multiline />
                    <TextInput fullWidth={true} source="desc" label="Описание" multiline />
                </FormTab>

                <FormTab label="Вариации/наличие">
                    <ArrayInput source="variants" label="">
                        <SimpleFormIterator>
                            <ImageInput 
                                source="images" 
                                label="Изображения вариации" 
                                labelMultiple="Выберите до 2-х изображений"
                                multiple
                                validate={v => validateImages(v, 2)}
                                maxSize={4000000}
                                accept="image/jpg,image/jpeg,image/png"
                            >
                                <CustomImageField/>
                            </ImageInput>

                            <ReferenceInput 
                                source="attributes.color._id" 
                                reference="colors" 
                                label="Цвет" 
                                sort={{ field: 'name', order: 'ASC' }}
                                validate={required('Обязательное поле')}
                                perPage={200}
                            >  
                                <AutocompleteInput optionText="name" optionValue="_id" />
                            </ReferenceInput>

                            <ReferenceInput 
                                source="attributes.brand._id" 
                                reference="brands" 
                                label="Бренд" 
                                sort={{ field: 'name', order: 'ASC' }}
                                validate={required('Обязательное поле')}
                                perPage={200}
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

export function ProductCreate(props) {
    return (
        <Create {...props} title="Создать товар" mutationMode="pessimistic">
            <TabbedForm validate={validateProduct} initialValues={defaultValues} redirect="list">
                <FormTab label="Основное">
                    <ImageInput 
                        source="images" 
                        label="Общие изображения товара" 
                        labelMultiple="Выберите до 3-х изображений" 
                        multiple
                        validate={v => validateImages(v, 3)}
                        maxSize={4000000}
                        accept="image/jpg,image/jpeg,image/png"
                    >
                        <ImageField source="src" title="name"/>
                    </ImageInput>

                    <TextInput source="name" label="Название"/>
                    <TextInput source="sku" label="Артикул"/>

                    <ReferenceInput 
                        source="cat" 
                        reference="cats" 
                        label="Категория"
                        sort={{ field: 'name', order: 'ASC' }}
                        perPage={100}
                    >
                        <AutocompleteInput optionText="name" optionValue="_id"/>
                    </ReferenceInput>

                    <SelectInput 
                        source="for" 
                        choices={forChoices}
                        optionText="name"
                        optionValue="value"
                        label="Для"
                    />

                    <ReferenceInput 
                        source="materials" 
                        reference="materials" 
                        label="Материалы"
                        sort={{ field: 'name', order: 'ASC' }}
                        perPage={200}
                    >
                        <AutocompleteArrayInput optionText="name" optionValue="_id"/>
                    </ReferenceInput>

                    <BooleanInput source='isPublished'/>
                </FormTab>

                <FormTab label="Описание">
                    <TextInput fullWidth={true} source="shortDesc" label="Краткое описание" multiline />
                    <TextInput fullWidth={true} source="desc" label="Описание" multiline />
                </FormTab>

                <FormTab label="Вариации/наличие">
                    <ArrayInput source="variants">
                        <SimpleFormIterator>
                            <ImageInput 
                                source="images" 
                                label="Изображения вариации" 
                                labelMultiple="Выберите до 2-х изображений" 
                                multiple
                                validate={v => validateImages(v, 2)}
                                maxSize={4000000}
                                accept="image/jpg,image/jpeg,image/png"
                            >
                                <ImageField source="src" title="name"/>
                            </ImageInput>

                            <ReferenceInput 
                                source="attributes.color" 
                                reference="colors" 
                                label="Цвет" 
                                sort={{ field: 'name', order: 'ASC' }}
                                validate={required('Обязательное поле')}
                                perPage={200}
                            >  
                                <AutocompleteInput optionText="name" optionValue="_id"/>
                            </ReferenceInput>

                            <ReferenceInput 
                                source="attributes.brand" 
                                reference="brands" 
                                label="Бренд" 
                                validate={required('Обязательное поле')}
                                sort={{ field: 'name', order: 'ASC' }}
                                perPage={200}
                            >  
                                <AutocompleteInput optionText="name" optionValue="_id"/>
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
                            <NumberInput source="minQty" label="Мин. необходимое кол-во" validate={validatePriceQty}/>
                            <NumberInput source="amount" label="Цена за штуку" validate={required('Обязательное поле')}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>

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
        </Create>
    );
}