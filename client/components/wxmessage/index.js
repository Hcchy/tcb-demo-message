const app = getApp();

Component({
  methods: {
    wxMessage(e) {
      let formData = e.detail.value;
      let formId = e.detail.formId;

      let data = {};

      this.properties.formData.forEach(({ name }) => {
          if (name) {
              data[name] = {
                value: formData[name]
              };
          }
      });

      wx.cloud.callFunction({
          name: 'wxmessage',
          data: {
            code: app.globalData.code, // 由于小程序云自带 openId，这里的code其实可以不传
            templateId: this.properties.templateId,
            formId: formId,
            data
          },
      }).then((res) => {
        console.log(res);
        if (res.result && res.result.data && res.result.data.errcode === 0) {
          wx.showToast({
            title: '报名成功',
          });
        }
        else {
          wx.showToast({
            title: '报名失败',
            icon: 'none'
          })
        }
      });
    },
  },
  properties: {
    formData: Array,
    templateId: String
  }
});