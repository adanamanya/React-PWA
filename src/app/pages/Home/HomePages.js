import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DropdownFurniture from '../../components/DropdownFurniture';
import DropdownDelivery from '../../components/DropdownDelivery';
import CardGrid from '../../components/CardGrid';
import { Input } from 'antd';
import { styles } from '../../styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestFurnitureList } from '../../saga/actions';
const { Search } = Input;

class HomePages extends Component {
  state = {
    selected: [],
  };
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headercontent}>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
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
  bindActionCreators({ requestFurnitureList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePages);
