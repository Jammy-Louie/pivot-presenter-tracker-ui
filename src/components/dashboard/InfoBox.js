import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {white, grey800} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';

class InfoBox extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          newPresenter:null
      };
  }

  render() {
    const {color, Icon, activity, pivots, saveAction} = this.props;

    const styles = {
      content: {
        padding: '5px 10px',
        marginLeft: 90
      },
      number: {
        display: 'block',
        fontWeight: typography.fontWeightMedium,
        fontSize: 18,
        color: grey800
      },
      text: {
        fontSize: 20,
        fontWeight: typography.fontWeightLight,
        color: grey800
      },
      iconSpan: {
        float: 'left',
        height: 90,
        width: 90,
        textAlign: 'center',
        backgroundColor: color
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: '100%'

      }
    };

    var pivotsList = [];
    var pivotSelect;

    if (pivots.length >0){
      pivotsList = pivots.map(function(pivot){
                          return <MenuItem
                                    key={pivot.id}
                                    value={pivot}
                                    primaryText={pivot.userName}
                                  />;
                        });
      pivotSelect = <SelectField fullWidth={true}
                                 value={this.state.newPresenter}
                                 onChange={(event, index, value) => {
                                   this.setState({newPresenter: value});
                                 }}
                    >
                      {pivotsList}
                    </SelectField>;
    }

    return (
      <Paper>
        <span style={styles.iconSpan}>
          <Icon color={white}
                style={styles.icon}
          />
        </span>

        <div style={styles.content}>
          <span style={styles.text}>{activity.presentation}</span>
          <span style={styles.number}>{activity.lastPresentedPivot? activity.lastPresentedPivot.userName: null}</span>
          {pivotSelect}
          <div>
            <RaisedButton label="Save" fullWidth={true} onClick={(event)=>saveAction(this.state.newPresenter, activity)}/>
          </div>
        </div>
      </Paper>
      );
  }
}

InfoBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  pivots: PropTypes.array,
  saveAction: PropTypes.any
};

export default InfoBox;
