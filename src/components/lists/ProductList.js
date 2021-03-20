import React from 'react';
import { 
    List, Datagrid, ReferenceField, TextField, NumberField, DateField, ArrayField,
    SingleFieldList, ChipField, BooleanField
} from 'react-admin';

const ProductList = props => (
    <List {...props} title="Товары">
        <Datagrid rowClick="edit">
            <BooleanField source="isPublished" label="Опубликован" />
            <TextField source="sku" label="Артикул" />
            <TextField source="name" label="Название" />

            <ReferenceField source="cat._id" reference="cats" label="Категория">
                <ChipField source="name" />
            </ReferenceField>

            {/* TODO написать поле для максимальной\минимальной цены */}
            <NumberField source="minPrice" options={{ style: 'currency', currency: 'RUB' }} label="Мин. цена" />
            <NumberField source="maxPrice" options={{ style: 'currency', currency: 'RUB' }} label="Макс. цена" />

            <DateField source="meta.createdAt" label="Создан" />
            <DateField source="meta.updatedAt" label="Обновлён" />
        </Datagrid>
    </List>
);

export default ProductList;