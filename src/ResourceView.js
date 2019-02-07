import React, { Component } from "react";
import { PropTypes } from "prop-types";
import ResourcePopover from "./ResourcePopover";
import Popover from "antd/lib/popover";

class ResourceView extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    contentScrollbarHeight: PropTypes.number.isRequired,
    slotClickedFunc: PropTypes.func,
    slotItemTemplateResolver: PropTypes.func
  };

  render() {
    const {
      schedulerData,
      contentScrollbarHeight,
      slotClickedFunc,
      slotItemTemplateResolver
    } = this.props;
    const { renderData } = schedulerData;

    let width = schedulerData.getResourceTableWidth() - 2;
    let paddingBottom = contentScrollbarHeight;
    let resourceList = renderData.map(item => {
      let content = (
        <ResourcePopover
          {...this.props}
          resourceItem={item}
          title={"title"}
          startTime={new Date()}
          endTime={new Date()}
          statusColor={"#AA0000"}
        />
      );

      let a =
        slotClickedFunc != undefined ? (
          <a
            onClick={() => {
              slotClickedFunc(schedulerData, item);
            }}
          >
            <span className="expander-space" />
            {item.slotName}
          </a>
        ) : (
          <span>
            <span className="expander-space" />
            <span>{item.slotName}</span>
          </span>
        );
      let slotItem = (
        <div
          title={item.slotName}
          className="overflow-text header2-text"
          style={{ textAlign: "left" }}
        >
          {a}
        </div>
      );
      if (!!slotItemTemplateResolver) {
        let temp = slotItemTemplateResolver(
          schedulerData,
          item,
          slotClickedFunc,
          width,
          "overflow-text header2-text"
        );
        if (!!temp) slotItem = temp;
      }

      return (
        <Popover placement="bottomLeft" content={content} trigger="hover">
          <tr key={item.slotId}>
            <td
              data-resource-id={item.slotId}
              style={{ height: item.rowHeight }}
            >
              {slotItem}
            </td>
          </tr>
        </Popover>
      );
    });

    return (
      <div style={{ paddingBottom: paddingBottom }}>
        <table className="resource-table">
          <tbody>{resourceList}</tbody>
        </table>
      </div>
    );
  }
}

export default ResourceView;
