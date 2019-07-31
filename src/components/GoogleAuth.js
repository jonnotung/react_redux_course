import React, {Component} from 'react'

class GoogleAuth extends Component {

    constructor() {
        super()
        this.state = {
            isSignedIn: null
        }
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '586151087080-35nkfdaumpqpqoa377emt28uqhg0g32e.apps.googleusercontent.com',
                scope: 'email',
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance()
                this.setState({
                    isSignedIn: this.auth.isSignedIn.get()
                })
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get()})
    }

    onSignIn = () => {
        this.auth.signIn()
    }

    onSignOut = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if(this.state.isSignedIn === null) {
            return null
        } else if(this.state.isSignedIn) {
            return <button className="ui red google button" onClick={this.onSignOut}>
                <i className="google icon" />
                Sign out
            </button>
        } else {
            return <button className="ui green google button" onClick={this.onSignIn}>
                <i className="google icon" />
                Sign in with Google
            </button>
        }
    }

    render() {
        return(
            <div>{this.renderAuthButton()}</div>
        )
    }
}

export default GoogleAuth