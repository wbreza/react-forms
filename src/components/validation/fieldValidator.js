export default class FieldValidator {
    constructor(fieldSchema, validationTypes) {
        this.fieldSchema = fieldSchema;
        const validation = fieldSchema.validation || {};

        this.validators = Object.keys(validation).map(validationKey => {
            const validatorFactory = validationTypes[validationKey];
            if (validatorFactory) {
                const validationOptions = this.fieldSchema.validation[validationKey];
                return {
                    type: validationKey,
                    validator: validatorFactory(validationOptions, this.fieldSchema)
                };
            }

            return null;
        }, this);
    }

    validate = (value) => {
        return new Promise((resolve, reject) => {
            const errors = [];
            this.validators.forEach(registration => {
                if (!registration.validator.validate(value)) {
                    errors.push({
                        message: registration.validator.options.message
                    });
                }
            }, this);

            resolve(errors);
        });
    }
}