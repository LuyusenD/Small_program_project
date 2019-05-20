Component({
    properties: {
        value: {
            type: Array,
            value: [],
            observer: "onValue"
        },
        isShow: {
            type: Boolean,
            value: false,
            observer: "onShow"
        }
    },

    data: {
        years: [],
        months: [],
        days: [],
        times:[],
        branchs:[],
        tempYearPos: [1],
        tempMonthPos: [0],
        tempDayPos: [0],
        temptimePos:[0],
        tempbranchPos:[0],
        showPicker: false
    },

    attached: function() {
        /**
         * 初始化年月日
         */
        var date = new Date();
        var times=[];
        var branchs=[];


        for (let i = 0; i < 24; i++) {
          i < 10 ? times.push(0 + '' + i) : times.push(i)
        }
        for (let i = 0; i <=59 ; i++) {
          i < 10 ? branchs.push(0 + '' + i) : branchs.push(i)
        }

        this.setData({
            times: times,
            branchs: branchs
        });
      for (let i = 0; i <= this.data.years.length; i++) {
        if (this.data.years[i] == date.getFullYear()){
          this.setData({
            tempYearPos:i
          })
          console.log(this.data.tempYearPos)
        }
      }
    },

    methods: {
        onTouchmask: function(event) {
        },
        onCacnelClick(e) {
            this.triggerEvent('cancelclick', {});
        },
        onSureClick(e) {
            var times = this.data.times[this.data.temptimePos];
          var branchs = this.data.branchs[this.data.tempbranchPos];
          console.log(this.data.times)
          console.log(this.data.branchs)
          var value = [times, branchs];
            this.triggerEvent('sureclick', {
                value: value,
            });
        },
        year_onChange: function(e) {
            //年改变，月要滑到一月，天要重新计算该年该月多少天
            var days = [];
            var curYear = this.data.years[e.detail.value];
            days = this.getDays(curYear, 1);
            this.setData({
                days: days,
                tempYearPos: e.detail.value,
                tempMonthPos: [0],
                tempDayPos: [0],
            });
        },
        month_onChange: function(e) {
            var days = [];
            var curYear = this.data.years[this.data.tempYearPos];
            var curMonth = this.data.months[e.detail.value];
            days = this.getDays(curYear, curMonth);
            this.setData({
                days: days,
                tempMonthPos: e.detail.value,
                tempDayPos: [0],
                tempitemPos: [0],
                tempbranchPos: [0],
            });
        },
        day_onChange: function(e) {
            this.setData({
                tempDayPos: e.detail.value,
                tempitemPos: [0],
                tempbranchPos: [0],
            });
        },
        item_onChange: function(e) {
            this.setData({
              temptimePos: e.detail.value,
                tempbranchPos:0
            });
        },
        branch_onChange: function(e) {
          console.log(e)
            this.setData({
              tempbranchPos: e.detail.value
            });
          console.log(this.data.tempbranchPos)
        },
        onValue() {
            //通过传进来的年月日,计算对应的index
            var data = this.getRefreshData();
            this.setData(data)
        },
        onShow() {
            var data = this.getRefreshData();
            data.showPicker = this.data.isShow;
            this.setData(data)
        },
        getDays(year, month) {
            var days = [];
            month = parseInt(month, 10);
            var date = new Date(year, month, 0);
            var maxDay = date.getDate();
            for (let i = 1; i <= maxDay; i++) {
                let day = 0;
                day = i < 10 ? '0' + i : i;
                days.push(day);
            }
            return days;
        },
        getRefreshData() {
            //通过传进来的年月日,计算对应的inde
            if (this.data.years == null || this.data.years.length == 0) {
                return {};
            }

            var date = new Date();

            var tempYearPos = this.data.years.length - 1;
            var tempMonthPos = date.getMonth();
            var tempDayPos = date.getDate() - 1;

            for (var i = 0; i < this.data.years.length; i++) {
                var item = this.data.years[i];
                if (item == this.data.value[0]) {
                    tempYearPos = i;
                    break;
                }
            }

            for (var i = 0; i < this.data.months.length; i++) {
                var item = this.data.months[i];
                if (item == this.data.value[1]) {
                    tempMonthPos = i;
                    break;
                }
            }

            var days = [];
            var curYear = this.data.years[tempYearPos];
            days = this.getDays(curYear, this.data.months[tempMonthPos]);

            for (var i = 0; i < days.length; i++) {
                var item = days[i];
                if (item == this.data.value[2]) {
                    tempDayPos = i;
                    break;
                }
            }

            var data = {
                days: days,
                tempYearPos: [tempYearPos],
                tempMonthPos: [tempMonthPos],
                tempDayPos: [tempDayPos],
            }
            return data;
        },
    }
});