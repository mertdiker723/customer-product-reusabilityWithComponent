import * as countriesAPI from "./fakeCountryService";
import * as brandsAPI from './fakeBrandService';

const products = [
    {
        _id: "5b21ca3eeb7f6fbccd471815",
        title: "Bilgisayar",
        brand: { _id: 1, name: "Apple" },
        country: { _id: "5b21ca3eeb7f6fbccd471818", name: "Turkey" },
        liked: true
    },
    {
        _id: "5b21ca3eeb7f6fbccd471816",
        title: "Laptop",
        brand: { _id: 2, name: "Casper" },
        country: { _id: "5b21ca3eeb7f6fbccd471818", name: "Turkey" },
        liked: false
    },
    {
        _id: "5b21ca3eeb7f6fbccd471817",
        title: "Telefon",
        brand: { _id: 3, name: "Samsung" },
        country: { _id: "5b21ca3eeb7f6fbccd471820", name: "Bulgaria" },
        liked: true
    },
    {
        _id: "5b21ca3eeb7f6fbccd471819",
        title: "Telefon",
        brand: { _id: 2, name: "Casper" },
        country: { _id: "5b21ca3eeb7f6fbccd471814", name: "Greece" },
        liked: false
    },
    {
        _id: "5b21ca3eeb7f6fbccd47181a",
        title: "Notebook",
        brand: { _id: 4, name: "Huawei" },
        country: { _id: "5b21ca3eeb7f6fbccd471814", name: "Greece" },
        liked: false
    },
    {
        _id: "5b21ca3eeb7f6fbccd47181b",
        title: "Camaşır Makinesi",
        brand: { _id: 3, name: "Samsung" },
        country: { _id: "5b21ca3eeb7f6fbccd471814", name: "Greece" },
        liked: false
    }
];

export function getProducts() {
    return products;
}


export function getProduct(id) {
    return products.find(m => m._id === id);
}

export function saveProduct(product) {
    let productInDb = products.find(m => m._id === product._id) || {};
    productInDb.title = product.title;
    productInDb.country = countriesAPI.countries.find(g => g._id === product.countryId);
    productInDb.brand = brandsAPI.brands.find(b => b._id === +product.brandId);

    if (!productInDb._id) {
        productInDb._id = Date.now().toString();
        products.push(productInDb);
    }

    return productInDb;
}

export function deleteProduct(id) {
    let productInDb = products.find(m => m._id === id);
    products.splice(products.indexOf(productInDb), 1);
    return productInDb;
}


