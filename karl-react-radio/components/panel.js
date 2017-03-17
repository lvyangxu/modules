import React, {PropTypes, Component} from 'react'

class Panel extends Component {
    render() {
        console.log(this.props.isPanelShow);
        return (
            <div style={this.props.isPanelShow ? {} : {display: "none"}}>2</div>
        )
    }
}

module.exports = Panel;