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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MDSpinner from 'react-md-spinner';
import { isMobile } from 'react-device-detect';
const _ = require('lodash');

class CardList extends Component {
  state = {
    data: tileData,
    loading: true,
    test: [],
  };
  async componentDidMount() {
    await this.props.requestFurnitureList();
  }

  render() {
    const data = this.props.data['products'];
    return (
      <div style={styles.root}>
        {data !== undefined ? (
          <GridList
            cellHeight={180}
            style={isMobile ? styles.mobilegridList : styles.gridList}
          >
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">Furniture List</ListSubheader>
            </GridListTile>
            {data.map(tile => (
              <GridListTile style={{ padding: 5 }} key={tile.name}>
                <div>
                  <Card style={isMobile ? styles.mobilecard : styles.card}>
                    <CardActionArea>
                      <CardContent>
                        <Grid container spacing={24}>
                          <Grid item xs={isMobile ? 5 : 10}>
                            <Typography
                              style={
                                isMobile
                                  ? styles.mobileproductname
                                  : styles.productname
                              }
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {tile.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={isMobile ? 3 : 2}>
                            <Typography
                              style={
                                isMobile ? styles.mobileprice : styles.price
                              }
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              Rp{tile.price}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography
                          style={
                            isMobile
                              ? styles.mobiledescription
                              : styles.description
                          }
                          component="p"
                        >
                          {isMobile
                            ? tile.description.slice(0, 150) + '......'
                            : tile.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Grid container spacing={24}>
                        <Grid item xs={isMobile ? 5 : 10}>
                          <Typography
                            style={
                              isMobile
                                ? styles.mobilefurnistyle
                                : styles.furnistyle
                            }
                            component="p"
                          >
                            {tile['furniture_style'].join(', ')}
                          </Typography>
                        </Grid>
                        <Grid item xs={isMobile ? 3 : 2}>
                          {tile.delivery_time <= 7 ? (
                            <Typography
                              style={
                                isMobile
                                  ? styles.mobilefurnistyle
                                  : styles.furnistyle
                              }
                              component="p"
                            >
                              1 Week
                            </Typography>
                          ) : (
                            <div />
                          )}
                          {tile.delivery_time <= 14 &&
                          tile.delivery_time > 7 ? (
                            <Typography
                              style={
                                isMobile
                                  ? styles.mobilefurnistyle
                                  : styles.furnistyle
                              }
                              component="p"
                            >
                              2 Week
                            </Typography>
                          ) : (
                            <div />
                          )}
                          {tile.delivery_time > 14 ? (
                            <Typography
                              style={
                                isMobile
                                  ? styles.mobilefurnistyle
                                  : styles.furnistyle
                              }
                              component="p"
                            >
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
        ) : (
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
                          <Grid item xs={isMobile ? 5 : 10}>
                            <Typography
                              style={
                                isMobile
                                  ? styles.mobileproductname
                                  : styles.productname
                              }
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {tile.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={isMobile ? 3 : 2}>
                            <Typography
                              style={
                                isMobile ? styles.mobileprice : styles.price
                              }
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              Rp{tile.price}
                            </Typography>
                          </Grid>
                        </Grid>
                        {this.state.loading ? (
                          <MDSpinner duration={1000} />
                        ) : (
                          <Typography
                            style={
                              isMobile
                                ? styles.mobiledescription
                                : styles.description
                            }
                            component="p"
                          >
                            {isMobile
                              ? tile.description.slice(0, 70) + '......'
                              : tile.description}
                          </Typography>
                        )}
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Grid container spacing={24}>
                        <Grid item xs={isMobile ? 5 : 10}>
                          <Typography
                            style={
                              isMobile
                                ? styles.mobilefurnistyle
                                : styles.furnistyle
                            }
                            component="p"
                          >
                            {tile['furniture_style'].join(', ')}
                          </Typography>
                        </Grid>
                        <Grid item xs={isMobile ? 3 : 2}>
                          {tile.delivery_time <= 7 ? (
                            <Typography
                              style={
                                isMobile
                                  ? styles.mobilefurnistyle
                                  : styles.furnistyle
                              }
                              component="p"
                            >
                              1 Week
                            </Typography>
                          ) : (
                            <div />
                          )}
                          {tile.delivery_time <= 14 &&
                          tile.delivery_time > 7 ? (
                            <Typography
                              style={
                                isMobile
                                  ? styles.mobilefurnistyle
                                  : styles.furnistyle
                              }
                              component="p"
                            >
                              2 Week
                            </Typography>
                          ) : (
                            <div />
                          )}
                          {tile.delivery_time > 14 ? (
                            <Typography
                              style={
                                isMobile
                                  ? styles.mobilefurnistyle
                                  : styles.furnistyle
                              }
                              component="p"
                            >
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
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestFurnitureList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
