// Khai báo các biến cần thiết
var DeviceType = {
  Desktop: "Desktop",
  Mobile: "Mobile",
  Tablet: "Tablet",
  Null: null
};

// Định nghĩa một hàm để lấy loại thiết bị từ trạng thái của ứng dụng
function useDeviceType() {
  // Sử dụng hàm useSelector để lấy device từ state
  var device = useSelector(function(state) {
    return state.main.device;
  });
  // Sử dụng hàm getIn của ObjectUtils để lấy type từ device
  var deviceType = ObjectUtils.getIn(device, "type");
  // Trả về deviceType
  return deviceType;
}
