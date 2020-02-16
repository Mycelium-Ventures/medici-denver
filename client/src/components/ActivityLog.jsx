import React from "react";

const ActivityLog = (props) => {
    // console.log(props.data);
    //TODO: Check props
    if(props.data === undefined) {
        return (
        <div className="card-body transaction-card transaction-text mx-5 px-4">
            <div className="row text-center">
                No Activity Log Available
            </div>
        </div>
        )
    }

    return (
        <div className="card-body transaction-card transaction-text mx-5 px-4">
        {
            props.data.map((activity, i) => {
                    // console.log(activity.username);
                    // console.log(activity.action);
                    // console.log(activity.medici);
                return(
                <div key={i} className="row text-center">
                    <div className="col-lg-3">
                        <h6>{activity.username}</h6>
                    </div>
                    <div className="col-lg-5">
                        {activity.action}
                    </div>
                    <div className="col-lg-4">
                        {activity.medici}
                        <img
                        src={require("../assets/coin.png")}
                        width={20}
                        height={20}
                        className="pl-1"
                        />
                    </div>
                </div>
                )
            })
        }
    </div>
    )
}

export default ActivityLog;



