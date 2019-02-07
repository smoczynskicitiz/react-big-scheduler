import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import "antd/lib/grid/style/index.css";

class AgendaPopover extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    config: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    statusColor: PropTypes.string.isRequired,
    agendaItemPopoverTemplateResolver: PropTypes.func
  };

  render() {
    const {
      config,
      title,
      statusColor,
      agendaItemPopoverTemplateResolver
    } = this.props;

    if (agendaItemPopoverTemplateResolver != undefined) {
      // TODO
      return agendaItemPopoverTemplateResolver(config, title, statusColor);
    }

    return (
      <div style={{ width: "300px" }}>
        <Row type="flex" align="middle">
          <Col span={2}>
            <div
              className="status-dot"
              style={{ backgroundColor: statusColor }}
            />
          </Col>
          <Col span={22} className="overflow-text">
            <span className="header2-text" title={title}>
              {title}
            </span>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={2}>
            <div />
          </Col>
        </Row>
      </div>
    );
  }
}

export default AgendaPopover;
