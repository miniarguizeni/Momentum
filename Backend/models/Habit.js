const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        default:""
    },

    category:{
        type:String,
        enum:[
            "Health",
            "Mindfulness",
            "Fitness",
            "Sleep",
            "Nutrition",
            "Study",
            "Productivity"
        ],
        default:"Health"
    },

    frequency:{
        type:String,
        enum:[
            "Daily",
            "Weekly"
        ],
        default:"Daily"
    },

    completedDates:[
        {
            type:Date
        }
    ],

    streak:{
        type:Number,
        default:0
    },

    goal:{
        type:Number,
        default:30
    },

    color:{
        type:String,
        default:"#4F46E5"
    },

    icon:{
        type:String,
        default:"⭐"
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Habit",habitSchema);