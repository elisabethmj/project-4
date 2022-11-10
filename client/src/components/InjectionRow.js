import moment from 'moment';

export default function InjectionRow({injData}) {

    return (
        <div className="container">
            <p>Inj #{injData.user_inj_id}</p>
            <p>From kit #{injData.kit_id}</p>
            <p>Date given: {moment(injData.date_of_inj).format("DD/MM/YYYY")}</p>
            <p>Dose: {injData.dose_given_ml}mL</p>
            <p>Reaction: {injData.reaction}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
};