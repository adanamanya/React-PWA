import React, { Component } from 'react';
import { styles } from '../../styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestFurnitureList } from '../../saga/actions';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import tileData from './tileData';
// import Card from '@material-ui/core/Card';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MDSpinner from 'react-md-spinner';
import { fetchData } from '../../constants/api';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const _ = require('lodash');
const ReactFitText = require('react-fittext');

class CardList extends Component {
  state = {
    data: tileData,
    loading: true,
  };
  async componentDidMount() {
    const datanew = await fetchData();
    this.setState({ data: datanew['products'], loading: false });
    console.log(datanew, 'aha');
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={180} style={styles.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Furniture List</ListSubheader>
          </GridListTile>
          {this.state.data.map(tile => (
            <GridListTile style={{ padding: 5 }} key={tile.name}>
              <div>
                <Card style={styles.card}>
                  <CardActionArea>
                    <CardContent>
                      <Grid container spacing={24}>
                        <Grid item xs={10}>
                          <Typography
                            style={styles.productname}
                            gutterBottom
                            variant="h5"
                            component="h2"
                          >
                            {tile.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography
                            style={styles.price}
                            gutterBottom
                            variant="h5"
                            component="h2"
                          >
                            Rp{tile.price}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography style={styles.description} component="p">
                        {tile.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Grid container spacing={24}>
                      <Grid item xs={10}>
                        <Typography style={styles.furnistyle} component="p">
                          {tile['furniture_style'].join(', ')}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        {tile.delivery_time <= 7 ? (
                          <Typography style={styles.furnistyle} component="p">
                            1 Week
                          </Typography>
                        ) : (
                          <div />
                        )}
                        {tile.delivery_time <= 14 && tile.delivery_time > 7 ? (
                          <Typography style={styles.furnistyle} component="p">
                            2 Week
                          </Typography>
                        ) : (
                          <div />
                        )}
                        {tile.delivery_time > 14 ? (
                          <Typography style={styles.furnistyle} component="p">
                            1 month
                          </Typography>
                        ) : (
                          <div />
                        )}
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </div>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestFurnitureList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
