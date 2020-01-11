import React, { Component } from 'react';
import { Select } from 'antd';
import { styles } from '../../styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requestFurnitureList, filterbyDelivery } from '../../saga/actions';

const _ = require('lodash');
const { Option } = Select;

const items = ['1 Week', '2 Week', '1 Month', '>1 Month'];

class DeliveryTime extends Component {
  state = {
    data: items,
  };
  async componentDidMount() {
    await this.props.requestFurnitureList();
  }
  async handleChange(value) {
    // console.log('selected', value);
    if (value !== '' || value !== undefined) {
      await this.props.filterbyDelivery(value);
    }
  }
  render() {
    const results = this.props.data;
    // console.log(results)
    return (
      <div>
        <Select
          allowClear={true}
          autoClearSearchValue={true}
          mode="multiple"
          placeholder="Filter By DeliveryTime"
          optionLabelProp="label"
          style={styles.select}
          onChange={value => this.handleChange(value)}
        >
          {this.state.data.map(item => (
            <Option key={item} value={item} label={item}>
              <div>{item}</div>
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestFurnitureList, filterbyDelivery }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryTime);
