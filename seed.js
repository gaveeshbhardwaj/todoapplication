var statusENUMS = {
    ACTIVE:"ACTIVE",
    DELETED:"DELETED",
    COMPLETED:"COMPLETED"
};

var todoObject = [
    {"title":"Learn Javascript","status":statusENUMS.ACTIVE},
    {"title":"Learn Node","status":statusENUMS.COMPLETED},
    {"title":"Learn Angular","status":statusENUMS.ACTIVE},
    {"title":"Learn C#","status":statusENUMS.ACTIVE},
    {"title":"Learn C","status":statusENUMS.DELETED},
    {"title":"Learn Python","status":statusENUMS.DELETED},
    {"title":"Learn React","status":statusENUMS.COMPLETED}

];

module.exports.todoObj = todoObject;
module.exports.statusENUMS = statusENUMS;