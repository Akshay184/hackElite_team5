var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DataSchema = new Schema({
    bus_code: { type: String },
    trip_id: { type: String },
    gps_datetime: { type: String },
    location: { type: String },
    dtd: { type: String },
    corridor: { type: String },
    longitude: { type: Number },
    latitude: { type: Number },
    speed: { type: String },
    course: { type: String },
    color: { type: String }
});
module.exports = mongoose.model('vehicle_datas', DataSchema);