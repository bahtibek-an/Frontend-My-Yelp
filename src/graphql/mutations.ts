// tslint:disable
// this is an auto generated file. This will be overwritten

export const createRestaurant = `mutation CreateRestaurant(
  $input: CreateRestaurantInput!
  $condition: ModelRestaurantConditionInput
) {
  createRestaurant(input: $input, condition: $condition) {
    id
    clientId
    name
    description
    city
  }
}
`;
export const updateRestaurant = `mutation UpdateRestaurant(
  $input: UpdateRestaurantInput!
  $condition: ModelRestaurantConditionInput
) {
  updateRestaurant(input: $input, condition: $condition) {
    id
    clientId
    name
    description
    city
  }
}
`;
export const deleteRestaurant = `mutation DeleteRestaurant(
  $input: DeleteRestaurantInput!
  $condition: ModelRestaurantConditionInput
) {
  deleteRestaurant(input: $input, condition: $condition) {
    id
    clientId
    name
    description
    city
  }
}
`;
