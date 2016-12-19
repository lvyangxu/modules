import React from "react";
import css from "./index.scss";
import http from "karl-http";
import "font-awesome-webpack";

class table extends React.Component {
    async constructor(props) {
        super(props);

        let tableId = this.props.tableId;
        let data = await http.post("")

            this
    .
        state = {};

        let bindArr = ["panelToggle"];
        bindArr.forEach(d => {
            this[d] = this[d].bind(this);
        });

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div className={css.base + " react-table"}>
                {
                    this.setTop()
                }
                {
                    this.setTable()
                }
                {
                    this.setBottom()
                }
            </div>
        );
    }

    setTop() {

    }

    setTable() {
        let dom = <div className={css.middle}>
            <table>
                <thead></thead>
                <tbody></tbody>
            </table>
        </div>;
        return dom;
    }

    setBottom() {

    }

}
module.exports = table;