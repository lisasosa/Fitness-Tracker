const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: 'Enter workout type'

        },
        name: {
            type: String,
            trim: true,
            required: 'Enter workout name'

        },
        duration: {
            type: Number,
            required: 'Enter Worout minutes',
        },
        weight: {
            type: Number
        },
        sets: {
            type: Number
        },
        reps: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]
}, {
    toJSON: {
        virtuals: true
    }
});
workoutSchema.virtual('durationTotal').get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0)
});
const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;