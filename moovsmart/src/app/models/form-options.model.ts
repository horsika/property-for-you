import {PropertyTypeFormListItemModel} from "./property-type-form-list-item.model";
import {HeatingTypeFormListItemModel} from "./heating-type-form-list-item.model";

export interface FormOptionsModel {
    propertyTypes: PropertyTypeFormListItemModel[];
    heatingTypes: HeatingTypeFormListItemModel[];
}
