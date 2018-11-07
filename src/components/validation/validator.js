export default class Validator {
    constructor(options, fieldSchema) {
        this.options = options;
        this.fieldSchema = fieldSchema;
    }

    validate(value) {
        return false;
    }
}