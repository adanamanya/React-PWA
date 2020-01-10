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
import { requestFurnitureList } from '../../saga/actions';
import { useStoreDispatch } from 'easy-peasy';
const _ = require('lodash');

const { Search } = Input;

class HomePages extends Component {
  state = {
    selected: [],
    datanew: [],
  };
  async componentDidMount() {
    const datanew = await fetchData();
    this.setState({ datanew: datanew['products'], loading: false });
    // console.log(datanew, 'aha');
  }
  async handlesearch(value) {
    console.log(this.state.datanew);
    const search_string = value.toLowerCase();
    const datatohandle = this.state.datanew;
    let result = datatohandle.filter(o =>
      o.name
        .trim()
        .toLowerCase()
        .includes(search_string),
    );
    console.log(result, 'thizresultlodash');
  }
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headercontent}>
            <Search
              placeholder="input search text"
              onSearch={value => this.handlesearch(value)}
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
        <CardGrid cardata={this.state.data} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    datanew: state.datanew,
  };
}

function mapDispatchToProps(dispatch, data) {
  return { datanew: () => dispatch(data) };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePages);
