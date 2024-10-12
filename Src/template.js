const template = (type, email) => {
    return {
        "id": "string",
        "PartitionKey": "string",
        "GuidProperty": "10a798ba-120a-4e8f-914b-4755336ad5ac",
        "BoolProperty": false,
        "StringProperty": "string",
        "IntProperty": 123,
        "DateOnlyProperty": "2023-12-31",
        "DecimalProperty": 1.2345,
        "DictionaryProperty": {
            "a": "string", 
            "b": "string" ,
            "c": "string",
            "d": "string" 
        },
        "InnerItems": [
            {
                "Id": "10a798ba-120a-4e8f-914b-4755336ad5ac",
                "DateCreated": "2023-12-31T15:00:00+00:00",
                "TestFlag": false
            }
        ]
    }
};

export default template