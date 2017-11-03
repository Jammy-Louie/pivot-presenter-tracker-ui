import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Face from 'material-ui/svg-icons/action/face';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import InfoBox from '../../components/dashboard/InfoBox';
import NewOrders from '../../components/dashboard/NewOrders';
import MonthlySales from '../../components/dashboard/MonthlySales';
import BrowserUsage from '../../components/dashboard/BrowserUsage';
import RecentlyProducts from '../../components/dashboard/RecentlyProducts';
import globalStyles from '../../styles';
import Data from '../../data';

import dashboardActions from '../../redux/dashboard/actions';

const {
    loadActivities,
    loadPivots,
    savePresenter
} = dashboardActions;

class Dashboard extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    this.props.loadActivities();
    this.props.loadPivots();
  }

  render(){
    let {
      activities,
      pivots,
      savePresenter
    } = this.props;

    var activitiesList = activities.map(function(activity){
                        return <div key={activity.id} className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
                                <InfoBox Icon={Face}
                                         color={pink600}
                                         activity={activity}
                                         pivots={pivots}
                                         saveAction={savePresenter}
                                />
                               </div>;
                      })
    return (
      <div>
        <div className="row">
          {activitiesList}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const {
      activities,
      pivots
    } = state.Dashboard.toJS();

    return {
        activities,
        pivots
    };
}

export default connect(mapStateToProps, {
  loadActivities,
  loadPivots,
  savePresenter
} ) (Dashboard);
