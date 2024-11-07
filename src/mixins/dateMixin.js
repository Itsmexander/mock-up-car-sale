// src/mixins/dateMixin.js
import dayjs from 'dayjs';

const dateMixin = {
  methods: {
    formatDate(dateString, format = 'DD-MM-YYYY HH:mm:ss') {
      return dayjs(dateString).format(format);
    }
  }
};

export default dateMixin;
