import React, { Component } from 'react';
import './App.css';
import Form from './components/forms/form';

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            form1: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'Create User Account',
                description: 'Complete the following to setup your user profile',
                type: 'object',
                properties: {
                    firstName: {
                        type: 'string',
                        label: 'First Name',
                        validation: {
                            required: true,
                            length: {
                                min: 2,
                                max: 16,
                                message: 'First Name must be between 2-16 characters'
                            }
                        }
                    },
                    lastName: {
                        type: 'string',
                        label: 'Last Name'
                    },
                    email: {
                        type: 'string',
                        label: 'E-mail Address',
                        description: 'We\'ll never share your email with anyone else'
                    },
                    phoneNumber: {
                        type: 'string',
                        label: 'Phone Number'
                    },
                    bio: {
                        type: 'string',
                        editor: 'markdown',
                        label: 'Bio',
                        description: 'Tell us a little about yourself'
                    }
                },
                required: ['firstName', 'lastName', 'email']
            },
            form2: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'Login',
                description: 'Login with your username and password below',
                type: 'object',
                properties: {
                    username: {
                        type: 'string',
                        label: 'Username / E-mail'
                    },
                    password: {
                        type: 'password',
                        label: 'Password',
                        editor: 'string'
                    }
                },
                required: ['username', 'password']
            },
            form2Value: {
                username: 'wbreza',
                password: 'password'
            }
        }
    }
    render() {
        return (
            <div className="container">
                <Form ref="form1" schema={this.state.form2} value={this.state.form2Value} />
                <hr />
                <Form schema={this.state.form1} />
            </div>
        );
    }
}

export default App;
