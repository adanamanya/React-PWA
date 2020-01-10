import React, { Component } from 'react';
import { Select } from 'antd';
import { styles } from '../../styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requestFurnitureList } from '../../saga/actions';

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
    // console.log(this.state.data, 'eheh');
  }
  render() {
    const results = this.props.data;
    // console.log(results)
    return (
      <div>
        <Select
          onMouseEnter={() => this.handledropdown(results)}
          mode="multiple"
          placeholder="Filter By Furniture Style"
          optionLabelProp="label"
          style={styles.select}
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
  bindActionCreators({ requestFurnitureList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FurnitureStyle);
