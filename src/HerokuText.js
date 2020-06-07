import React from 'react'

import axios from 'axios';

export default class HerokuText extends React.Component {

    state = {
        loading: true,
        message:null,
    };

    async componentDidMount() {
        const url = "http://localhost:5000/time";
        axios.get(url, {}).then((response)=>{
            console.log({response});
            this.setState({message: response.data.time, loading: false})
        }).catch((error) => {
            alert(error)
         });
    }


    render() {
        return (
            <div>
                {this.state.loading ? <div>loading...</div> : <div>{this.state.message}</div>}
            </div>
        )
    }
}