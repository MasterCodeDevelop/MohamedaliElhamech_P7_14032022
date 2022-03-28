import React, { Component } from 'react'

export default class App extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            user :{
                id: '',
                token: ''
            }
         };
    }

    render() {
        /*console.log(this.state)
        if(this.state.count < 10 ) {
            this.state= {
                count :10
            };
        }*/
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Cliquez ici
                </button>
            </div>
        )
    }
}

/*
import React,{ useState } from 'react'

export default function App() {
    const [user, setUser] = useState({});
    setUser({"master": "true"});
    console.log(user)
  return (
    <div>App</div>
  )
}
*/