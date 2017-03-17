import React, {PropTypes, Component} from 'react'

class Button extends Component {
    render() {
        return (
            <button onClick={this.props.togglePanel}>1</button>
        )
    }
}

module.exports = Button;