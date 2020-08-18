import React from 'react'

import axios from 'axios';

export default class HerokuText extends React.Component {

    state = {
        loading: true,
        message:null,
    };

    async componentDidMount() {
        const url = "https://vcm-15941.vm.duke.edu/api/time";
        axios.get(url, {}).then((response)=>{
            console.log({response});
            this.setState({message: response.data.time, loading: false})
        }).catch((error) => {
            alert(error)
         });

         const params = new URLSearchParams();
         params.append('username', 'Mike');
         params.append('password', '12345');
         axios.post('https://vcm-15941.vm.duke.edu/api/login', params);
    }


    render() {
        return (
            <div>
                {this.state.loading ? <div>loading...</div> : <div>{this.state.message}</div>}
            </div>
        )
    }
}