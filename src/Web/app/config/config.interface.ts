export interface ObjectConfig {
    Id: string,
    Title: string,
    Properties: ObjectPropery[]
}

export interface ObjectPropery {
    Id: string,
    Name: string,
    Type: PropertyType,
    IsRequired: boolean,
    Regex: RegExp,
    MinValue: any,
    MaxValue: any,
    IsRequiredErrorMessage: string;
    RegexErrorMessage: string,
    MinValueErrorMessage: string,
    MaxValueErrorMessage: string,
    IsMultiSelect: boolean,
    ListItems: { [id: string]: any; }
}

export enum PropertyType {
    None,
    Number,
    String,
    Boolean,
    Date,
    Object,
    List
}

export interface ObjectValue {
    Id: string,
    ObjectConfigId: string,
    Properties: { [id: string]: any; }
}