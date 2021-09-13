export const genders = [
    { _id: 1, name: "Male" },
    { _id: 2, name: "Female" }
];

export function getGenders() {
    return genders.filter(g => g);
}
