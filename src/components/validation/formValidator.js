import FieldValidator from './fieldValidator';
import RequiredValidator from './required';
import LengthValidator from './length';

class FormValidator {
    constructor(formSchema) {
        this.formSchema = formSchema;
        this.validators = {};

        Object.keys(this.formSchema.properties)
            .forEach(fieldKey => {
                this.validators[fieldKey] = new FieldValidator(this.formSchema.properties[fieldKey], FormValidator.validationTypes)
            }, this);
    }

    validate = (form) => {
        const formValues = form.state.value;

        return new Promise((resolve, reject) => {
            const allErrors = [];

            const validationResults = Object.keys(form.refs).map(fieldKey => {
                const component = form.refs[fieldKey];
                return component.validate(formValues[fieldKey]);
            }, this);

            Promise.all(validationResults).then(results => {
                results.forEach(errors => {
                    allErrors.push.apply(allErrors, errors);
                });

                resolve(allErrors);
            });
        });
    }
}

FormValidator.validationTypes = {};

FormValidator.register = (type, factory) => {
    FormValidator.validationTypes[type] = factory;
}

FormValidator.register('required', (options, fieldSchema) => new RequiredValidator(options, fieldSchema));
FormValidator.register('length', (options, fieldSchema) => new LengthValidator(options, fieldSchema));

export default FormValidator;