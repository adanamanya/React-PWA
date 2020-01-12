import React, { Component } from 'react';
import { Select } from 'antd';
import { styles } from '../../styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { select } from 'redux-saga/effects';
import { requestFurnitureList, filterbyDelivery } from '../../saga/actions';

const { Option } = Select;

const items = ['1 Week', '2 Week', '1 Month', '> 1Month'];

class DeliveryTime extends Component {
  state = {
    data: items,
  };
  async componentDidMount() {
    await this.props.requestFurnitureList();
  }

  async handleChange(value) {
    // console.log('selected', value);
    if (value.length !== 0) {
      await this.props.filterbyDelivery(value);
    } else {
      // console.log('empty');
      this.props.requestFurnitureList();
    }
  }
  render() {
    // const results = this.props.data;
    // console.log(results)
    return (
      <div>
        <Select
          allowClear
          autoClearSearchValue
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
