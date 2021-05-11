import dataProvider from './dataProvider';

const {API_URL} = process.env;

export default {
    ...dataProvider,
    
    async update(resource, params) {
        if ( resource === 'products' ) {
            const {images, variants} = params.data;
            const allImages = [].concat.apply(
                images || [], 
                variants?.map(variant => variant.images || []) || []
            );
            const files = filterFiles(allImages);
    
            if ( files.length == 0 ) return dataProvider.update(resource, params);
            else return uploadImages(files)
                .then(result => dataProvider.update(`products`, {
                    ...params,
                    data: {
                        ...params.data, 
                        images: replaceFilesWithRecordIds(images, result),
                        variants: variants.map(variant => ({
                            ...variant, 
                            images: replaceFilesWithRecordIds(variant.images, result) 
                        }))
                    }
                }));
        }
        else if ( resource === 'posts' ) {
            const {image} = params.data;
            const files = filterFiles(image ? [image]: []);

            if ( files.length == 0 ) return dataProvider.update(resource, params);
            else return uploadImages(files)
                .then(result => dataProvider.update('posts', {
                    ...params,
                    data: {
                        ...params.data,
                        image: result[0]._id
                    }
                }));
        }
        else return dataProvider.update(resource, params);
    },

    async create(resource, params) {
        if ( resource === 'products' ) {
            const {images, variants} = params.data;
            const allImages = [].concat.apply(
                images || [], 
                variants?.map(variant => variant.images || []) || []
            );
            const files = filterFiles(allImages);

            if ( files.length == 0 ) return dataProvider.create(resource, params);
            else return uploadImages(files)
                .then(result => dataProvider.create(`products`, {
                    ...params,
                    data: {
                        ...params.data, 
                        images: images ? replaceFilesWithRecordIds(images, result) : [],
                        variants: variants.map(({images, ...rest}) => ({
                            ...rest, 
                            images: images ? replaceFilesWithRecordIds(images, result) : []
                        }))
                    }
                }));
        }
        else if ( resource === 'posts' ) {
            const {image} = params.data;
            const files = filterFiles([image]);

            if ( files.length == 0 ) return dataProvider.create(resource, params);
            else return uploadImages(files)
                .then(result => dataProvider.create('posts', {
                    ...params,
                    data: {
                        ...params.data,
                        image: result[0]._id
                    }
                }));
        }
        else return dataProvider.create(resource, params);
    }
}

function filterFiles(images) {
    return images.map(({rawFile}) => rawFile instanceof File ? rawFile : false).filter(Boolean);
}

function uploadImages(files, key = 'images') {
    const formData = new FormData();
    
    files.forEach(file => {
        formData.append(key, file);
    });

    return fetch(`${API_URL}/images`, {
        method: 'POST',
        body: formData
    })
        .then(data => data.json())
        .catch(console.error);
}

function replaceFilesWithRecordIds(images, records) {
    return images.map(image => {
        if ( image._id ) return image._id;
        else return records.find(record => record.name.includes(image.rawFile.name));
    });
}