import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import "antd/lib/grid/style/index.css";

class EventItemPopover extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    eventItem: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    statusColor: PropTypes.string.isRequired,
    subtitleGetter: PropTypes.func,
    eventItemPopoverTemplateResolver: PropTypes.func
  };

  render() {
    const {
      schedulerData,
      eventItem,
      title,
      startTime,
      endTime,
      statusColor,
      subtitleGetter,
      eventItemPopoverTemplateResolver
    } = this.props;
    const { localeMoment, config } = schedulerData;
    let start = localeMoment(startTime),
      end = localeMoment(endTime);

    if (eventItemPopoverTemplateResolver != undefined) {
      return eventItemPopoverTemplateResolver(
        schedulerData,
        eventItem,
        title,
        start,
        end,
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

      let dateFormat = config.eventItemPopoverDateFormat;
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
            <Col span={22}>
              <span className="header1-text">{start.format("HH:mm")}</span>
              <span className="help-text" style={{ marginLeft: "8px" }}>
                {start.format(dateFormat)}
              </span>
              <span className="header2-text" style={{ marginLeft: "8px" }}>
                -
              </span>
              <span className="header1-text" style={{ marginLeft: "8px" }}>
                {end.format("HH:mm")}
              </span>
              <span className="help-text" style={{ marginLeft: "8px" }}>
                {end.format(dateFormat)}
              </span>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default EventItemPopover;
