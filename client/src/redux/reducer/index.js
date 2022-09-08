import {
  GET_DETAILS,
  GET_ALL_SERVICES,
  SORT_SERVICES,
  FILTER_SERVICES,
  GET_ALL_CATEGORIES,
  SERVICE_NAME,
  REGISTER_USER,
  REGISTER_SERVICE,
  POST_CATEGORY,
  FILTER,
  UPDATE,
  POST_REQUEST,
  UPDATE_SERVICE,
  GET_SERVICE_ID,
  UPDATE_REQUEST,
  DELETE_REQUEST,
  ALL_REQUEST,
  DELETE_SERVICES,
  USER_LOCATION,
  ALL_NOTIFICATIONS,
  POST_NOTIFICATION,
  DELETE_NOTIFICATION,
  ALL_USERS,
  NEW_BANNED_STATE,
  USER_BY_ID,
  POST_REVIEW,
  DELETE_CATEGORY,
  ADMIN_UPDATE,
  ALL_REVIEWS,
  SEARCH_CATEGORY

} from "../actions/index.js";

const initialStates = {
  serviceDetail: [],
  services: [],
  servicesAux: [],
  categories: [],
  registerUser: [],
  registerService: [],
  postCategory: [],
  update: [],
  filter: [],
  userLocation: [],
  updateService: [],
  filterId: [],
  updateRequest: [],
  deleteRequest: [],
  allRequest: [],
  users: [],
  allNotifications: [],
  postNotification: [],
  deleteNotification: [],
  postReview: [],
  user: [],
  reviews:[]


};

const reducer = (state = initialStates, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...state,
        serviceDetail: action.payload,
      };
    case GET_ALL_SERVICES:
      return {
        ...state,
        services: action.payload,
        servicesAux: action.payload,
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SERVICE_NAME:
      return {
        ...state,
        services: action.payload,
      };
    case SORT_SERVICES:
      let allSer = [...state.services];
      let filterServices = [];
      if (action.payload === "menor") {
        filterServices = allSer.sort((a, b) => {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        });
      }
      if (action.payload === "mayor") {
        filterServices = allSer.sort((a, b) => {
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
        });
      }
      return {
        ...state,
        services: filterServices,
      };
    case FILTER_SERVICES:
      return {
        ...state,
        services:
          action.payload === "All"
            ? state.servicesAux
            : state.servicesAux.filter(
                (el) => el.category.name === action.payload
              ),
      };
    case REGISTER_USER:
      return {
        ...state,
        registerUser: [...state.registerUser, { ...action.payload }],
      };
    case REGISTER_SERVICE:
      return {
        ...state,
        registerService: [...state.registerService, { ...action.payload }],
      };
    case POST_CATEGORY:
      return {
        ...state,
        postCategory: [...state.postCategory, { ...action.payload }],
      };
    case FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };
    case UPDATE:
      return {
        ...state,
        update: [...state.update, { ...action.payload }],
      };

    case POST_REQUEST:
      return {
        ...state,
      };
    case UPDATE_SERVICE:
      return {
        ...state,
        updateService: [...state.updateService, { ...action.payload }],
      };
    case GET_SERVICE_ID:
      return {
        ...state,
        filterId: action.payload,
      };
    case UPDATE_REQUEST:
      return {
        ...state,
        updateRequest: [...state.updateRequest, { ...action.payload }],
      };
    case DELETE_REQUEST:
      return {
        ...state,
        deleteRequest: action.payload,
      };
    case ALL_REQUEST:
      return {
        ...state,
        allRequest: action.payload,
      };
    case DELETE_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case ALL_NOTIFICATIONS:
      return {
        ...state,
        allNotifications: action.payload,
      };
    case POST_NOTIFICATION:
      return {
        ...state,
        postNotification: [...state.postNotification, { ...action.payload }],
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        deleteNotification: action.payload,
      };

    case USER_BY_ID:
      return {
        ...state,
        user: action.payload
      };
      case NEW_BANNED_STATE:
        return {
          ...state,
          user: [...state.user, {...action.payload}]
        };
      case DELETE_CATEGORY:
        return{
          ...state,
          categories: action.payload
        }
    case POST_REVIEW:
      return{
        ...state,
        postReview: [...state.postReview, {...action.payload}]
      }
    case ADMIN_UPDATE: 
      return{
        ...state,
        user: [...state.user, {...action.payload}]
      }  
    case ALL_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      }
    case SEARCH_CATEGORY: 
    return {
      ...state,
      categories: action.payload
    }        
    default:
      return state;
  }
};

export default reducer;