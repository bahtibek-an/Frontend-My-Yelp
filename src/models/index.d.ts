import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type RestaurantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Restaurant {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly location: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Restaurant, RestaurantMetaData>);
  static copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant, RestaurantMetaData>) => MutableModel<Restaurant, RestaurantMetaData> | void): Restaurant;
}