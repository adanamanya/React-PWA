import React, { Component } from 'react';
import { Select } from 'antd';
import { styles } from '../../styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requestFurnitureList, filterbyStyle } from '../../saga/actions';

const _ = require('lodash');
const { Option } = Select;

const items = ['Loading ..', 'Loading ....'];

class FurnitureStyle extends Component {
  state = {
    data: items,
  };

  async componentDidMount() {
    await this.props.requestFurnitureList();
  }
  handledropdown(results) {
    this.setState({
      data: results['furniture_styles'],
    });
  }
  async handleChange(value) {
    console.log('selected', value);
    if (value.length !== 0) {
      await this.props.filterbyStyle(value);
    } else {
      // console.log('empty');
      this.props.requestFurnitureList();
    }
  }
  render() {
    const results = this.props.data;
    // console.log(results)
    return (
      <div>
        <Select
          allowClear={true}
          onMouseEnter={() => this.handledropdown(results)}
          autoClearSearchValue={true}
          mode="multiple"
          placeholder="Filter By Furniture Style"
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
  bindActionCreators({ requestFurnitureList, filterbyStyle }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FurnitureStyle);
