// file này dùng để chuyển đổi lại mảng lấy từ database ở dạng propety sang dạng thông thường
module.exports = {
    // ở phiên bản handlebars 4.6 trở lên thì collection trong database sẽ trả về
    // kiểu mảng property vì vậy ta cần chuyển nó về mảng thông thường bằng cách sau
    // dùng phương thức map để duyệt qua từng phần tử của mảng
    // sau đó trả về các đối tượng được chuyển từ các phần tử đó bằng phương thức toObject()
    mutipleMongooseToObject: function (mongooseArray) {
        return mongooseArray.map((mongoose) => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
