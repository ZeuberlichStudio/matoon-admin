import React from 'react';
import {
    TopToolbar,
    CreateButton,
    useListContext
} from 'react-admin';

export default function ListToolbar(props) {

    const { basePath } = useListContext(props);

    return (
        <TopToolbar {...props}>
            <CreateButton basePath={basePath}/>
        </TopToolbar>
    );
}
