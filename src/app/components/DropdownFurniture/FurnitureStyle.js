import React, { Component } from 'react';
import { Select } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { styles } from '../../styles';
import { requestFurnitureList, filterbyStyle } from '../../saga/actions';

const { Option } = Select;

const items = ['Loading ..', 'Loading ....'];

class FurnitureStyle extends Component {
  state = {
    data: items,
  };

  handledropdown(results) {
    this.setState({
      data: results.furniture_styles,
    });
  }

  async handleChange(value) {
    // console.log('selected', value);
    if (value.length !== 0) {
      await this.props.filterbyStyle(value);
      this.props.requestFurnitureList();
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
          allowClear
          onMouseEnter={() => this.handledropdown(results)}
          autoClearSearchValue
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
