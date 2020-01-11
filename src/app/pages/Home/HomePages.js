import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DropdownFurniture from '../../components/DropdownFurniture';
import DropdownDelivery from '../../components/DropdownDelivery';
import CardGrid from '../../components/CardGrid';
import { fetchData } from '../../constants/api';
import { Input } from 'antd';
import { styles } from '../../styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { requestFurnitureList, searchFurniture } from '../../saga/actions';
const _ = require('lodash');

const { Search } = Input;

class HomePages extends Component {
  state = {
    selected: [],
    datanew: [],
  };
  async componentDidMount() {
    await this.props.requestFurnitureList();
    // const datanew = await fetchData();
    // this.setState({ datanew: datanew['products'], loading: false });
    // console.log(datanew, 'aha');
  }
  async handlesearch(value) {
    if (value !== '') {
      await this.props.searchFurniture(value);
    } else {
      await this.props.requestFurnitureList();
    }
  }
  onChange = e => {
    const value = e.target.value;
    if (value == '') {
      this.props.requestFurnitureList();
    }
  };
  render() {
    return (
      <div style={styles.container}>
        <Helmet>
          <style>{'body { background-color: #e2e1e0; }'}</style>
        </Helmet>
        <div style={styles.header}>
          <div style={styles.headercontent}>
            <Search
              allowClear
              placeholder="input search text"
              onSearch={value => this.handlesearch(value)}
              onChange={this.onChange}
              style={styles.search}
            />
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <DropdownFurniture />
              </Grid>
              <Grid item xs={6}>
                <DropdownDelivery />
              </Grid>
            </Grid>
          </div>
        </div>
        <CardGrid />
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestFurnitureList, searchFurniture }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePages);
