import React from 'react';
import {ImageField} from 'react-admin';

const {API_URL} = process.env;

export default ({ record = {} }) => (
    <ImageField 
        record={{...record, path: `${API_URL}/${record?.path}`}} 
        source={record?.undefined ? 'undefined' : 'path'}
    />
);