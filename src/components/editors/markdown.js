import React from 'react';
import Editor from './editor';
const md = require('markdown-it')();

export default class MarkdownEditor extends Editor {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: this.props.value,
            source: this.props.source
        }

        this.onEditorChange = this.onEditorChange.bind(this);
    }

    onEditorChange(e) {
        const args = arguments;
        e.persist();

        this.setState({
            value: e.target.value,
            source: md.render(e.target.value)
        }, () => {
            this.props.onChange.apply(this, args);
        });
    }

    render() {
        return (
            <div>
                <textarea
                    id={this.props.id}
                    className="form-control"
                    type={this.props.type}
                    value={this.state.value}
                    onChange={this.onEditorChange}
                    placeholder={this.props.placeholder}
                    required={this.props.required}
                    rows="4"
                ></textarea>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Preview</h5>
                        <p className="card-text" dangerouslySetInnerHTML={{__html: this.state.source}}></p>
                    </div>
                </div>
            </div>
        );
    }
}