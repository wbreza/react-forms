import React from 'react';
import Field from '../fields/field';
import { randomString } from '../../utilities';

export default class Form extends React.Component {
    constructor(props, context) {
        super(props, context);

        const requiredProperties = this.props.schema.required || [];
        const properties = Object.keys(this.props.schema.properties).map(key => {
            return Object.assign({
                name: key,
                required: requiredProperties.includes(key)
            }, this.props.schema.properties[key]);
        });

        const currentValue = this.props.value || {};
        let computedValue = {};
        properties.forEach(property => {
            computedValue[property.name] = currentValue[property.name] || property.defaultValue
        });

        this.state = {
            elementId: `form-${randomString()}`,
            schema: Object.assign({ name: randomString() }, this.props.schema),
            fields: properties,
            value: computedValue
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        let propertyValue = {};
        propertyValue[e.key] = e.value;

        this.setState({
            value: Object.assign(this.state.value, propertyValue)
        });
    }

    submit() {
        console.log(this.state.value);
    }

    onSubmit(e) {
        e.preventDefault();
        this.submit();
    }

    render() {
        return (
            <form id={this.state.elementId} onSubmit={this.onSubmit}>
                {this.state.schema.title && <h4>{this.state.schema.title}</h4>}
                {this.state.schema.description && <p className="text-muted">{this.state.schema.description}</p>}
                {this.props.children}
                {this.state.fields.map(field =>
                    <Field
                        key={field.name}
                        property={field}
                        value={this.state.value[field.name]}
                        form={this.state.schema}
                        onChange={this.onChange} />
                )}
                <button type="submit" className="btn btn-primary mr-1">Submit</button>
                <button type="button" className="btn btn-secondary">Cancel</button>
            </form>
        );
    }
}