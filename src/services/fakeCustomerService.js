import * as countriesAPI from "./fakeCountryService";
import * as gendersAPI from "./fakeGenderService";

const customers = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Hasan Masan",
    country: { _id: "5b21ca3eeb7f6fbccd471818", name: "Turkey" },
    age: 26,
    gender: { _id: 1, name: "Male" },
    liked: true
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Zalo Malo",
    country: { _id: "5b21ca3eeb7f6fbccd471818", name: "Turkey" },
    age: 52,
    gender: { _id: 2, name: "Female" },
    liked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Ayşe Mayşe",
    country: { _id: "5b21ca3eeb7f6fbccd471820", name: "Bulgaria" },
    age: 38,
    gender: { _id: 2, name: "Female" },
    liked: true
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Test Deneme",
    country: { _id: "5b21ca3eeb7f6fbccd471814", name: "Greece" },
    age: 67,
    gender: { _id: 1, name: "Male" },
    liked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Hatçe Matçe",
    country: { _id: "5b21ca3eeb7f6fbccd471814", name: "Greece" },
    age: 77,
    gender: { _id: 2, name: "Female" },
    liked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Kıro Mıro",
    country: { _id: "5b21ca3eeb7f6fbccd471814", name: "Greece" },
    age: 27,
    gender: { _id: 1, name: "Male" },
    liked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Mahmut Falan",
    country: { _id: "5b21ca3eeb7f6fbccd471820", name: "Bulgaria" },
    age: 37,
    gender: { _id: 1, name: "Male" },
    liked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Satılmış Matılmış",
    country: { _id: "5b21ca3eeb7f6fbccd471820", name: "Bulgaria" },
    age: 44,
    gender: { _id: 1, name: "Male" },
    liked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Hırbo Mırbo",
    country: { _id: "5b21ca3eeb7f6fbccd471818", name: "Turkey" },
    age: 57,
    gender: { _id: 1, name: "Male" },
    liked: false
  }
];

export function getCustomers() {
  return customers;
}


export function getCustomer(id) {
  return customers.find(m => m._id === id);
}

export function saveCustomer(customer) {
  let customerInDb = customers.find(m => m._id === customer._id) || {};
  customerInDb.title = customer.title;
  customerInDb.country = countriesAPI.countries.find(c => c._id === customer.countriesId);
  customerInDb.age = customer.age;
  customerInDb.gender = gendersAPI.genders.find(g => g._id === customer.genderId);

  if (!customerInDb._id) {
    customerInDb._id = Date.now().toString();
    customers.push(customerInDb);
  }

  return customerInDb;
}

export function deleteCustomer(id) {
  let customerInDb = customers.find(m => m._id === id);
  customers.splice(customers.indexOf(customerInDb), 1);
  return customerInDb;
}


