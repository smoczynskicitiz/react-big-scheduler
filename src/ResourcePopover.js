import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import "antd/lib/grid/style/index.css";

class ResourcePopover extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    resourceItem: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    statusColor: PropTypes.string.isRequired,
    subtitleGetter: PropTypes.func,
    resourceItemPopoverTemplateResolver: PropTypes.func
  };

  render() {
    const {
      schedulerData,
      resourceItem,
      title,
      statusColor,
      subtitleGetter,
      resourceItemPopoverTemplateResolver
    } = this.props;

    if (resourceItemPopoverTemplateResolver != undefined) {
      return resourceItemPopoverTemplateResolver(
        schedulerData,
        resourceItem,
        title,
        statusColor
      );
    } else {
      let subtitleRow = <div />;
      if (subtitleGetter !== undefined) {
        let subtitle = subtitleGetter(schedulerData, eventItem);
        if (subtitle != undefined) {
          subtitleRow = (
            <Row type="flex" align="middle">
              <Col span={2}>
                <div />
              </Col>
              <Col span={22} className="overflow-text">
                <span className="header2-text" title={subtitle}>
                  {subtitle}
                </span>
              </Col>
            </Row>
          );
        }
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
          {subtitleRow}
          <Row type="flex" align="middle">
            <Col span={2}>
              <div />
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default ResourcePopover;
