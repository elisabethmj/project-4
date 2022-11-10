import moment from 'moment';

export default function KitRow({kitRowData}) {

    return (
        <div className="container">
            <p>Kit #{kitRowData.user_kit_id}</p>
            <p>Batch #{kitRowData.batch_number}</p>
            <p>Product #{kitRowData.product}</p>
            <p>Order Status: {kitRowData.order_status}</p>
            <p>Expiry: {moment(kitRowData.expiry).format("DD/MM/YYYY")}</p>
            <p>Amount left: {kitRowData.mL_left_in_bottle}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
};

