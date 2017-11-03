import { Map } from "immutable";
import actions from "./actions";

const initState = new Map({
  activities: [],
  pivots: [],
  isLoading: false
});

export default function dashboardReducer(state = initState, action) {
  switch (action.type) {
    case actions.PIVOTS_FETCH_REQUESTED:
      return state;
    case actions.PIVOTS_FETCH_SUCCEEDED:
      return state
        .set("pivots", action.pivots);
    case actions.ACTIVITIES_FETCH_REQUESTED:
      return state
        .set("isLoading", true);
    case actions.ACTIVITIES_FETCH_SUCCEEDED:
      return state
        .set("isLoading", false)
        .set("activities", action.activities);
    case actions.SAVE_PRESENTER_REQUESTED:
      return state;
    case actions.SAVE_PRESENTER_SUCCEEDED:
      var index = state.get('activities').findIndex((activity)=> activity.id === action.updateActivity.id);
      var newActivities = [...state.get('activities')];
      newActivities[index] = action.updateActivity;
      return state
          .set("activities", newActivities);
    default:
      return state;
  }
}
