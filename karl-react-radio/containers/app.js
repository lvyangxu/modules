import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import action from '../actions/action';
import Button from "../components/button";
import Panel from "../components/panel";

// let App = ({isPanelShow}) => {
//     return (
//         <div>
//             <Button togglePanel={action.togglePanel}/>
//             <Panel isPanelShow={isPanelShow}/>
//         </div>
//     )
// };

class App extends Component {
    render() {
        return (
            <div>
                <Button togglePanel={e=> {
                    console.log(2);
                }}/>
                <Panel isPanelShow={this.props.isPanelShow}/>
            </div>
        )
    }
}

let mapStateToProps = state=>({
    isPanelShow: state.panelToggle.isPanelShow,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(action, dispatch)
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);