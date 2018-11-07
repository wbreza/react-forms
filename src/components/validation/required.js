import Validator from './validator';

export default class RequiredValidator extends Validator {
    constructor(options, fieldSchema) {
        const opts = Object.assign({
            message: `${fieldSchema.label} is required`
        }, options);

        super(opts, fieldSchema);
    }

    validate(value) {
        if (!!value) {
            return true;
        }

        return false;
    }
}