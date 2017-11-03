import fetch from 'isomorphic-fetch'

const dashboardAction = {
  ACTIVITIES_FETCH_REQUESTED: 'ACTIVITIES_FETCH_REQUESTED',
  ACTIVITIES_FETCH_SUCCEEDED: 'ACTIVITIES_FETCH_SUCCEEDED',
  ACTIVITIES_FETCH_FAILED: 'ACTIVITIES_FETCH_FAILED',
  PIVOTS_FETCH_REQUESTED: 'PIVOTS_FETCH_REQUESTED',
  PIVOTS_FETCH_SUCCEEDED: 'PIVOTS_FETCH_SUCCEEDED',
  PIVOTS_FETCH_FAILED: 'PIVOTS_FETCH_FAILED',
  SAVE_PRESENTER_REQUESTED: 'SAVE_PRESENTER_REQUESTED',
  SAVE_PRESENTER_SUCCEEDED: 'SAVE_PRESENTER_SUCCEEDED',
  SAVE_PRESENTER_FAILED: 'SAVE_PRESENTER_FAILED',

  loadActivities: () => {
    return (dispatch) => {
      dispatch({type: dashboardAction.ACTIVITIES_FETCH_REQUESTED});
      return fetch(`http://localhost:8080/get-all-presentations`)
      .then(response => response.json())
      .then(json => dispatch(loadActivitiesSucceded(json)))
    };
  },

  loadPivots: () => {
    return (dispatch) => {
      dispatch({type: dashboardAction.PIVOTS_FETCH_REQUESTED});
      return fetch(`http://localhost:8080/get-all-pivots`)
      .then(response => response.json())
      .then(json => dispatch(loadPivotsSucceded(json)))
    };
  },

  savePresenter: (pivot, activity) => {
    return (dispatch) => {
      dispatch({type: dashboardAction.SAVE_PRESENTER_REQUESTED});
      return fetch(
        `http://localhost:8080/save-pivot-presenter`,{
          method:"POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pivotId: pivot.id,
            activityId: activity.id
          })
        }
      )
      .then(response => response.json())
      .then(json => dispatch(savePresenterSucceded(json)));
    };
  },
};

function loadActivitiesSucceded (json) {
    return {
      type: dashboardAction.ACTIVITIES_FETCH_SUCCEEDED,
      activities: json
    };
}

function loadPivotsSucceded (json) {
    return {
      type: dashboardAction.PIVOTS_FETCH_SUCCEEDED,
      pivots: json
    };
}

function savePresenterSucceded(json) {
  return {
    type: dashboardAction.SAVE_PRESENTER_SUCCEEDED,
    updateActivity: json
  };
}

export default dashboardAction;
