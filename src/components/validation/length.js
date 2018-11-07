import Validator from './validator';

export default class LengthValidator extends Validator {
    validate(value) {
        if (value && !!this.options.max && value.length > this.options.max) {
            return false;
        }

        if (value && !!this.options.min && value.length < this.options.min) {
            return false;
        }

        return true;
    }
}