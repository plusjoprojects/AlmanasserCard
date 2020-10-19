import axios from 'axios'
import {env} from '../constants'
let apis = {
  // Main
  main: {
    index: function (onSuccess, onError) {
      axios
        .get(env.server + "api/main/index")
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
    },
  },
  auth: {
    register: function (payload, onSuccess, onError) {
      axios
        .post(env.server + "api/auth/register", payload)
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
    },
    login: function (payload, onSuccess, onError) {
      axios
        .post(env.server + "api/auth/login", payload)
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
    },
    index: function (payload, onSuccess, onError) {
      axios
        .get(env.server + "api/auth/get/" + payload)
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
    },
    auth: function (token,onSuccess, onError) {
      axios.defaults.headers.common = {
        'Authorization': "Bearer " + token,
        "X-Requested-With": "XMLHttpRequest",
      };
      axios
        .get(env.server + "api/auth/auth")
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
    },
    update: function (payload, onSuccess, onError) {
      axios
        .post(env.server + "api/auth/update_password", payload)
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
    }
  },
  order:{
    store:function (payload,onSuccess,onError) {
      axios
        .post(env.server + "api/order/store", payload)
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
    },
    index:function(id,onSuccess,onError) {
      axios
        .get(env.server + "api/order/index/" + id)
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
    }
  },
  search:{
    index:function(title,onSuccess,onError) {
      axios
        .post(env.server + "api/search/index", {title:title})
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
    }
  },
  reports:{
    fetch:function(data,onSuccess,onError) {
      axios
        .post(env.server + "api/report/fetch", data)
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
    }
  }
};

export default apis;