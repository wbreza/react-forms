import React from 'react';
import Field from '../fields/field';
import FormValidator from '../validation/formValidator';
import { randomString } from '../../utilities';

export default class Form extends React.Component {
    constructor(props, context) {
        super(props, context);

        const schema = this._prepareSchema(this.props.schema);
        const computedValue = this._prepareValue(this.props.value, schema);

        this.state = {
            elementId: `form-${randomString()}`,
            schema: schema,
            value: computedValue,
            validation: new FormValidator(this.props.schema),
            isValid: false,
            touched: false
        };
    }

    componentDidMount = () => {
        if (!!this.props.value) {
            this.validate();
        }
    }

    submit = () => {
        this.validate().then(isValid => {
            if (isValid) {
                console.log(this.state.value);
                if (this.props.onSubmit) {
                    this.props.onSubmit(this.state.value);
                }
            }
        });
    }

    validate = () => {
        return new Promise((resolve, reject) => {
            this.state.validation
                .validate(this)
                .then(errors => {
                    this.setState({
                        isValid: errors.length === 0
                    });
                    resolve(errors.length === 0);
                });
        });
    }

    _prepareSchema(schema) {
        const requiredProperties = this.props.schema.required || [];
        schema = Object.assign({}, schema);
        schema.name = randomString();

        Object.keys(schema.properties).forEach(propertyName => {
            schema.properties[propertyName].name = propertyName;
            schema.properties[propertyName].validation = schema.properties[propertyName].validation || {};
            schema.properties[propertyName].required = requiredProperties.includes(propertyName);
            if (schema.properties[propertyName].required) {
                schema.properties[propertyName].validation.required = true;
            }
        });

        return schema;
    }

    _prepareValue(value, schema) {
        value = value || {};
        let computedValue = {};
        Object.keys(schema.properties).forEach(propertyName => {
            computedValue[propertyName] = value[propertyName] || schema.properties[propertyName].defaultValue;
        });

        return value;
    }

    _onChange = (e) => {
        let propertyValue = {};
        propertyValue[e.key] = e.value;

        this.setState({
            value: Object.assign(this.state.value, propertyValue)
        });

        this.validate();
    }

    _onSubmit = (e) => {
        e.preventDefault();
        this.submit();
    }

    render() {
        return (
            <form id={this.state.elementId} className="needs-validation" onSubmit={this._onSubmit} noValidate>
                {this.state.schema.title && <h4>{this.state.schema.title}</h4>}
                {this.state.schema.description && <p className="text-muted">{this.state.schema.description}</p>}
                {this.props.children}
                {Object.keys(this.state.schema.properties).map(propertyName =>
                    <Field
                        ref={propertyName}
                        key={propertyName}
                        property={this.state.schema.properties[propertyName]}
                        value={this.state.value[propertyName]}
                        form={this.state.schema}
                        validator={this.state.validation.validators[propertyName]}
                        onChange={this._onChange} />
                    , this)}
                <button type="submit" className="btn btn-primary mr-1" disabled={!this.state.isValid}>Submit</button>
                <button type="button" className="btn btn-secondary">Cancel</button>
            </form>
        );
    }
}