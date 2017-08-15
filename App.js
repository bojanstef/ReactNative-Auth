import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Header, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        const config = {
            apiKey: "AIzaSyDiUpY05m6fZTpSsYV7nkuNykrwxjvSv98",
            authDomain: "authentication-reactnati-f3771.firebaseapp.com",
            databaseURL: "https://authentication-reactnati-f3771.firebaseio.com",
            projectId: "authentication-reactnati-f3771",
            storageBucket: "authentication-reactnati-f3771.appspot.com",
            messagingSenderId: "1044185301251"
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loggedIn: true})
            } else {
                this.setState({loggedIn: false})
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut() }>
                                Logout
                            </Button>
                        </CardSection>
                    </Card>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size='large' />
        }
    }

    render() {
        return (
            <View>
                <Header headerText='Authentication' />
                { this.renderContent() }
            </View>
        );
    }
}
