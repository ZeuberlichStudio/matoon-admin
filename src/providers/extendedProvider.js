import dataProvider from './dataProvider';
import AWS from 'aws-sdk';

export default {
    ...dataProvider,

    async update(resource, params) {
        if ( resource === 'products' ) {
            const {images, variants} = params.data;
            const newImages = filterFiles([].concat.apply(images, variants.map(variant => variant.images)));
    
            return uploadToS3(newImages, 'products')
                .then(result => dataProvider.create('images', {
                    data: result.map(uploadToImage)
                }))
                .then(result => dataProvider.update(`products`, {
                    ...params,
                    data: {
                        ...params.data, 
                        images: replaceImagesWithIds(images, result.data),
                        variants: variants.map(variant => ({
                            ...variant, 
                            images: replaceImagesWithIds(variant.images, result.data) 
                        }))
                    }
                }));
        }
        else if ( resource === 'posts' ) {
            return uploadToS3([params.data.image], 'posts')
                .then(result => dataProvider.create('images', {
                    data: result.map(uploadToImage)
                }))
                .then(result => dataProvider.create('posts', {
                    ...params,
                    data: {
                        ...params.data,
                        image: result.data[0]._id
                    }
                }));
        }
        else return dataProvider.update(resource, params);
    },

    async create(resource, params) {
        if ( resource === 'products' ) {
            const {images, variants} = params.data;
            const newImages = filterFiles([].concat.apply(images, variants.map(variant => variant.images)));
    
            return uploadToS3(newImages, 'products')
                .then(result => dataProvider.create('images', {
                    data: result.map(uploadToImage)
                }))
                .then(result => dataProvider.update(`products`, {
                    ...params,
                    data: {
                        ...params.data, 
                        images: replaceImagesWithIds(images, result.data),
                        variants: variants.map(variant => ({
                            ...variant, 
                            images: replaceImagesWithIds(variant.images, result.data) 
                        }))
                    }
                }));
        }
        else if ( resource === 'posts' ) {
            return uploadToS3([params.data.image], 'posts')
                .then(result => dataProvider.create('images', {
                    data: result.map(uploadToImage)
                }))
                .then(result => dataProvider.create('posts', {
                    ...params,
                    data: {
                        ...params.data,
                        image: result.data[0]._id
                    }
                }));
        }
        else return dataProvider.create(resource, params);
    }
}

function uploadToS3(files, album = '') {
    const accessKeyId = 'AKIAIF7ZFGDSKWREXGZQ';
    const secretAccessKey = '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';
    const bucket = 'matoon-test';

    const s3 = new AWS.S3({
        accessKeyId,
        secretAccessKey
    });

    const uploads = files.map(file => s3.upload({
        Bucket: bucket,
        ContentType: 'image/jpeg',
        ACL: "public-read",
        Key: `${album}/${file.name}`,
        Body: file.rawFile
    }).promise());

    return Promise.all(uploads);
}

function filterFiles(images) {
    return images.filter(image => image.rawFile instanceof File);
}

function replaceImagesWithIds(allImages, newimages) {
    return allImages.map(image => {
        if ( image._id ) return image._id;
        else return newimages.find(newImage => image.name === newImage.name);
    });
}

function uploadToImage(upload) {
    const {Key, Location} = upload;

    return {
        name: Key.split('/').pop(),
        path: Key,
        src: Location
    }
}